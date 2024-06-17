/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 17:37:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:16:51
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import exitHook from 'exit-hook'

import type { IPkgBuildOptions } from '../interface'
import { printCommand, printOptions } from '../util'

const pkgCachePath: string = process.env.PKG_CACHE_PATH ?? path.resolve(process.env.HOME!, './.pkg-cache')

/**
 *
 * @public
 *
 * A build class that utilizes the `pkg` build result.
 *
 */
export class PkgBuild {
  protected needDeleteDirList: string[]

  public constructor() {
    this.needDeleteDirList = []
    this._initExitHook()
  }

  private _initExitHook(): void {
    exitHook(() => {
      this.needDeleteDirList.forEach((d: string) => {
        fs.removeSync(d)
      })
    })
  }

  /**
   *
   * @public
   *
   * Executes the build operation.
   *
   * @param options - The necessary configuration information obtained from the `Commander` class.
   *
   * @returns A `PkgBuild` instance
   */
  public static async build(options: IPkgBuildOptions): Promise<PkgBuild> {
    const p = new PkgBuild()
    await p.build(options)
    return p
  }

  /**
   *
   * @public
   *
   * Executes the build operation.
   *
   * @param options - The necessary configuration information obtained from the `Commander` class.
   *
   */
  public async build(options: IPkgBuildOptions): Promise<void> {
    await printOptions(options)

    const tempDir = path.resolve(options.root, 'temp', '.hz9/pkg-build', `${Date.now()}`)
    this.needDeleteDirList.push(tempDir)
    fs.mkdirpSync(tempDir)

    const tempPkgFetchDir: string = path.resolve(tempDir, '.pkg-cache')
    const tempConfigPath = path.resolve(tempDir, '.pkg.json')

    await this._copyPKGFetch(options, tempPkgFetchDir)

    await this._createPkgJSON(options, tempConfigPath)

    await this._pkgBuild(options, tempPkgFetchDir, tempConfigPath)

    await this._renameResult(options)
  }

  /**
   *
   * When performing parallel packaging of multiple tasks,
   * there is a pkg-fetch file locking exception. Therefore,
   * during the runtime of `@hz-9/pkg-build`, only a copy of the `~/.pkg-cache` folder will be used.
   *
   */
  private async _copyPKGFetch(options: IPkgBuildOptions, tempPkgFetchDir: string): Promise<void> {
    // 拷贝打包资源
    const copyTargets: string[] = [...options.targets]
    while (copyTargets.length) {
      const t = copyTargets.pop()!
      await this._copyPKGFetchItem(pkgCachePath, tempPkgFetchDir, t)
    }
  }

  /**
   *
   * Copies source files to the project path.
   *
   * @param from - Source folder.
   * @param to - Destination folder.
   * @param platform - Target platform.
   *
   */
  private async _copyPKGFetchItem(from: string, to: string, targetPlatform: string): Promise<void> {
    const currentPlatform =
      PkgBuild.getFancyPlatform() === 'macos'
        ? PkgBuild.getFancyPlatform()
        : `${PkgBuild.getFancyPlatform()}-${PkgBuild.getFancyArch()}`

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
   *
   * Writes to a temporary `pkg.json` file
   *
   * @param options - Configuration information
   * @param tempConfigPath - The storage path for the temporary `pkg.json` file
   *
   */
  private _createPkgJSON(options: IPkgBuildOptions, tempConfigPath: string): void {
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
   *
   * Executes the `pkg build ...` command
   *
   */
  private async _pkgBuild(options: IPkgBuildOptions, tempPkgFetchDir: string, tempConfigPath: string): Promise<void> {
    const commands: string[] = [
      path.relative(options.root, options.inputPath),
      '--target',
      options.targets.join(','),
      '--out-path',
      path.relative(options.root, options.outputPath),
      '--config',
      path.relative(options.root, tempConfigPath),
    ]

    const pkgCommand = await PkgBuild.getPkgCommand(options.root)
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

  private _newFilename(options: IPkgBuildOptions, target: string): string {
    let { buildName } = options
    if (typeof options.buildVersion === 'string') buildName += `-${options.buildVersion}`
    buildName += `-${target}`

    return target.includes('win') ? `${buildName}.exe` : buildName
  }

  private _renameResult(options: IPkgBuildOptions): void {
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

  /**
   *
   * @public
   *
   * Gets the current platform.
   *
   * If it is under the MacOS Arm framework, it will return x64.
   *
   */
  public static getDefaultFancyArch(): string {
    if (process.platform === 'darwin' && process.arch === 'arm64') return 'x64'
    return process.arch
  }

  /**
   *
   * @public
   *
   * Gets the framework name
   *
   */
  public static getFancyArch(arch: string = this.getDefaultFancyArch()): string {
    if (arch === 'arm') return 'armv7'
    if (arch === 'ia32') return 'x86'
    if (arch === 'x86_64') return 'x64'
    return arch
  }

  /**
   *
   * @public
   *
   * Gets the current system name
   *
   */
  public static getFancyPlatform(platform: string = process.platform): string {
    if (platform === 'darwin') return 'macos'
    if (platform === 'lin') return 'linux'
    if (platform === 'mac') return 'macos'
    if (platform === 'osx') return 'macos'
    if (platform === 'win32') return 'win'
    if (platform === 'windows') return 'win'
    return platform
  }

  /**
   *
   * @public
   *
   * Gets the `pkg` command-line file
   *
   */
  public static async getPkgCommand(root: string): Promise<string> {
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

    return 'pkg'
  }
}
