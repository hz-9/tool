/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 16:27:28
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
 *  DockerBuild 构建时所需参数。
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

// /**
//  * @public
//  *
//  *  pkg 官方支持配置文件。
//  *
//  */
// export interface IPkgBase {
//   /**
//    *
//    * 说明：https://www.npmjs.com/package/pkg#scripts
//    *
//    */
//   scripts?: string[]

//   /**
//    *
//    * 说明：https://www.npmjs.com/package/pkg#assets
//    *
//    */
//   assets?: string[]

//   /**
//    *
//    * 目标平台。
//    *
//    * 说明：https://www.npmjs.com/package/pkg#targets
//    *
//    */
//   targets?: string[]

//   /**
//    *
//    * 输出目录.
//    *
//    * 默认：'./build'
//    *
//    */
//   outputPath?: string
// }

// /**
//  * @public
//  *
//  *  pkg-build 扩展的参数。
//  *
//  */
// export interface IPkgExtra {
//   /**
//    * 操作根路径。仅限 commander 能进行解析。
//    *
//    * 默认：process.cwd()
//    */
//   root: string

//   /**
//    * 入口文件。
//    *
//    * 默认：'./src/index.js'
//    */
//   inputPath?: string

//   /**
//    * 成果名称。
//    *
//    * undefined 视为 true
//    *
//    * true    : 采用 package.json 的 name 属性；（去除 scoped 部分）
//    * false   : 对入口文件同名；（去除文件后缀）
//    * string  : 作为成果名称；
//    *
//    */
//   name?: true | false | string

//   /**
//    * 成果版本。
//    *
//    * undefined 视为 true
//    *
//    * true    : 采用 package.json 的 version 属性；（去除 scoped 部分）
//    * false   : 不显示版本号；
//    * string  : 作为成果版本；
//    *
//    */
//   version?: true | false | string
// }

// /**
//  * @public
//  *
//  *  解析 CommandOptions 后的数据对象。
//  *
//  *  root 属性若缺省，为 process.cwd()
//  *
//  *  inputPath outputPath config 属性，若为相对路径，均会与 root 拼接为绝对路径。
//  *
//  */
// export type ICommandOptions = IPkgExtra &
//   Pick<IPkgBase, 'outputPath' | 'targets'> & {
//     /**
//      * 配置文件存在路径。
//      */
//     config?: string
//   }

// export type IConfigOptions = Partial<IPkgBase> & Partial<Omit<IPkgExtra, 'root'>>

// /**
//  * @public
//  *
//  *  用于打包时的配置信息。
//  *
//  *  内部的所有路径属性，均应使用绝对路径。
//  *
//  */
// export type IPKGInfo = Required<IPkgBase> &
//   Required<IPkgExtra> & {
//     name: string

//     version: false | string
//   }
