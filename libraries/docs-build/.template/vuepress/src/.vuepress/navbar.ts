import { navbar, type NavbarOptions } from 'vuepress-theme-hope'

export interface ILangObj {
  'en-US': string
  'zh-CN': string
}

export type Lang = keyof ILangObj

export type LangPlus = `/${Lang}/`

export type INavbarOptionsGroup = {
  '/': NavbarOptions,
} & {
  [K in LangPlus]?: NavbarOptions
}

/**
 * Icon 从 https://fontawesome.com/search 中获取
 */
export default (() => {
  const navbarOptionsGroup: INavbarOptionsGroup = {{ JSON.stringify(navbarOptionsGroup, undefined, 2) }}

  const obj: INavbarOptionsGroup = {
    "/": []
  }

  Object.keys(navbarOptionsGroup).forEach((key) => {
    obj[key] = navbar(navbarOptionsGroup[key])
  })

  return obj
})()
