/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-10 11:34:26
 */
import type { SupportTarget } from '../enum'

/**
 * @public
 *
 *  从命令行出进行解析的参数结果。
 *
 *  除 root 外，不进行默认值设置。
 *
 */
export type ICommandOptions = Partial<Omit<IPkgBuildOptions, 'root' | 'assets' | 'scripts'>> &
  Pick<IPkgBuildOptions, 'root'>

/**
 * @public
 *
 *  配置文件解析结果。
 *
 */
export interface IConfigOptions extends Partial<Omit<IPkgBuildOptions, 'root' | 'config'>> {}

/**
 * @public
 *
 *  PKG Build 构建时所需参数。
 *
 */
export interface IPkgBuildOptions {
  /**
   * 操作根路径。会由 Command 直接设置默认值为 process.cwd()
   */
  root: string

  /**
   * 配置文件存在路径。
   */
  config?: string

  /**
   *
   * 构建名称。
   *
   * 默认：采用 package.json 的 name 属性；（去除 scoped 部分）
   *
   */
  buildName: string

  /**
   * 构建版本。
   *
   * 默认：采用 package.json 的 version 属性；
   */
  buildVersion: string

  /**
   *
   * 目标平台。
   *
   * 默认：'linux-x64'
   *
   * 说明：https://www.npmjs.com/package/pkg#targets
   *
   */
  targets: SupportTarget[]

  /**
   * 入口文件。
   *
   * 默认为：`./src/index.js`
   */
  inputPath: string

  /**
   *
   * 输出目录.
   *
   * 默认：'./build'
   *
   */
  outputPath: string

  /**
   *
   * 额外打包的文件。
   *
   * 说明：https://www.npmjs.com/package/pkg#scripts
   *
   */
  scripts: string[]

  /**
   *
   * 额外打包的文件。
   *
   * 说明：https://www.npmjs.com/package/pkg#assets
   *
   */
  assets: string[]
}
