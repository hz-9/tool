/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 19:34:53
 */
import type { SupportPlatform } from '../enum'

/**
 * @internal
 *
 * The parsed parameters from the command line.
 *
 */
export type ICommandOptions = Partial<Omit<IDockerBuildOptions, 'root' | 'assets'>> & Pick<IDockerBuildOptions, 'root'>

/**
 * @internal
 *
 * The parsed configuration file options.
 *
 */
export interface IConfigOptions extends Partial<Omit<IDockerBuildOptions, 'root' | 'config'>> {}

/**
 * @public
 *
 * The options required for Docker Build.
 *
 */
export interface IDockerBuildOptions {
  /**
   * The root path for operations. Defaults to `process.cwd()` set directly by Command.
   */
  root: string

  /**
   * The path where the configuration file exists.
   */
  config?: string

  /**
   * The build name.
   *
   * Default: Uses the name property from `package.json` (excluding the scoped part);
   */
  buildName: string

  /**
   * The build version.
   *
   * Default: Uses the version property from `package.json`;
   */
  buildVersion: string

  /**
   * The target platform.
   *
   * Default: 'linux-amd64'
   */
  platform: SupportPlatform

  /**
   * The entry file.
   */
  inputPath: string

  /**
   * The base image to use during packaging.
   *
   * The image will change based on the node property.
   * If the image property is specified, the node property will be ignored.
   *
   * Default: `node:${node}-slim` eg: 'node:18.20-slim'
   */
  baseImage: string

  /**
   * The exposed port.
   *
   * Default: 16100.
   */
  exposePort: number

  /**
   * Static assets to be included in the image.
   *
   * Default: `['package.json']`
   */
  assets: string[]

  /**
   * Whether to publish the image.
   *
   * Default: false
   */
  publish: boolean

  /**
   * The image publication address.
   */
  publishHost?: string

  /**
   * Whether to clean up the built image.
   *
   * Default: false
   */
  lastClean: boolean
}
