/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 17:37:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 20:33:01
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import exitHook from 'exit-hook'
import console from 'node:console'

import type { IPKGInfo } from '../interface'
import { getFancyArch, getFancyPlatform } from '../util'

/**
 * 等待删除的文件列表。
 */
const needDeleteDirList: string[] = []

/**
 * 推出后，对中间成果进行删除。
 */
exitHook(() => {
  needDeleteDirList.forEach((d: string) => {
    fs.removeSync(d)
  })
})

/**
 * @public
 *
 *  pkg 钩子。
 *
 */
export class PKGUtil {
  public static async build(options: IPKGInfo): Promise<void> {
    console.log('Options: ')
    console.log(JSON.stringify(options, undefined, 2))

    const pkgCachePath: string = process.env.PKG_CACHE_PATH ?? path.resolve(process.env.HOME!, './.pkg-cache')

    /**
     * 1. 拷贝 pkg-fetch 资源；
     * 2. 运行打包操作；
     * 3. 移动至归档文件夹；
     */

    const tempDir = path.resolve(options.root, 'temp', '.hz9/pkg-build', `${Date.now()}`)
    needDeleteDirList.push(tempDir)

    fs.mkdirpSync(tempDir)
    const tempPkgFetchDir = path.resolve(tempDir, '.pkg-cache')

    // 拷贝打包资源
    const copyTargets: string[] = [...options.targets]
    while (copyTargets.length) {
      const t = copyTargets.pop()!
      await this._copyPkgFetchToTemp(pkgCachePath, tempPkgFetchDir, t)
    }

    // 拷贝 .pkg.json
    const tempConfigPath = path.resolve(tempDir, '.pkg.json')
    const tempConfig = {
      pkg: {
        assets: options.assets,
        scripts: options.scripts,
      },
    }
    tempConfig.pkg.assets = tempConfig.pkg.assets.map((i) => (path.isAbsolute(i) ? i : `../../../../${i}`))
    tempConfig.pkg.scripts = tempConfig.pkg.scripts.map((i) => (path.isAbsolute(i) ? i : `../../../../${i}`))
    fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, undefined, 2), { encoding: 'utf8' })

    // 执行打包任务
    const commands: string[] = [
      options.inputPath,
      '--target',
      options.targets.join(','),
      '--out-path',
      options.outputPath,
      '--config',
      tempConfigPath,
    ]
    const pkgCommand = await this._getPkgCommand(options.root)
    console.log('Pkg path: ', pkgCommand)
    await execa(pkgCommand, commands, {
      env: {
        PKG_CACHE_PATH: tempPkgFetchDir,
      },
      cwd: options.root,
      stderr: process.stderr,
      stdout: process.stdout,
    })

    /**
     * 将成果文件，进行重命名。
     */
    await this._renameResult(options)

    // 删除历史文件。
  }

  /**
   *
   *  拷贝源文件至项目路径中。
   *
   * @param from - 源文件夹。
   * @param to - 目标文件夹。
   * @param platform - 目标平台。
   */
  private static async _copyPkgFetchToTemp(from: string, to: string, targetPlatform: string): Promise<void> {
    const currentPlatform =
      getFancyPlatform() === 'macos' ? getFancyPlatform() : `${getFancyPlatform()}-${getFancyArch()}`

    const versionStr = process.versions.node.match(/^[0-9]+/)
    if (!versionStr || !versionStr[0]) throw new Error('Unknow node.js version.')

    const version = `v${versionStr[0]}`

    let pkgFetchVersions = await fs.readdir(from)
    pkgFetchVersions = pkgFetchVersions.filter((i) => i === 'v3.4' || i === 'v3.5')

    let i = 0
    while (i < pkgFetchVersions.length) {
      const n = pkgFetchVersions[i]
      i += 1

      const d = path.resolve(from, n)
      const stat = await fs.stat(d)

      if (/^v[0-9]+.[0-9]+$/.test(n) && stat.isDirectory()) {
        const filenames = await fs.readdir(d)

        let j = 0
        while (j < filenames.length) {
          const filename = filenames[j]
          j += 1

          const needCopy =
            /^fetched-/.test(filename) &&
            !/.downloading$|-signed$/.test(filename) &&
            (filename.includes(targetPlatform) || filename.includes(currentPlatform)) &&
            filename.includes(version)

          if (needCopy) {
            // 需要进行文件拷贝
            const toDirSecond = path.resolve(to, n)

            if (!fs.existsSync(toDirSecond)) await fs.mkdirp(toDirSecond)
            await fs.copyFile(path.resolve(from, n, filename), path.resolve(to, n, filename))
          }
        }
      }
    }
  }

  /**
   * 猜测 pkg 可执行目录路径。
   */
  private static async _getPkgCommand(root: string): Promise<string> {
    const execaResult = await execa('npm', ['config', 'get', 'prefix'])

    const paths = [
      path.resolve(root, './node_modules/.bin/pkg'),

      path.resolve(process.cwd(), './node_modules/.bin/pkg'),

      path.resolve(execaResult.stdout, './bin/pkg'),
    ]

    let i = 0
    while (i < paths.length) {
      const p = paths[i]
      if (fs.existsSync(p)) return p
      i += 1
    }

    return paths[0]
  }

  private static _newFilename(options: IPKGInfo, target: string): string {
    let { name } = options
    if (typeof options.version === 'string') name += `-${options.version}`
    name += `-${target}`

    return target.includes('win') ? `${name}.exe` : name
  }

  private static _renameResult(options: IPKGInfo): void {
    const filenames = fs.readdirSync(options.outputPath)

    const replaceRules: [RegExp, RegExp][] = [
      [/linux$/, /linux/],
      [/macos$/, /macos/],
      [/win.exe$/, /win/],
      [/-linux-arm64$/, /-linux-arm64/],
      [/-macos-arm64$/, /-macos-arm64/],
      [/-win-arm64.exe$/, /-win-arm64/],
      [/-linux-x64$/, /-linux-x64/],
      [/-macos-x64$/, /-macos-x64/],
      [/-win-x64.exe$/, /-win-x64/],
    ]

    filenames.forEach((filename: string) => {
      const rule = replaceRules.find(([r]) => r.test(filename))
      if (rule) {
        const target = options.targets.find((i) => rule[1].test(i))
        if (target) {
          const p1 = path.resolve(options.outputPath, filename)
          const p2 = path.resolve(options.outputPath, this._newFilename(options, target))
          if (fs.existsSync(p2)) fs.removeSync(p2)
          fs.renameSync(p1, p2)
        }
      }
    })
  }
}
