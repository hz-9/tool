/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 17:37:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 16:28:01
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import exitHook from 'exit-hook'

import type { IPkgBuildOptions } from '../interface'
import { copyPkgFetchToTemp, getPkgCommand, printCommand, printOptions } from '../util'

const pkgCachePath: string = process.env.PKG_CACHE_PATH ?? path.resolve(process.env.HOME!, './.pkg-cache')

/**
 * 等待删除的文件列表。
 */
const needDeleteDirList: string[] = []

/**
 * 推出后，对中间成果进行删除。
 */
exitHook(() => {
  needDeleteDirList.forEach((d: string) => {
    // fs.removeSync(d)
  })
})

/**
 * @public
 *
 *  Pkg 构建工具类
 *
 */
export class PkgBuild {
  public static async build(options: IPkgBuildOptions): Promise<void> {
    await printOptions(options)

    const tempDir = path.resolve(options.root, 'temp', '.hz9/pkg-build', `${Date.now()}`)
    needDeleteDirList.push(tempDir)
    fs.mkdirpSync(tempDir)

    const tempPkgFetchDir: string = path.resolve(tempDir, '.pkg-cache')
    const tempConfigPath = path.resolve(tempDir, '.pkg.json')

    await this._copyPKGFetch(options, tempPkgFetchDir)

    await this._createPkgJSON(options, tempConfigPath)

    await this._build(options, tempPkgFetchDir, tempConfigPath)

    await this._renameResult(options)
  }

  /**
   * 拷贝 pkg-fetch 文件。
   */
  private static async _copyPKGFetch(options: IPkgBuildOptions, tempPkgFetchDir: string): Promise<void> {
    // 拷贝打包资源
    const copyTargets: string[] = [...options.targets]
    while (copyTargets.length) {
      const t = copyTargets.pop()!
      await copyPkgFetchToTemp(pkgCachePath, tempPkgFetchDir, t)
    }
  }

  private static _createPkgJSON(options: IPkgBuildOptions, tempConfigPath: string): void {
    // 拷贝 .pkg.json
    const tempConfig = {
      pkg: {
        assets: options.assets ?? [],
        scripts: options.scripts ?? [],
      },
    }

    tempConfig.pkg.assets = tempConfig.pkg.assets.map((i) => path.relative(path.dirname(tempConfigPath), i))
    tempConfig.pkg.scripts = tempConfig.pkg.scripts.map((i) => path.relative(path.dirname(tempConfigPath), i))

    fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, undefined, 2), { encoding: 'utf8' })
  }

  /**
   * 执行构建任务。
   */
  private static async _build(
    options: IPkgBuildOptions,
    tempPkgFetchDir: string,
    tempConfigPath: string
  ): Promise<void> {
    const commands: string[] = [
      path.relative(options.root, options.inputPath),
      '--target',
      options.targets.join(','),
      '--out-path',
      path.relative(options.root, options.outputPath),
      '--config',
      path.relative(options.root, tempConfigPath),
    ]

    const pkgCommand = await getPkgCommand(options.root)
    await printCommand(`pkg ${commands.join(' ')}`)
    await execa(pkgCommand, commands, {
      env: {
        PKG_CACHE_PATH: tempPkgFetchDir,
      },
      cwd: options.root,
      stderr: process.stderr,
      stdout: process.stdout,
    })
  }

  private static _newFilename(options: IPkgBuildOptions, target: string): string {
    let { buildName } = options
    if (typeof options.buildVersion === 'string') buildName += `-${options.buildVersion}`
    buildName += `-${target}`

    return target.includes('win') ? `${buildName}.exe` : buildName
  }

  /**
   * 将成果文件，进行重命名。
   */
  private static _renameResult(options: IPkgBuildOptions): void {
    const filenames = fs.readdirSync(options.outputPath)

    if (filenames.length === 1) {
      const p1 = path.resolve(options.outputPath, filenames[0])
      const p2 = path.resolve(options.outputPath, this._newFilename(options, options.targets[0]))
      if (fs.existsSync(p2)) fs.removeSync(p2)
      fs.renameSync(p1, p2)
    } else {
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
}
