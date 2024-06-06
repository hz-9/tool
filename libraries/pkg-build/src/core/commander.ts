/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 20:24:32
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command, type OptionValues } from 'commander'
import { parse as parseJsonC } from 'jsonc-parser'
import readPkg, { type NormalizedPackageJson } from 'read-pkg'

import type { ICommandOptions, IConfigOptions, IPKGInfo } from '../interface'

/**
 * @public
 *
 * 命令行交互对象
 *
 */
export class Commander {
  public static async parse(): Promise<IPKGInfo> {
    const pkg = await readPkg()

    const program = new Command()
    program.name('pkg-build').version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'root dir.', process.cwd())
      .option('-c, --config <char>', 'config file path.')
      .option('-t, --targets <char>', 'target platform.')
      .option('-i, --input-path <char>', 'input file path.')
      .option('-o, --output-path <char>', 'output dir path.')
      .option('--package-name <char>', "package's name.")
      .option('--package-version <char>', "package's version.")

    program.parse(process.argv)
    const commandOptions = this._parseCommandOptions(program.opts())

    let configOptions = {}

    if (commandOptions.config) {
      // 通过 Config 进行信息补充；
      configOptions = this._parseConfig(commandOptions.config)
    }

    const options = this._mergeOptionsWithDefault(commandOptions, configOptions, pkg)

    return options
  }

  /**
   * @internal
   *
   *  用以解析命令行获取的对象。
   *
   *  inputPath outputPath config 属性，若为相对路径，均会与 root 拼接为绝对路径。
   *
   * @param options - 命令行参数。
   * @returns 解析成果。
   */
  public static _parseCommandOptions(options: OptionValues): ICommandOptions {
    const root: string = options.root ?? process.cwd()

    const withRoot = (p: unknown): string | undefined => {
      if (typeof p !== 'string') return undefined
      return path.isAbsolute(p) ? p : path.resolve(root, p)
    }

    const result: ICommandOptions = {
      root,
      inputPath: withRoot(options.inputPath),
      name: options.packageName,
      version: options.packageVersion,

      outputPath: withRoot(options.outputPath),
      targets: typeof options.targets === 'string' ? options.targets.split(',') : options.targets,

      config: withRoot(options.config),
    }

    return result
  }

  /**
   * @internal
   *
   *  解析配置文件。
   *
   * @param configPath - 文件路径。
   * @returns 解析成果。
   */
  private static _parseConfig(configPath: string): IConfigOptions {
    const info = parseJsonC(fs.readFileSync(configPath, { encoding: 'utf8' }))

    const withRoot = (p: unknown): string | undefined => {
      if (typeof p !== 'string') return undefined
      return path.isAbsolute(p) ? p : path.resolve(path.dirname(configPath), p)
    }

    return {
      scripts: info.pkg?.scripts,
      assets: info.pkg?.assets,
      targets: info.pkg?.targets,
      outputPath: withRoot(info.pkg?.outputPath),

      inputPath: withRoot(info.pkg?.inputPath),
      name: info.pkg?.name,
      version: info.pkg?.version,
    }
  }

  /**
   * @internal
   *
   *  合并配置信息，并赋予默认值。
   *
   * @param o1 - 命令行参数获取的配置信息
   * @param o2 - 配置文件中读取的配置信息
   * @returns 最终成果
   */
  private static _mergeOptionsWithDefault(
    o1: ICommandOptions,
    o2: IConfigOptions,
    pkg: NormalizedPackageJson
  ): IPKGInfo {
    const scripts = o2.scripts ?? []
    const assets = o2.assets ?? []

    const inputPath = o1.inputPath ?? o2.inputPath ?? path.resolve(o1.root, './src/index.js')
    const outputPath = o1.outputPath ?? o2.outputPath ?? path.resolve(o1.root, './build')

    const targets = o1.targets ?? o2.targets ?? []
    if (!targets.length) targets.push('linux-x64')

    let name = o1.name ?? o2.name ?? true
    if (name === true) name = (pkg.name.match(/[^/]+$/g) ?? ['unknown'])[0]
    if (name === false) name = path.trimExt(path.basename(inputPath))

    let version = o1.version ?? o2.version ?? true
    if (version === true) version = pkg.version

    return {
      root: o1.root,
      scripts,
      assets,
      targets,
      inputPath,
      outputPath,
      name,
      version,
    }
  }
}
