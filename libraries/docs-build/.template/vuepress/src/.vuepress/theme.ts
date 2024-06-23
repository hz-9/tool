import { hopeTheme } from 'vuepress-theme-hope'

import navbar from './navbar.js'
import sidebar from './sidebar.js'

const locales = {}

Object.keys(navbar).forEach((key) => {
  if (!locales[key]) locales[key] = {}
  locales[key].navbar = navbar[key]
})

Object.keys(sidebar).forEach((key) => {
  if (!locales[key]) locales[key] = {}
  locales[key].sidebar = sidebar[key]
})

export default hopeTheme({
  iconAssets: 'fontawesome',

  docsDir: 'src',

  repo: {{ gitInfo.gitUrl ? `'${gitInfo.gitUrl}'` : 'undefined' }},

  locales,

  // navbar,

  // sidebar,

  footer: '',

  displayFooter: true,

  editLink: false,

  // page meta
  metaLocales: {
    // editLink: "在 GitHub 上编辑此页",
  },

  plugins: {},
})
