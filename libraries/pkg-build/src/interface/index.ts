/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:24:19
 */
import type { SupportTarget } from '../enum'

/**
 * @internal
 *
 * The parsed parameters from the command line.
 *
 */
export type ICommandOptions = Partial<Omit<IPkgBuildOptions, 'root' | 'assets' | 'scripts'>> &
  Pick<IPkgBuildOptions, 'root'>

/**
 * @internal
 *
 * The parsed configuration file options.
 *
 */
export interface IConfigOptions extends Partial<Omit<IPkgBuildOptions, 'root' | 'config'>> {}

/**
 * @public
 *
 * The options required for PKG Build.
 *
 */
export interface IPkgBuildOptions {
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
   * Default: 'linux-x64'
   *
   * Description: https://www.npmjs.com/package/pkg#targets
   */
  targets: SupportTarget[]

  /**
   * The entry file.
   *
   * Default: `./src/index.js`
   */
  inputPath: string

  /**
   * The output directory.
   *
   * Default: './build'
   */
  outputPath: string

  /**
   * Additional files to package.
   *
   * Description: https://www.npmjs.com/package/pkg#scripts
   */
  scripts: string[]

  /**
   * Additional files to package.
   *
   * Description: https://www.npmjs.com/package/pkg#assets
   */
  assets: string[]
}
