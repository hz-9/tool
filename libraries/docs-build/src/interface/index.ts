/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 11:14:05
 */
import type { VuepressAction } from '../enum'
import type { INavbarOptions } from './vuepress-theme-hope.navbar-options'
import type { ISidebarOptions } from './vuepress-theme-hope.sidebar-options'

export * from './vuepress-theme-hope.sidebar-options'
export * from './vuepress-theme-hope.navbar-options'

/**
 * 数据挂载对象。
 */
export interface IDocsItem {
  /**
   * 文件原始路径。
   */
  baseFilepath: string

  /**
   * 移动后的文件路径。
   */
  newFilePath: string

  /**
   * 用以监听的文件路径。
   */
  watchFilePath: string

  /**
   * 用以编辑目录结构
   */
  sidebarCallback: (options: ISidebarOptions) => ISidebarOptions

  /**
   * 用以编辑导航信息
   */
  navbarCallback: (o1: INavbarOptions, o2: ISidebarOptions) => INavbarOptions

  /**
   * 进行文件装换。
   */
  transform?: (s: string) => string
}

/**
 * @public
 *
 *  从 api-extractor.json 中解析出来的配置信息。
 *
 */
export interface IConfigOptions {
  /**
   *
   * API Docs:
   *
   * index.api.json 文件所在文件夹。
   *
   * 默认：读取 api-extractor.base.json 文件中的 apiReport.reportFolder 属性
   *
   */
  apiPath: string

  /**
   *
   * API Docs:
   *
   *  入口文件
   *
   * 默认：读取 api-extractor.base.json 文件中的 mainEntryPointFilePath 属性
   *
   */
  entryPath: string

  /**
   * 配置文件路径。
   */
  configPath: string
}

export interface IPackageInfo {
  name: string
  description: string
}

export interface IRenderOptions {
  sidebarOptions: ISidebarOptions

  navbarOptions: INavbarOptions

  packageInfo: IPackageInfo
}

/**
 * @public
 *
 *  从命令行出进行解析的参数结果。
 *
 *  除 root 外，不进行默认值设置。
 *
 */
export interface ICommandOptions {
  /**
   * 操作根路径。会由 Command 直接设置默认值为 process.cwd()
   */
  root: string

  /**
   *
   * 文档生成地址。
   *
   * 默认为：'${root}/docs/.vuepress'。
   *
   */
  docsSpace: string

  /**
   *
   * api-extractor.json 所在路径。
   *
   */
  config?: string

  /**
   *
   * API Docs:
   *
   *  Markdown 相关文件输出路径。
   *
   * 默认：'./docs/.markdowns'
   *
   */
  markdownPath: string

  /**
   *
   * 对 VuePress 的动作。
   *
   */
  action?: VuepressAction
}

/**
 * @public
 *
 *  文件解析方案。(每个功能的子项)
 *
 */
export interface IDocsParseSchemeItem {
  /**
   * 导航显示名称。
   */
  navName: string

  /**
   * 导航路径。
   */
  navPath: string

  /**
   * 解析路径。
   */
  parsePath: string[]

  /**
   * 是否为文件夹
   */
  isDir?: true

  /**
   * 进行文件装换。
   */
  transform?: (s: string) => string
}

export interface IRushProject {
  packageName: string
  projectFolder: string
  shouldPublish?: boolean
}
