/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 17:38:09
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command, type OptionValues } from 'commander'
import { parse as parseJsonC } from 'jsonc-parser'
import readPkg, { type NormalizedPackageJson } from 'read-pkg'

import { SupportTarget } from '../enum'
import type { ICommandOptions, IConfigOptions, IPkgBuildOptions } from '../interface'

/**
 * @public
 *
 * 命令行交互对象
 *
 */
export class Commander {
  public static async parse(): Promise<IPkgBuildOptions> {
    const pkg = await readPkg({ cwd: path.resolve(__dirname, '../../') })

    const program = new Command()
    program.name('pkg-build').version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'the execution path.', process.cwd())
      .option('-c, --config <char>', 'the path to the configuration file.')
      .option('--build-name <char>', 'the name part of the build output filename.')
      .option('--build-version <char>', 'the version part of the build output filename.')

      .option('--targets <char>', 'the targets parameter when execution pkg.')
      .option('--input-path <char>', "the entry file path when execution pkg. Default is './src/index.js'")
      .option('--output-path <char>', "the output folder path when execution pkg. Default is './build'")

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

    return {
      ...options,

      root,
      config: withRoot(options.config),
      inputPath: withRoot(options.inputPath),
      outputPath: withRoot(options.outputPath),
    }
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
    const config = parseJsonC(fs.readFileSync(configPath, { encoding: 'utf8' }))

    if (!config.pkg) return {}

    const options: IConfigOptions = config.pkg

    const withRoot = (p: unknown): string | undefined => {
      if (typeof p !== 'string') return undefined
      return path.isAbsolute(p) ? p : path.resolve(path.dirname(configPath), p)
    }

    return {
      ...options,

      scripts: options.scripts ? options.scripts.map((i) => withRoot(i)!) : undefined,
      assets: options.assets ? options.assets.map((i) => withRoot(i)!) : undefined,

      inputPath: withRoot(options.inputPath),
      outputPath: withRoot(options.outputPath),
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
  ): IPkgBuildOptions {
    const targets = o1.targets ?? o2.targets ?? []
    if (!targets.length) targets.push(SupportTarget.LinuxX64)

    const defaultName = (pkg.name.match(/[^/]+$/g) ?? ['unknown'])[0]

    return {
      root: o1.root,
      config: o1.config,
      buildName: o1.buildName ?? o2.buildName ?? defaultName,
      buildVersion: o1.buildVersion ?? o2.buildVersion ?? pkg.version,
      inputPath: o1.inputPath ?? o2.inputPath ?? path.resolve(o1.root, './src/index.js'),
      outputPath: o1.outputPath ?? o2.outputPath ?? path.resolve(o1.root, './build'),
      targets,
      scripts: o2.scripts ?? [],
      assets: o2.assets ?? [],
    }
  }
}
