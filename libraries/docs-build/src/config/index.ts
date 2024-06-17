/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-10 12:18:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:57:14
 */
import * as path from 'upath'

import type { IDocsParseSchemeItem, IDocsParseSchemeLang } from '../interface/index'

export const defaultApiMarkdownPath: string = './docs/.markdowns'

export const MultiDefaultNavName: IDocsParseSchemeLang = { 'en-US': 'Readme', 'zh-CN': '主页' }

const DocsParseSchemeBase = {
  '/': {
    parsePath: ['./docs/README.md', './README.md'],
    navName: { 'en-US': 'Home', 'zh-CN': '首页' },
    navPath: '/',
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

  guide: {
    parsePath: ['./docs/guide'],
    navName: { 'en-US': 'Guide', 'zh-CN': '指南' },
    navPath: '/guide',
    isDir: true,
  } as IDocsParseSchemeItem,

  advance: {
    parsePath: ['./docs/advance'],
    navName: { 'en-US': 'Advance', 'zh-CN': '进阶' },
    navPath: '/advance',
    isDir: true,
  } as IDocsParseSchemeItem,

  api: {
    parsePath: ['./docs/.markdowns'],
    navName: { 'en-US': 'API', 'zh-CN': '配置项' },
    navPath: '/api',
    isDir: true,
    transform: (content: string): string => {
      if (content.includes('## API Reference')) {
        // 首页
        const matched = content.match(/\[[^[]+\]/g)
        if (matched && matched.length === 2) {
          return content
            .replace(matched[0], matched[1])
            .replace('## API Reference', `# ${matched[1].replace(/\[|\]/g, '')}`)
        }
      }

      return content.replace('## ', '# ')
    },
  } as IDocsParseSchemeItem,

  about: {
    parsePath: ['./docs/ABOUT.md'],
    navName: { 'en-US': 'About', 'zh-CN': '关于' },
    navPath: '/about',
  } as IDocsParseSchemeItem,
} as const

export type TDocsParseScheme = typeof DocsParseSchemeBase

type ToPath<T extends IDocsParseSchemeItem> = {
  [K in keyof T]: T[K] extends string[] ? string : T[K]
}

/**
 * 解析过后的接口
 */
export type TDocsParsedScheme = {
  -readonly [K in keyof TDocsParseScheme]?: ToPath<TDocsParseScheme[K]>
}

/**
 * 文档解析方案
 */
export const DocsParseScheme: TDocsParseScheme = DocsParseSchemeBase

export const baseConfigPath: string = path.resolve(__dirname, '../../.template/api-extractor.base.json')
