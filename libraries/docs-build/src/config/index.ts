/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-10 12:18:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 18:59:51
 */
import * as path from 'upath'

import type { IDocsParseSchemeItem } from '../interface/index'

export const defaultApiMarkdownPath: string = './docs/.markdowns'

const DocsParseSchemeBase = {
  '/': {
    parsePath: ['./docs/README.md', './README.md'],
    navName: '首页',
    navPath: '/',
  } as IDocsParseSchemeItem,

  changelog: {
    parsePath: ['./docs/CHANGELOG.md', './CHANGELOG.md'],
    navName: '更新日志',
    navPath: '/changelog',
    transform: (content: string): string => content.replace('# Change Log - ', '# '),
  } as IDocsParseSchemeItem,

  todo: {
    parsePath: ['./docs/TODOLIST.md', './TODOLIST.md'],
    navName: '待办清单',
    navPath: '/todo',
  } as IDocsParseSchemeItem,

  guide: {
    parsePath: ['./docs/guide'],
    navName: '指南',
    navPath: '/guide',
    isDir: true,
  } as IDocsParseSchemeItem,

  advance: {
    parsePath: ['./docs/advance'],
    navName: '进阶',
    navPath: '/advance',
    isDir: true,
  } as IDocsParseSchemeItem,

  api: {
    parsePath: ['./docs/.markdowns'],
    navName: 'API',
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
    navName: '关于',
    navPath: '/about',
  } as IDocsParseSchemeItem,

  // link: {
  //   parsePath: ['./docs/LINKS.md', './docs/LINK.md'],
  //   navName: '链接',
  //   navPath: '/links',
  // } as IDocsParseSchemeItem,
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
