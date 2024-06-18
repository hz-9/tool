/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-18 19:37:38
 */
import type { Package } from 'normalize-package-data'

import type { VuepressAction } from '../enum'
import type { INavbarOptions } from './vuepress-theme-hope.navbar-options'
import type { ISidebarOptions } from './vuepress-theme-hope.sidebar-options'

export * from './vuepress-theme-hope.sidebar-options'
export * from './vuepress-theme-hope.navbar-options'

/**
 * @public
 *
 * The data mounting object.
 */
export interface IDocsItem {
  /**
   * The original file path.
   */
  baseFilepath: string

  /**
   * Whether it is a directory
   */
  isDir: boolean

  /**
   * The file path after moving.
   */
  newFilePath: string

  /**
   * Used to edit the sidebar structure.
   */
  sidebarCallback: (options: ISidebarOptions) => ISidebarOptions

  /**
   * Used to edit the navigation information.
   */
  navbarCallback: (o1: INavbarOptions, o2: ISidebarOptions) => INavbarOptions

  /**
   * Performs file transformation.
   */
  transform?: (s: string) => string
}

/**
 * @public
 *
 * Configuration information parsed from 'api-extractor.json'.
 *
 */
export interface IConfigOptions {
  /**
   * The path to the configuration file.
   */
  configPath: string

  /**
   *
   * API Docs:
   *
   * The folder where the 'index.api.md' file is located.
   *
   * Default: Reads the 'apiReport.reportFolder' property from the 'api-extractor.base.json' file.
   *
   */
  apiPath: string

  /**
   *
   * API Docs:
   *
   * The entry file.
   *
   * Default: Reads the 'mainEntryPointFilePath' property from the 'api-extractor.base.json' file.
   *
   */
  entryPath: string

  /**
   *
   * API Docs:
   *
   * The path where the 'index.api.json' file is located.
   *
   * Default: Reads the 'docModel.apiJsonFilePath' property from the 'api-extractor.base.json' file.
   *
   */
  apiJsonFilePath: string

  /**
   * The path to the rig package.
   */
  rigPackage?: string
}

/**
 * @internal
 *
 * Parameters passed in during template rendering.
 *
 */
export interface IRenderOptions {
  options: ICommandOptions

  /**
   * Options for the vuepress sidebar.
   */
  sidebarOptions: ISidebarOptions

  /**
   * Options for the vuepress navbar.
   */
  navbarOptions: INavbarOptions

  /**
   * Information about the package.
   */
  packageInfo: Package
}

/**
 * @public
 *
 * The result of parsing parameters from the command line.
 *
 * Except for 'root', no default values are set.
 */
export interface ICommandOptions {
  /**
   * The root path of the operation. Will be directly set by Command with the default value of process.cwd().
   */
  root: string

  /**
   * The path to the 'api-extractor.json' file.
   */
  config?: string

  /**
   * The location where the documentation will be generated.
   *
   * Default: `${root}/docs/.vuepress`.
   */
  docsSpace: string

  /**
   * API Docs:
   *
   * The output path for Markdown-related files.
   *
   * Default: './docs/.markdowns'
   */
  markdownPath: string

  /**
   * The action to perform on VuePress.
   */
  action?: VuepressAction

  /**
   * (Vuepress) The base path for generating documentation.
   *
   * Default: '/'
   *
   * Since 0.2.0
   */
  baseUrl: string

  /**
   * (Vuepress) The language of the documentation.
   *
   * Default: 'en-US'
   *
   * List of supported languages. Please [check](https://theme-hope.vuejs.press/config/i18n.html#supported-languages).
   *
   * Since 0.3.0
   */
  lang: string
}

/**
 * @public
 *
 * Navigation name parsing scheme.
 *
 */
export interface IDocsParseSchemeLang {
  'en-US': string
  'zh-CN': string
}

/**
 * @public
 *
 * File parsing scheme (sub-items for each feature).
 *
 */
export interface IDocsParseSchemeItem {
  /**
   * Navigation display name.
   */
  navName: IDocsParseSchemeLang

  /**
   * Navigation path.
   */
  navPath: string

  /**
   * Parsing path.
   */
  parsePath: string[]

  /**
   * Whether it is a directory
   */
  isDir?: true

  /**
   * Perform file transformation.
   */
  transform?: (s: string) => string
}

/**
 * @internal
 *
 * Information obtained from the 'projects' property when parsing the 'rush.json' file.
 *
 */
export interface IRushProject {
  packageName: string
  projectFolder: string
  shouldPublish?: boolean
}
