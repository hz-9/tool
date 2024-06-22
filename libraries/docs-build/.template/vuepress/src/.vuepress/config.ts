/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-10 14:35:43
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-23 01:10:19
 */
import { defineUserConfig } from 'vuepress'

import theme from './theme.js'

export default defineUserConfig({
  base: '{{ options.baseUrl }}',

  title: '{{ packageInfo.name }}',

  locales: {{ JSON.stringify(locales, undefined, 2) }},

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
