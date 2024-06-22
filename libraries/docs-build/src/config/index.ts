/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-10 12:18:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-23 01:08:45
 */
import * as path from 'upath'

import type { IDocsParseSchemeItem, Lang } from '../interface/index'

export const defaultApiMarkdownPath: string = './docs/.markdowns'

export const fileSuffix: Record<Lang, RegExp> = {
  'en-US': /.en-US.md$/,
  'zh-CN': /.zh-CN.md$/,
}

export const fileSuffixs: RegExp[] = Object.values(fileSuffix)

const DocsParseSchemeBase = {
  '/': {
    parsePath: ['./docs/README.md', './README.md'],
    navName: { 'en-US': 'Home', 'zh-CN': '首页' },
    navPath: '/',
  } as IDocsParseSchemeItem,

  overview: {
    parsePath: ['./docs/overview'],
    navName: { 'en-US': 'Overview', 'zh-CN': '概述' },
    navPath: '/overview',
  } as IDocsParseSchemeItem,

  guide: {
    parsePath: ['./docs/guide'],
    navName: { 'en-US': 'Guide', 'zh-CN': '指南' },
    navPath: '/guide',
  } as IDocsParseSchemeItem,

  advance: {
    parsePath: ['./docs/advance'],
    navName: { 'en-US': 'Advance', 'zh-CN': '进阶' },
    navPath: '/advance',
  } as IDocsParseSchemeItem,

  api: {
    parsePath: [
      // ... 应由 options.markdownPath 属性进行补全、
    ],
    navName: { 'en-US': 'API', 'zh-CN': '配置项' },
    navPath: '/api',
    // transform: (content: string): string => {
    //   if (content.includes('## API Reference')) {
    //     const matched = content.match(/\[[^[]+\]/g)
    //     if (matched && matched.length === 2) {
    //       return content
    //         .replace(matched[0], matched[1])
    //         .replace('## API Reference', `# ${matched[1].replace(/\[|\]/g, '')}`)
    //     }
    //   }

    //   return content.replace('## ', '# ')
    // },
  } as IDocsParseSchemeItem,

  changelog: {
    parsePath: ['./docs/CHANGELOG.md', './CHANGELOG.md'],
    navName: { 'en-US': 'Changelog', 'zh-CN': '更新日志' },
    navPath: '/changelog',
    transform: (content: string): string => content.replace('# Change Log - ', '# '),
  } as IDocsParseSchemeItem,

  todo: {
    parsePath: ['./docs/TODOLIST.md', './TODOLIST.md'],
    navName: { 'en-US': 'Todolist', 'zh-CN': '待办清单' },
    navPath: '/todo',
  } as IDocsParseSchemeItem,

  about: {
    parsePath: ['./docs/ABOUT.md'],
    navName: { 'en-US': 'About', 'zh-CN': '关于' },
    navPath: '/about',
  } as IDocsParseSchemeItem,
} as const

export const DocsParseSchemeMultiRoot = {
  '/': DocsParseSchemeBase['/'],
  overview: DocsParseSchemeBase.overview,
} as const

export const DocsParseSchemeMultiItem = {
  guide: DocsParseSchemeBase.guide,
  advance: DocsParseSchemeBase.advance,
  api: DocsParseSchemeBase.api,
  changelog: DocsParseSchemeBase.changelog,
  todo: DocsParseSchemeBase.todo,
  about: DocsParseSchemeBase.about,
} as const

export type DocsParseSchemeType = typeof DocsParseSchemeBase

export const DocsParseScheme: typeof DocsParseSchemeBase = DocsParseSchemeBase

export const baseConfigPath: string = path.resolve(__dirname, '../../.template/api-extractor.base.json')
