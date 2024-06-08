/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 15:41:07
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command } from 'commander'
import { parse as parseJsonC } from 'jsonc-parser'
import readPkg, { type NormalizedPackageJson } from 'read-pkg'

import { SupportPlatform } from '../enum'
import type { ICommandOptions, IConfigOptions, IDockerBuildOptions } from '../interface'

/**
 * @public
 *
 * 命令行交互对象
 *
 */
export class Commander {
  public static async parse(): Promise<IDockerBuildOptions> {
    const pkg = await readPkg()

    const program = new Command()
    program.name('pkg-build').version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'Root dir for workspace.', process.cwd())
      .option('-c, --config <char>', "Config file 's path.")
      .option('--build-name <char>', "The result 's name.")
      .option('--build-version <char>', "The result 's version.")
      .option('--platform <char>', "Support platform. Now, only support 'linux/amd64' 'linux/arm64'")
      .option('--input-path <char>', 'Entry file path.')
      .option('--clean', 'Is clean the result?')
      .option('--image <char>', "The base docker image. Default: 'node:18.20-slim'")
      .option('--node <char>', 'Node.js version in docker iamge.')
      .option('--expose-port <number>', 'Expose port in docker image.')
      .option('-p, --publish', 'Publish docker image host.')
      .option('--publish-host <char>', 'Is publish docker image?')

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

    const node: string = o1.node ?? o2.node ?? '18.20'

    return {
      root: o1.root,
      config: o1.config,
      buildName: o1.buildName ?? o2.buildName ?? defaultName,
      buildVersion: o1.buildVersion ?? o2.buildVersion ?? pkg.version,
      platform,
      inputPath: o1.inputPath ?? o2.inputPath ?? path.resolve(o1.root, './build/service'),
      node,
      publish: o1.publish ?? o2.publish ?? false,
      publishHost: o1.publishHost ?? o2.publishHost,
      image: o1.image ?? o2.image ?? `node:${node}-slim`,
      exposePort: o1.exposePort ?? o2.exposePort ?? 16100,
      assets: o2.assets ?? [path.resolve(o1.root, 'package.json')],
      clean: o1.clean ?? o2.clean ?? false,
    }
  }
}
