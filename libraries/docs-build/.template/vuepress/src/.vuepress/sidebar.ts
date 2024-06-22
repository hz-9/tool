import { sidebar, type SidebarObjectOptions } from 'vuepress-theme-hope'

// /**
//  *
//  * Guide
//  *
//  * API
//  *
//  * ChangeLog.md
//  */

export interface ILangObj {
  'en-US': string
  'zh-CN': string
}

export type Lang = keyof ILangObj

export type LangPlus = `/${Lang}/`

export type ISidebarOptionsGroup = {
  '/': SidebarObjectOptions,
} & {
  [K in LangPlus]?: SidebarObjectOptions
}

/**
 * Icon 从 https://fontawesome.com/search 中获取
 */
export default (() => {
  const sidebarOptionsGroup: ISidebarOptionsGroup = {{ JSON.stringify(sidebarOptionsGroup, undefined, 2) }}

  const obj: ISidebarOptionsGroup = {
    "/": {}
  }

  Object.keys(sidebarOptionsGroup).forEach((key) => {
    obj[key] = sidebar(sidebarOptionsGroup[key])
  })

  return obj
})()
