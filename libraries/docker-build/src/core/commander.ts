/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 17:51:25
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command } from 'commander'
import { parse as parseJsonC } from 'jsonc-parser'
import readPkg, { type NormalizedPackageJson } from 'read-pkg'

import { SupportPlatform } from '../enum'
import type { ICommandOptions, IConfigOptions, IDockerBuildOptions } from '../interface'
import { getDefaultImage } from '../util'

/**
 * @public
 *
 * 命令行交互对象
 *
 */
export class Commander {
  public static async parse(): Promise<IDockerBuildOptions> {
    const pkg = await readPkg({ cwd: path.resolve(__dirname, '../../') })

    const program = new Command()
    program.name('docker-build').version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'the execution path.', process.cwd())
      .option('-c, --config <char>', 'the path to the configuration file.')
      .option('--build-name <char>', 'the name part of the build output filename.')
      .option('--build-version <char>', 'the version part of the build output filename.')

      .option(
        '--platform <char>',
        "the 'platform' parameter when build docker image. Now, only support 'linux/amd64' 'linux/arm64'. Default is 'linux/amd64'."
      )
      .option('--input-path <char>', 'the entry file path.')

      .option('--base-image <char>', `the base docker image. Default: '${getDefaultImage()}'`)
      .option('--expose-port <number>', 'the port to expose in docker image.')

      .option('--publish', 'publish docker image.')
      .option('--publish-host <char>', 'the publish address.')
      .option('--last-clean', 'clean up the build artifacts.')

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
   * @param options - 命令行参数。
   * @returns 解析成果。
   */
  public static _parseCommandOptions(options: ICommandOptions): ICommandOptions {
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

    if (!config.docker) return {}

    const options: IConfigOptions = config.docker

    const withRoot = (p: unknown): string | undefined => {
      if (typeof p !== 'string') return undefined
      return path.isAbsolute(p) ? p : path.resolve(path.dirname(configPath), p)
    }

    return {
      ...options,

      assets: options.assets ? options.assets.map((i) => withRoot(i)!) : undefined,
      inputPath: withRoot(options.inputPath),
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
  ): IDockerBuildOptions {
    const defaultName = (pkg.name.match(/[^/]+$/g) ?? ['unknown'])[0]

    const platform: SupportPlatform = {
      [SupportPlatform.LINUX_AMD64]: SupportPlatform.LINUX_AMD64,
      [SupportPlatform.AMD64]: SupportPlatform.LINUX_AMD64,
      [SupportPlatform.LINUX_ARM64]: SupportPlatform.LINUX_ARM64,
      [SupportPlatform.ARM64]: SupportPlatform.LINUX_ARM64,
    }[o1.platform ?? o2.platform ?? SupportPlatform.LINUX_AMD64]

    const inputPath = o1.inputPath ?? o2.inputPath
    if (!inputPath) {
      throw new Error(`Please set '--input-path' or add 'docker.inputPath' in config file.`)
    }

    return {
      root: o1.root,
      config: o1.config,
      buildName: o1.buildName ?? o2.buildName ?? defaultName,
      buildVersion: o1.buildVersion ?? o2.buildVersion ?? pkg.version,
      platform,
      inputPath,
      publish: o1.publish ?? o2.publish ?? false,
      publishHost: o1.publishHost ?? o2.publishHost,
      baseImage: o1.baseImage ?? o2.baseImage ?? getDefaultImage(),
      exposePort: o1.exposePort ?? o2.exposePort ?? 16100,
      assets: o2.assets ?? [path.resolve(o1.root, 'package.json')],
      lastClean: o1.lastClean ?? o2.lastClean ?? false,
    }
  }
}
