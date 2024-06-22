/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-23 01:23:47
 */
import type { Package } from 'normalize-package-data'

import type { VuepressAction } from '../enum'
import type { INavbarOptions } from './vuepress-theme-hope.navbar-options'
import type { ISidebarObjectOptions } from './vuepress-theme-hope.sidebar-options'

export * from './vuepress-theme-hope.sidebar-options'
export * from './vuepress-theme-hope.navbar-options'
/**
 * @public
 *
 * The data mounting object.
 */
export interface IDocsItem {
  baseFilepath: string

  focusFilepath: string

  isDir: boolean

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

  /**
   * `api documenter`version filepath.
   */
  apiDocVersionFilepath: string
}

/**
 * @internal
 *
 * Parameters passed in during template rendering.
 *
 */
export interface IRenderOptions {
  options: ICommandOptions

  locales: ILocales

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
  lang: Lang[]
}

/**
 * @public
 *
 */
export interface ILangObj {
  'en-US': string
  'zh-CN': string
}

/**
 * @internal
 */
export type Lang = keyof ILangObj

/**
 * @internal
 */
export type LangPlus = `/${Lang}/`

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
  navName: ILangObj

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

/**
 * @internal
 *
 * The version file of the API document.
 *
 */
export interface IApiDocVersionFile {
  hash: string
}

/**
 * @internal
 */
export type INavbarOptionsGroup = {
  '/': INavbarOptions
} & {
  [K in LangPlus]?: INavbarOptions
}

/**
 * @internal
 */
export type ISidebarOptionsGroup = {
  '/': ISidebarObjectOptions
} & {
  [K in LangPlus]?: ISidebarObjectOptions
}

/**
 * @internal
 */
export type ILocales = {
  '/': { lang: Lang }
} & {
  [K in LangPlus]?: { lang: Lang }
}
