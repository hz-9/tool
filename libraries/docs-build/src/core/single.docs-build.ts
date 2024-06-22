/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-08 18:01:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-23 01:31:22
 */

/* eslint-disable no-param-reassign, no-lonely-if */
import * as fs from 'fs-extra'
import * as path from 'upath'
import chokidar from 'chokidar'
import execa from 'execa'
import exitHook from 'exit-hook'
import { glob } from 'glob'
import { parse as parseJsonC } from 'jsonc-parser'
import _ from 'lodash'
import console from 'node:console'

import { DocsParseScheme, baseConfigPath, fileSuffixs } from '../config/index'
import { VuepressAction } from '../enum'
import type {
  IApiDocVersionFile,
  ICommandOptions,
  IConfigOptions,
  IDocsItem,
  IDocsParseSchemeItem,
  ILangObj,
  ILocales,
  INavbarGroupOptions,
  INavbarLinkOptions,
  INavbarOptions,
  INavbarOptionsGroup,
  IRenderOptions,
  ISidebarArrayOptions,
  ISidebarItem,
  ISidebarObjectOptions,
  ISidebarOptions,
  ISidebarOptionsGroup,
  Lang,
  LangPlus,
} from '../interface/index'
import {
  calculateFileHash,
  commandIsExists,
  installByPnpm,
  installInGlobal,
  printCommand,
  printOptions,
  readPkg,
} from '../util/index'

/**
 *
 * @public
 *
 * A build class that utilizes the docs build result.
 *
 */
export class SingleDocsBuild {
  protected needDeleteDirList: string[]

  protected navbarOptionsGroup: INavbarOptionsGroup

  protected sidebarOptionsGroup: ISidebarOptionsGroup

  protected docsItemList: IDocsItem[]

  public constructor() {
    this.needDeleteDirList = []
    this._initExitHook()

    this.navbarOptionsGroup = {
      '/': [],
    }

    this.sidebarOptionsGroup = {
      '/': {},
    }

    this.docsItemList = []
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

  public static async build(optionsBase: ICommandOptions): Promise<SingleDocsBuild> {
    const build = new SingleDocsBuild()
    await build.build(optionsBase)
    return build
  }

  public async build(optionsBase: ICommandOptions): Promise<void> {
    const options = this.toAbsolute(optionsBase)

    await printOptions(options)

    const tempDir = path.resolve(options.root, 'temp', '.hz9/docs-build', `${Date.now()}`)
    this.needDeleteDirList.push(tempDir)

    await printOptions(options)

    const configOptions = await this.parseAPIExtractorJson(options, tempDir)

    await this.generateAPIDocs(options, configOptions)

    await this.scan(options)

    const packageInfo = readPkg(options.root)

    await this.moveVuepressTemp(options.docsSpace, {
      options,
      packageInfo,
      locales: this.getLocales(options),
    })

    await installByPnpm(options.docsSpace)

    await this.moveAndWatch(options)

    await this.vuepressAction(options.docsSpace, options.action)
  }

  protected getLocales(options: ICommandOptions): ILocales {
    const locales: ILocales = {
      '/': {
        lang: options.lang[0],
      },
    }
    options.lang.forEach((l, index) => {
      if (index > 0) {
        locales[`/${l}/`] = { lang: l }
      }
    })

    return locales
  }

  protected async parseAPIExtractorJson(options: ICommandOptions, tempDir: string): Promise<IConfigOptions> {
    // eslint-disable-next-line no-undef-init
    let rigPackage: string | undefined = undefined

    /**
     * 尝试解析
     */
    if (options.config) {
      const config = path.isAbsolute(options.config) ? options.config : path.resolve(options.root, options.config)

      if (!fs.existsSync(config)) {
        options.config = undefined
      }
    }

    if (!options.config) {
      const rigJsonPath = path.resolve(options.root, 'config/rig.json')
      if (fs.existsSync(rigJsonPath)) {
        const rigTxt = fs.readFileSync(rigJsonPath, { encoding: 'utf8' })
        const rigInfo = parseJsonC(rigTxt)

        // eslint-disable-next-line prefer-destructuring
        const rigPackageName: string = rigInfo.rigPackageName
        const rigProfile: string = rigInfo.rigProfile ?? 'default'

        const config = path.resolve(
          options.root,
          'node_modules',
          rigPackageName,
          'profiles',
          rigProfile,
          'config',
          'api-extractor.json'
        )
        if (fs.existsSync(config)) {
          options.config = config
          rigPackage = path.resolve(options.root, 'node_modules', rigPackageName)
        }
      }
    }

    if (!options.config) {
      const p = path.resolve(tempDir, path.basename(baseConfigPath))
      fs.mkdirpSync(path.dirname(p))
      fs.copyFileSync(baseConfigPath, p)
      options.config = p
    }

    const configInfo = parseJsonC(fs.readFileSync(options.config, { encoding: 'utf8' }))

    const projectPKG = readPkg(options.root)
    const unscopedPackageName = (projectPKG.name.match(/[^/]+$/g) ?? [projectPKG.name])[0]

    /**
     *
     * In the api-extractor.json file of @microsoft/api-extractor,
     * three tokens are provided for apiReport.reportFolder.
     *
     * Now, let's parse them.
     *
     * Replace <projectFolder> with process.cwd().
     *
     * Replace <projectFolder> with `projectPKG.name`.
     *
     * Replace <projectFolder> with `unscopedPackageName`.
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
      apiDocVersionFilepath: path.resolve(tempDir, '../', 'api-documenter.version.json'),

      rigPackage,
    }
  }

  protected async generateAPIDocs(options: ICommandOptions, configOptions: IConfigOptions): Promise<void> {
    const exists = fs.existsSync(path.resolve(options.root, 'tsconfig.json'))
    const entryExists = fs.existsSync(configOptions.entryPath)
    const jsonExists = fs.existsSync(configOptions.apiJsonFilePath)

    const watch = (): void => {
      if (options.action === VuepressAction.Serve) {
        const watcher = chokidar.watch(configOptions.apiJsonFilePath, {
          ignored: /(^|[/\\])\../, // ignore dotfiles
          persistent: true,
        })

        console.log(`Watch  : ${path.relative(options.root, configOptions.apiJsonFilePath)}`)

        watcher.on('change', async () => {
          await this.runApiDocumenter(options, configOptions)
        })
      }
    }

    if (exists && jsonExists) {
      await this.runApiDocumenter(options, configOptions)
      watch()
    } else if (exists && entryExists) {
      await this.runApiExtractor(options, configOptions)
      await this.runApiDocumenter(options, configOptions)
      watch()
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

    const inputFolder: string = path.resolve(options.root, configOptions.apiPath)

    const inputFolderHash: string = await (async () => {
      let hash: string = ''
      const filenames = fs.readdirSync(inputFolder)
      while (filenames.length) {
        const f = filenames.shift()!
        if (f !== '.DT_Store') {
          const p = path.resolve(inputFolder, f)
          hash += await calculateFileHash(p)
        }
      }
      return hash
    })()

    const run = async (): Promise<void> => {
      // 进行安装
      const output: string = path.resolve(options.root, options.markdownPath)
      fs.mkdirpSync(output)

      const tempOutput: string = path.resolve(output, './.temp')

      const commands: string[] = ['markdown', '--input-folder', inputFolder, '--output-folder', tempOutput]

      await printCommand(`api-documenter ${commands.join(' ')}`)

      await execa('api-documenter', commands, {
        cwd: options.root,
        stderr: process.stderr,
        stdout: process.stdout,
      })

      fs.readdirSync(tempOutput).forEach((f) => {
        const p1 = path.resolve(tempOutput, f)
        const p2 = path.resolve(output, f)
        const p2E = fs.existsSync(p2)

        if (p2E) {
          if (fs.readFileSync(p1, { encoding: 'utf8' }) !== fs.readFileSync(p2, { encoding: 'utf8' })) {
            fs.copySync(p1, p2)
          } else {
            // 文件不变，不进行更新
          }
        } else {
          fs.copySync(p1, p2)
        }
      })

      fs.readdirSync(output).forEach((f) => {
        if (f !== '.temp') {
          // 删除历史文件
          const p = path.resolve(tempOutput, f)
          if (!fs.existsSync(p)) fs.removeSync(path.resolve(output, f))
        }
      })

      fs.removeSync(tempOutput)

      const p: IApiDocVersionFile = {
        hash: inputFolderHash,
      }

      fs.mkdirpSync(path.dirname(configOptions.apiDocVersionFilepath))
      fs.writeFileSync(configOptions.apiDocVersionFilepath, JSON.stringify(p, undefined, 2), { encoding: 'utf8' })

      this.generateSidebarJson(output)
    }

    try {
      const p: IApiDocVersionFile = JSON.parse(
        fs.readFileSync(configOptions.apiDocVersionFilepath, { encoding: 'utf8' })
      )
      if (!p.hash) throw new Error()

      if (inputFolderHash === p.hash) {
        console.log(`'api-documenter' no changes.`)
      } else {
        await run()
      }
    } catch (error) {
      await run()
    }
  }

  protected async scan(
    options: ICommandOptions,
    docsParseScheme: Partial<typeof DocsParseScheme> = DocsParseScheme,
    inRush: boolean = false
  ): Promise<IDocsItem[]> {
    const schemeKeys = Object.getOwnPropertyNames(docsParseScheme) as Array<keyof typeof docsParseScheme>
    const docsList: IDocsItem[] = []
    const parsePath = (p: string): string => (path.isAbsolute(p) ? p : path.resolve(options.root, p))

    const tryPath = (schema: IDocsParseSchemeItem): string | undefined => {
      const isAPI = schema.navName === DocsParseScheme.api.navName
      const parsePathList = isAPI ? [options.markdownPath] : [...schema.parsePath]
      const f = parsePathList.find((i) => {
        const p = parsePath(i)
        return fs.existsSync(p)
      })
      return f ? parsePath(f) : undefined
    }

    let unscopedPackageName = 'unknown'

    try {
      const packageInfo = readPkg(options.root)
      const m = packageInfo.name.match(/[^/]+$/g)
      if (m) unscopedPackageName = m[0]
    } catch (error) {
      // ...
    }

    const findPReplace = (p: string, lang: string): string => {
      const p2 = p.replace(/.md$/, `.${lang}.md`)
      return fs.existsSync(p2) ? p2 : p
    }

    while (schemeKeys.length) {
      const key = schemeKeys.shift()!
      const schema = docsParseScheme[key]!
      const p = tryPath(schema)

      if (p) {
        const isHome = schema.navPath === '/'
        const navPath = schema.navPath.replace(/^\/|\/$/g, '')

        let i = 0
        while (i < options.lang.length) {
          const lang = options.lang[i]
          const isFile = fs.statSync(p).isFile()
          const isDir = fs.statSync(p).isDirectory()
          const langKey: '/' | LangPlus = i === 0 ? '/' : `/${lang}/`

          if (isFile) {
            // 获取的是一个文件。
            const baseFilepath = i === 0 ? p : findPReplace(p, lang)
            const focusFilepath = inRush
              ? `${options.docsSpace}/src${langKey}${navPath}/${unscopedPackageName}/README.md`
              : `${options.docsSpace}/src${langKey}${navPath}/README.md`

            // Addto move and watch
            this.docsItemList.push({
              baseFilepath,
              focusFilepath,
              transform: schema.transform,
              isDir: false,
            })
          } else if (isDir) {
            const baseFilepath = p
            const focusFilepath = inRush
              ? `${options.docsSpace}/src${langKey}${navPath}/${unscopedPackageName}`
              : `${options.docsSpace}/src${langKey}${navPath}`

            const globResult = await glob('**/*.md', { dot: true, nodir: true, cwd: baseFilepath })

            // eslint-disable-next-line @typescript-eslint/no-loop-func
            globResult.forEach((f: string) => {
              if (fileSuffixs.every((suffix) => !suffix.test(f))) {
                // 如果所有都不匹配，则为普通文件，准备拷贝
                const baseFilepathR: string =
                  i === 0 ? path.resolve(baseFilepath, f) : findPReplace(path.resolve(baseFilepath, f), lang)

                // ...
                this.docsItemList.push({
                  baseFilepath: baseFilepathR,
                  focusFilepath: path.resolve(focusFilepath, f),
                  transform: schema.transform,
                  isDir: false,
                })
              }
            })

            const sidebarKey: string = inRush ? `${langKey}${navPath}/${unscopedPackageName}` : `${langKey}${navPath}`

            if (!this.sidebarOptionsGroup[langKey]) {
              this.sidebarOptionsGroup[langKey] = {
                [sidebarKey]: this.praseSidebarJson(p) ?? 'structure',
              } as ISidebarObjectOptions
            } else {
              const o: ISidebarObjectOptions = this.sidebarOptionsGroup[langKey] as ISidebarObjectOptions
              o[sidebarKey] = this.praseSidebarJson(p) ?? 'structure'
            }
          }

          if (inRush) {
            // Addto navbarOptions
            const link: string = isHome ? langKey : `${langKey}${navPath}/`
            if (!this.navbarOptionsGroup[langKey]) {
              this.navbarOptionsGroup[langKey] = [
                {
                  prefix: link,
                  text: this.getNavName(schema.navName, lang),
                  children: [unscopedPackageName],
                },
              ] as INavbarGroupOptions[]
            } else {
              const groups = this.navbarOptionsGroup[langKey] as INavbarGroupOptions[]
              const f = groups.find((x) => x.prefix === link)
              if (!f) {
                groups.push({
                  prefix: link,
                  text: this.getNavName(schema.navName, lang),
                  children: [unscopedPackageName],
                } as INavbarGroupOptions)
              } else {
                f.children.push(unscopedPackageName)
              }
            }
          } else {
            // Addto navbarOptions
            // eslint-disable-next-line no-nested-ternary
            const link: string = isHome ? langKey : `${langKey}${navPath}`
            if (this.navbarOptionsGroup[langKey]) {
              const nO: INavbarLinkOptions[] = this.navbarOptionsGroup[langKey] as INavbarLinkOptions[]
              const f = nO.find((x) => x.link === link)
              if (!f) {
                nO.push({
                  link,
                  text: this.getNavName(schema.navName, lang),
                })
              }
            } else {
              this.navbarOptionsGroup[langKey] = [
                {
                  link,
                  text: this.getNavName(schema.navName, lang),
                },
              ] as INavbarOptions
            }
          }

          i += 1
        }
      }
    }

    return docsList
  }

  protected async moveAndWatch(options: ICommandOptions): Promise<void> {
    const list: IDocsItem[] = [...this.docsItemList]

    while (list.length) {
      const item = list.shift()!

      const p1 = path.relative(options.root, item.baseFilepath)
      const p2 = path.relative(options.root, item.focusFilepath)

      fs.removeSync(item.focusFilepath)
      try {
        this.transformFileOrDir(item.baseFilepath, item.focusFilepath, item.transform)
        console.log(`Moved  : ${p1} -> ${p2}`)
      } catch (error) {
        console.error(error)
      }

      if (options.action === VuepressAction.Serve) {
        console.log(`Watch  : ${item.baseFilepath}`)

        const watcher = chokidar.watch(item.baseFilepath, {
          ignored: /\.temp/, // ignore dotfiles
          persistent: true,
        })

        watcher.on('change', async (x) => {
          console.log(`Change : ${p1} -> ${p2}`)
          this.transformFileOrDir(item.baseFilepath, item.focusFilepath, item.transform)
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
        const textRender = _.template(text, { interpolate: /{{([\s\S]+?)}}/g })({
          ...renderOptions,
          navbarOptionsGroup: this.navbarOptionsGroup,
          sidebarOptionsGroup: this.sidebarOptionsGroup,
        })

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
    }
  }

  protected generateSidebarJson(apiDir: string): void {
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

    const p = path.resolve(apiDir, '.sidebar.json')
    fs.writeFileSync(p, JSON.stringify(sidebarOptions, undefined, 2), { encoding: 'utf8' })
  }

  protected getNavName(navName: ILangObj, lang: Lang): string {
    return navName[lang]
  }

  // protected sortNavbarOptions(navbarOptions: INavbarOptions): INavbarOptions {
  //   const navIndex: Record<string, number> = {
  //     '/': -2,
  //     // read: -1,
  //   }

  //   Object.keys(DocsParseScheme).forEach((k: string, index) => {
  //     if (k !== '/') {
  //       const scheme = DocsParseScheme[k as keyof typeof DocsParseScheme]
  //       navIndex[scheme.navPath.replace(/^\/|\/$/g, '')] = index
  //     }
  //   })

  //   navbarOptions.sort((a, b) => {
  //     const aK: string = (a.link ?? (a as INavbarGroupOptions).prefix) as string
  //     const bK: string = (b.link ?? (b as INavbarGroupOptions).prefix) as string
  //     const aIndex = navIndex[aK === '/' ? aK : aK.replace(/^\/|\/$/g, '')] ?? 999
  //     const bIndex = navIndex[bK === '/' ? bK : bK.replace(/^\/|\/$/g, '')] ?? 999

  //     return aIndex - bIndex
  //   })

  //   return navbarOptions
  // }

  protected praseSidebarJson(dirPath: string): ISidebarArrayOptions | undefined {
    try {
      const p = path.resolve(dirPath, '.sidebar.json')

      if (p) {
        return parseJsonC(fs.readFileSync(p, { encoding: 'utf8' })) as ISidebarArrayOptions
      }
    } catch (error) {
      // ...
    }
    return undefined
  }
}
