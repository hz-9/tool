/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-10 14:35:43
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 16:26:22
 */
import { defineUserConfig } from 'vuepress'

import theme from './theme.js'

export default defineUserConfig({
  base: '{{ options.baseUrl }}',

  lang: '{{ options.lang }}',
  title: '{{ packageInfo.name }}',

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
