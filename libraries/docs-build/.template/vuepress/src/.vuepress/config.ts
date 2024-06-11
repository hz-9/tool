import { defineUserConfig } from 'vuepress'

import theme from './theme.js'

export default defineUserConfig({
  base: '{{ options.baseUrl }}',

  lang: 'zh-CN',
  title: '{{ packageInfo.name }}',
  description: '{{ packageInfo.description }} 的文档演示',

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
