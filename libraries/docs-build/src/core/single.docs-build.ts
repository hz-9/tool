/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-08 18:01:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 19:30:26
 */

/* eslint-disable no-param-reassign */
import * as fs from 'fs-extra'
import * as path from 'upath'
import chokidar from 'chokidar'
import execa from 'execa'
import exitHook from 'exit-hook'
import { glob } from 'glob'
import { parse as parseJsonC } from 'jsonc-parser'
import _ from 'lodash'
import console from 'node:console'

import { DocsParseScheme, TDocsParseScheme, baseConfigPath } from '../config/index'
import { VuepressAction } from '../enum'
import type {
  ICommandOptions,
  IConfigOptions,
  IDocsItem,
  IDocsParseSchemeItem,
  IDocsParseSchemeLang,
  INavbarOptions,
  IRenderOptions,
  ISidebarArrayOptions,
  ISidebarItem,
  ISidebarOptions,
} from '../interface/index'
import { commandIsExists, installByPnpm, installInGlobal, printCommand, printOptions, readPkg } from '../util/index'

/**
 *
 * @public
 *
 * A build class that utilizes the docs build result.
 *
 */
export class SingleDocsBuild {
  protected needDeleteDirList: string[]

  public constructor() {
    this.needDeleteDirList = []
    this._initExitHook()
  }

  private _initExitHook(): void {
    exitHook(() => {
      this.needDeleteDirList.forEach((d: string) => {
        fs.removeSync(d)
      })
    })
  }

  protected toAbsolute(options: ICommandOptions): ICommandOptions {
    const { root } = options
    const withRoot = (p: string): string => (path.isAbsolute(p) ? p : path.resolve(root, p))

    return {
      root,
      config: typeof options.config === 'string' ? withRoot(options.config) : undefined,
      markdownPath: withRoot(options.markdownPath),
      docsSpace: withRoot(options.docsSpace),
      action: options.action,
      baseUrl: options.baseUrl,
      lang: options.lang,
    }
  }

  public async build(optionsBase: ICommandOptions): Promise<void> {
    const options = this.toAbsolute(optionsBase)

    await printOptions(options)

    const tempDir = path.resolve(options.root, 'temp', '.hz9/docs-build', `${Date.now()}`)
    this.needDeleteDirList.push(tempDir)

    await printOptions(options)

    const configOptions = await this.parseAPIConfig(options, tempDir)

    await this.generateAPIDocs(options, configOptions)

    const docsList = await this.parseScheme(options)

    const sidebarOptions = await this.generateSidebarOptions(docsList)

    const navbarOptions = await this.generateNavbarOptions(docsList, sidebarOptions)

    const packageInfo = readPkg(options.root)

    await this.moveVuepressTemp(options.docsSpace, {
      options,
      navbarOptions,
      sidebarOptions,
      packageInfo,
    })

    await installByPnpm(options.docsSpace)

    await this.watchChange(docsList, options)

    await this.vuepressAction(options.docsSpace, options.action)
  }

  protected async parseAPIConfig(options: ICommandOptions, tempDir: string): Promise<IConfigOptions> {
    if (options.config && !fs.existsSync(options.config)) {
      options.config = undefined
    }

    const p = path.resolve(tempDir, path.basename(baseConfigPath))
    fs.mkdirpSync(path.dirname(p))
    if (!options.config) {
      fs.copyFileSync(baseConfigPath, p)
      options.config = p
    } else {
      fs.copyFileSync(options.config, p)
      options.config = p
    }

    const configInfo = parseJsonC(fs.readFileSync(options.config, { encoding: 'utf8' }))

    const projectPKG = readPkg(options.root)
    const unscopedPackageName = (projectPKG.name.match(/[^/]+$/g) ?? [projectPKG.name])[0]

    /**
     *
     * @microsoft/api-extractor 的 api-extractor.json 文件中，对于 apiReport.reportFolder 提供了三个 Token，
     *
     * 现在进行解析。
     *
     * <projectFolder> 替换为 process.cwd()
     *
     * <projectFolder>, <packageName>, <unscopedPackageName>
     *
     */
    const toAbsolute = (pa: string): string => {
      let p2: string = pa

      p2 = p2.replaceAll('<projectFolder>', options.root) // 替换 <projectFolder>

      p2 = p2.replaceAll('<packageName>', projectPKG.name) // 替换 <packageName>

      p2 = p2.replaceAll('<unscopedPackageName>', unscopedPackageName) // 替换 <unscopedPackageName>

      return path.isAbsolute(p2) ? p2 : path.resolve(options.root, p2)
    }

    const apiPath: string = configInfo?.apiReport?.reportFolder ?? '<projectFolder>/temp/'

    const entryPath: string = configInfo.mainEntryPointFilePath

    // eslint-disable-next-line prefer-destructuring
    const apiJsonFilePath: string = configInfo?.docModel?.apiJsonFilePath ?? '<projectFolder>/docs/api/index.api.json'

    return {
      entryPath: toAbsolute(entryPath),
      apiPath: toAbsolute(apiPath),
      apiJsonFilePath: toAbsolute(apiJsonFilePath),
      configPath: options.config,
    }
  }

  protected async generateAPIDocs(options: ICommandOptions, configOptions: IConfigOptions): Promise<void> {
    const exists = fs.existsSync(path.resolve(options.root, 'tsconfig.json'))
    const entryExists = fs.existsSync(configOptions.entryPath)
    const jsonExists = fs.existsSync(configOptions.apiJsonFilePath)

    if (exists && entryExists) {
      await this.runApiExtractor(options, configOptions)
      await this.runApiDocumenter(options, configOptions)
    } else if (exists && jsonExists) {
      await this.runApiDocumenter(options, configOptions)
    }
  }

  protected async runApiExtractor(options: ICommandOptions, configOptions: IConfigOptions): Promise<void> {
    const exists = await commandIsExists('api-extractor', ['--help'])
    if (!exists) {
      await installInGlobal('@microsoft/api-extractor')
    }

    let command: string = 'api-extractor'

    if (configOptions.rigPackage) {
      const p = path.resolve(configOptions.rigPackage, 'node_modules/@microsoft/api-extractor/bin/api-extractor')

      if (fs.existsSync(p)) command = p
    }

    try {
      const commands: string[] = ['run', '-c', path.resolve(options.root, configOptions.configPath)]
      await printCommand(`${command} ${commands.join(' ')}`)

      await execa(command, commands, {
        cwd: options.root,
        stderr: process.stderr,
        stdout: process.stdout,
      })
    } catch (error) {
      // ...
    }
  }

  protected async runApiDocumenter(options: ICommandOptions, configOptions: IConfigOptions): Promise<void> {
    const exists = await commandIsExists('api-documenter', ['--help'])
    if (!exists) {
      await installInGlobal('@microsoft/api-documenter')
    }

    const commands: string[] = [
      'markdown',
      '--input-folder',
      path.resolve(options.root, configOptions.apiPath),
      '--output-folder',
      path.resolve(options.root, options.markdownPath),
    ]

    await printCommand(`api-documenter ${commands.join(' ')}`)

    await execa('api-documenter', commands, {
      cwd: options.root,
      stderr: process.stderr,
      stdout: process.stdout,
    })
  }

  protected async parseScheme(options: ICommandOptions): Promise<IDocsItem[]> {
    const schemeKeys = Object.getOwnPropertyNames(DocsParseScheme) as Array<keyof TDocsParseScheme>
    const docsList: IDocsItem[] = []
    const parsePath = (p: string): string => (path.isAbsolute(p) ? p : path.resolve(options.root, p))

    const tryPath = (schema: IDocsParseSchemeItem): string | undefined => {
      const isAPI: boolean = schema.navPath.replace(/^\/|\/$/g, '') === 'api'

      const parsePathList = [...schema.parsePath]
      if (isAPI) {
        parsePathList.push(options.markdownPath)
      }

      const f = parsePathList.find((i) => {
        const p = parsePath(i)
        if (fs.existsSync(p)) {
          if (fs.statSync(p).isDirectory() && schema.isDir) return true
          if (fs.statSync(p).isFile() && !schema.isDir) return true
        }

        return false
      })

      return f ? parsePath(f) : undefined
    }

    while (schemeKeys.length) {
      const key = schemeKeys.shift()!
      const schema = DocsParseScheme[key]

      const p = tryPath(schema)
      if (p) {
        const isHome = schema.navPath === '/'
        const navPath = schema.navPath.replace(/^\/|\/$/g, '')

        let newFilePath = `${options.docsSpace}/src/${navPath}/README.md`
        if (isHome) newFilePath = `${options.docsSpace}/src/README.md`
        if (schema.isDir) newFilePath = `${options.docsSpace}/src/${navPath}`

        docsList.push({
          baseFilepath: p,
          newFilePath,
          watchFilePath: schema.isDir ? `${p}/*` : p,
          transform: schema.transform,
          sidebarCallback: (sidebarOptions: ISidebarOptions) => {
            if (schema.isDir) {
              // 移动！！！
              // @ts-ignore
              sidebarOptions[schema.navPath] = navPath === 'api' ? this.getSidebar(p) : 'structure'
            } else {
              // nothings.
              // sidebarOptions[isHome ? '/' : schema.navPath] = schema.navPath === '/' ? [''] : ["README.md"]
            }
            return sidebarOptions
          },
          navbarCallback: (navbarOptions: INavbarOptions, sidebarOptions: ISidebarOptions) => {
            navbarOptions.push({
              link: isHome ? '/' : schema.navPath,
              text: this.getNavName(schema.navName, options.lang),
            })
            return navbarOptions
          },
        })
      }
    }

    return docsList
  }

  protected async generateSidebarOptions(
    docsList: IDocsItem[],
    sidebarOptions: ISidebarOptions = {}
  ): Promise<ISidebarOptions> {
    const list: IDocsItem[] = [...docsList]

    while (list.length) {
      const item = list.shift()!
      sidebarOptions = item.sidebarCallback(sidebarOptions)
    }

    return sidebarOptions
  }

  protected async generateNavbarOptions(
    docsList: IDocsItem[],
    sidebarOptions: ISidebarOptions,
    navbarOptions: INavbarOptions = []
  ): Promise<INavbarOptions> {
    const list: IDocsItem[] = [...docsList]

    while (list.length) {
      const item = list.shift()!
      navbarOptions = item.navbarCallback(navbarOptions, sidebarOptions)
    }

    return navbarOptions
  }

  protected async watchChange(docsList: IDocsItem[], options: ICommandOptions): Promise<void> {
    const list: IDocsItem[] = [...docsList]

    while (list.length) {
      const item = list.shift()!

      const p1 = path.relative(options.root, item.baseFilepath)
      const p2 = path.relative(options.root, item.newFilePath)

      fs.removeSync(item.newFilePath)
      try {
        this.transformFileOrDir(item.baseFilepath, item.newFilePath, item.transform)
        console.log(`Moved  : ${p1} -> ${p2}`)
      } catch (error) {
        console.error(error)
      }

      if (options.action === VuepressAction.Serve) {
        const watcher = chokidar.watch(item.watchFilePath, {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true,
        })

        console.log(`Watch  : ${p1} -> ${p2}`)
        watcher.on('change', async () => {
          console.log(`Change : ${p1} -> ${p2}`)
          this.transformFileOrDir(item.baseFilepath, item.newFilePath, item.transform)
        })
      }
    }
  }

  protected async moveVuepressTemp(vuepressDirPath: string, renderOptions: IRenderOptions): Promise<void> {
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
  }

  protected async vuepressAction(docsSpace: string, action?: VuepressAction): Promise<void> {
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

  protected transformFileOrDir(from: string, to: string, transform?: (c: string) => string): void {
    if (fs.existsSync(from)) {
      const stat = fs.statSync(from)

      if (stat.isFile()) {
        const content = fs.readFileSync(from, { encoding: 'utf8' })
        fs.mkdirpSync(path.dirname(to))
        fs.writeFileSync(to, transform ? transform(content) : content, { encoding: 'utf8' })
      }

      if (stat.isDirectory()) {
        fs.emptyDirSync(to)
        const filenames = fs.readdirSync(from)
        filenames.forEach((filename) => {
          this.transformFileOrDir(path.resolve(from, filename), path.resolve(to, filename), transform)
        })
      }
    }
  }

  protected getSidebar(apiDir: string): ISidebarArrayOptions {
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

  protected getNavName(navName: IDocsParseSchemeLang, lang: string): string {
    return navName[lang as keyof IDocsParseSchemeLang] ?? navName['en-US']
  }
}
