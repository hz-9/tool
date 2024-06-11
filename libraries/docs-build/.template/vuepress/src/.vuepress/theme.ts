import { hopeTheme } from 'vuepress-theme-hope'

import navbar from './navbar.js'
import sidebar from './sidebar.js'

export default hopeTheme({
  iconAssets: 'fontawesome',

  docsDir: 'src',

  navbar,

  sidebar,

  footer: '',

  displayFooter: true,

  editLink: false,

  // page meta
  metaLocales: {
    // editLink: "在 GitHub 上编辑此页",
  },

  plugins: {},
})
