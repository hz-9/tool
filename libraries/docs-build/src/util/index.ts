/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 21:30:13
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import { glob } from 'glob'
import _ from 'lodash'
import console from 'node:console'
import type { NormalizedPackageJson } from 'read-pkg'

import { VuepressAction } from '../enum'
import type {
  ICommandOptions,
  IRenderOptions,
  ISidebarArrayOptions,
  ISidebarItem,
  ISidebarOptions,
} from '../interface/index'

export const readPkg = (cwd: string = path.resolve(__dirname, '../..')): NormalizedPackageJson => {
  const p = path.resolve(cwd, 'package.json')
  const info = fs.readFileSync(p, { encoding: 'utf8' })
  return JSON.parse(info)
}

/**
 * 打印所有配置信息。
 */
export const printOptions = async (options: ICommandOptions): Promise<void> => {
  const pkg = readPkg(path.resolve(__dirname, '../../'))

  const inRush = fs.existsSync(path.resolve(options.root, 'rush.json'))

  console.log()
  console.log(`${pkg.name} - ${pkg.version}`)
  console.log()
  console.log(`Options:`)
  console.log(`  root        : ${options.root}`)

  console.log(`  action      : ${options.action}`)
  console.log(`  in rush     : ${inRush}`)
  console.log()
}

/**
 * @public
 *
 *  打印了命令行信息。
 *
 */
export const printCommand = async (command: string): Promise<void> => {
  const pkg = readPkg()

  console.log(`${pkg.name} command:`)
  console.log(`    ${command}`)
  console.log()
}

/**
 * 移动文件路径。
 */
export const moveVuepressTemp = async (vuepressDirPath: string, renderOptions: IRenderOptions): Promise<void> => {
  const vuepressTemplate = path.resolve(__dirname, '../../.template/vuepress')

  const globResult = await glob('**/*', { dot: true, nodir: true, cwd: vuepressTemplate })

  let i = 0
  while (i < globResult.length) {
    const filepath = globResult[i]

    const p1 = path.resolve(vuepressTemplate, filepath)
    const p2 = path.resolve(vuepressDirPath, filepath)

    if (/js$|ts$|json$|yaml$|md$/.test(filepath)) {
      const text = await fs.readFile(p1, { encoding: 'utf8' })
      const textRender = _.template(text, { interpolate: /{{([\s\S]+?)}}/g })(renderOptions)

      await fs.mkdirp(path.dirname(p2))
      await fs.writeFile(p2, textRender, { encoding: 'utf8' })
    } else {
      await fs.copy(p1, p2)
    }
    i += 1
  }

  // await fs.remove(path.resolve(vuepressDirPath, './init'))
}

export const commandIsExists = async (c: string, commands: string[]): Promise<boolean> => {
  try {
    await execa(c, commands, {
      // stderr: process.stderr,
      // stdout: process.stdout,
    })
    return true
  } catch (error) {
    return false
  }
}

export const installInGlobal = async (packageName: string): Promise<void> => {
  await execa('npm', ['i', '-g', packageName], {
    stderr: process.stderr,
    stdout: process.stdout,
  })
}

/**
 * 使用 pnpm 进行安装。
 */
export const installByPnpm = async (cwd: string): Promise<void> => {
  const exists = await commandIsExists('pnpm', ['--version'])
  if (!exists) {
    await installInGlobal('pnpm')
  }

  await execa('pnpm', ['install'], {
    cwd,
    stderr: process.stderr,
    stdout: process.stdout,
  })
}

export const vuepressAction = async (docsSpace: string, action?: VuepressAction): Promise<void> => {
  switch (action) {
    case VuepressAction.Serve:
      await execa('npm', ['run', 'docs:dev'], {
        cwd: docsSpace,
        stderr: process.stderr,
        stdout: process.stdout,
      })
      break
    case VuepressAction.Build:
      await execa('npm', ['run', 'docs:build'], {
        cwd: docsSpace,
        stderr: process.stderr,
        stdout: process.stdout,
      })

      console.log(`Build: ${path.resolve(docsSpace, 'src/.vuepress/dist')}`)
      break
    default:
      // ...
      break
  }
}

export const transformFileOrDir = (from: string, to: string, transform?: (c: string) => string): void => {
  if (fs.existsSync(from)) {
    const stat = fs.statSync(from)

    if (stat.isFile()) {
      const content = fs.readFileSync(from, { encoding: 'utf8' })
      fs.mkdirpSync(path.dirname(to))
      fs.writeFileSync(to, transform ? transform(content) : content, { encoding: 'utf8' })
    }

    if (stat.isDirectory()) {
      const filenames = fs.readdirSync(from)
      filenames.forEach((filename) => {
        transformFileOrDir(path.resolve(from, filename), path.resolve(to, filename), transform)
      })
    }
  }
}

export const getSidebar = (apiDir: string): ISidebarArrayOptions => {
  const sidebarOptions: ISidebarArrayOptions = []

  const keys: Record<
    string,
    Array<{
      name: string
      filename: string
    }>
  > = {}

  fs.readdirSync(apiDir).forEach((filename) => {
    const filepath = path.resolve(apiDir, filename)
    const fileText = fs.readFileSync(filepath, { encoding: 'utf8' })
    const lines = fileText.split('\r\n')
    const findTitleLevel2 = lines.find((i) => /^## /.test(i))
    if (findTitleLevel2) {
      const keyMatch = findTitleLevel2.match(/[^ ]+$/)
      if (keyMatch?.length === 1) {
        let key = keyMatch[0]

        if (key === 'Reference') key = 'API Reference'
        if (key.includes('(constructor)')) key = 'Constructor'

        if (!keys[key]) keys[key] = []

        let name = findTitleLevel2
          .replace(/[^ ]+$/, '')
          .replace(/^## /, '')
          .trim()

        if (key === 'Constructor') {
          name = findTitleLevel2.replace('.(constructor)', '').replace(/^## /, '').trim()
        }

        keys[key].push({
          name,
          filename,
        })
      } else {
        console.log('Unknow key.', filename)
      }
    }
  })

  const apiArr: ISidebarItem[][] = []

  const OBJECT_INDEX = {
    Package: 1,
    Class: 2,
    Constructor: 3,
    Method: 3,
    Interface: 5,
    Property: 6,

    Unknown: 99,
  }

  Object.keys(keys).forEach((key) => {
    const children: ISidebarOptions = []
    if (key === 'API Reference') {
      apiArr[0] = [
        {
          text: _.upperFirst(key),
          link: 'index.md',
        },
      ]
    } else {
      const index: number = OBJECT_INDEX[_.upperFirst(key) as keyof typeof OBJECT_INDEX] ?? OBJECT_INDEX.Unknown

      if (!apiArr[index]) apiArr[index] = []

      apiArr[index].push({
        text: _.upperFirst(key),
        icon: key[0].toLowerCase(),
        collapsible: true,
        children,
      })

      keys[key].forEach(({ name, filename }) => {
        children.push({
          text: name,
          link: filename,
        })
      })
    }
  })

  apiArr.forEach((i) => {
    if (i) {
      sidebarOptions.push(...i)
    }
  })

  return sidebarOptions
}
