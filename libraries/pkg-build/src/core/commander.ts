/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:34:20
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command, type OptionValues } from 'commander'
import { parse as parseJsonC } from 'jsonc-parser'
import type { Package } from 'normalize-package-data'

import { SupportTarget } from '../enum'
import type { ICommandOptions, IConfigOptions, IPkgBuildOptions } from '../interface'
import { readPkg } from '../util'

/**
 *
 * @public
 *
 * Command Line Argument Parsing Class
 *
 */
export class Commander {
  /**
   * @public
   *
   * Get the final configuration from command line arguments, configuration files, and default values.
   *
   * @returns The final configuration
   */
  public static async parse(): Promise<IPkgBuildOptions> {
    const pkg = readPkg()

    const program = new Command()
    program.name(pkg.name).version(pkg.version)
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

    const configOptions = this._parseConfig(commandOptions.config)

    const options = this._mergeOptionsWithDefault(commandOptions, configOptions, pkg)

    return options
  }

  /**
   *
   * @internal
   *
   * Converts the property describing the path from command line arguments into
   * an absolute path starting from the `options.root` location
   * and returns the correct `ICommandOptions` object.
   *
   * @param options - The unformatted command line object
   * @returns The formatted result.
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
   *
   * @internal
   *
   * Parses the configuration file and converts the property describing the path into
   * an absolute path starting from the folder where the `config` file is located,
   * then returns the correct `IConfigOptions` object.
   *
   * @param options - The absolute path to the configuration file.
   * @returns The parsed result of the configuration file information.
   */
  private static _parseConfig(configPath?: string): IConfigOptions {
    if (!configPath) return {}
    if (!fs.existsSync(configPath)) return {}
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
   * Merges configuration information and assigns default values.
   *
   * @param o1 - Configuration information obtained from command line arguments
   * @param o2 - Configuration information read from the configuration file
   * @returns The final configuration
   */
  private static _mergeOptionsWithDefault(o1: ICommandOptions, o2: IConfigOptions, pkg: Package): IPkgBuildOptions {
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
