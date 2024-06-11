/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-08 18:01:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 19:37:04
 */

/* eslint-disable no-param-reassign */
import * as fs from 'fs-extra'
import * as path from 'upath'
import exitHook from 'exit-hook'
import { parse as parseJsonC } from 'jsonc-parser'

import { DocsParseScheme, TDocsParseScheme } from '../config/index'
import type {
  ICommandOptions,
  IConfigOptions,
  IDocsItem,
  IDocsParseSchemeItem,
  INavbarGroupOptions,
  INavbarOptions,
  IPackageInfo,
  IRushProject,
  ISidebarObjectOptions,
  ISidebarOptions,
} from '../interface/index'
import { getSidebar, installByPnpm, moveVuepressTemp, printOptions, readPkg, vuepressAction } from '../util/index'
import { SingleDocsBuild } from './single.docs-build'

/**
 * 等待删除的文件列表。
 */
const needDeleteDirList: string[] = []

/**
 * 推出后，对中间成果进行删除。
 */
exitHook(() => {
  needDeleteDirList.forEach((d: string) => {
    fs.removeSync(d)
  })
})

/**
 * @public
 *
 *  文档构建工具。
 *
 */
export class MultiDocsBuild extends SingleDocsBuild {
  public async build(options: ICommandOptions): Promise<void> {
    // const options = this.toAbsolute(optionsBase)
    await printOptions(options)

    const projects = this._readRushProjects(options)

    let sidebarOptions: ISidebarOptions = {}
    let navbarOptions: INavbarOptions = []

    const allDocsList: IDocsItem[] = []

    const baseReadme = await this._addBaseReadme(options)

    if (baseReadme) allDocsList.push(baseReadme)

    let i = 0
    while (i < projects.length) {
      const project = projects[i]

      const projectOptions = {
        ...options,
        root: path.resolve(options.root, project.projectFolder),
      }

      const tempDir = path.resolve(projectOptions.root, 'temp', '.hz9/docs-build', `${Date.now()}`)
      needDeleteDirList.push(tempDir)

      const configOptions = await this.parseAPIConfig(projectOptions, tempDir)

      await this.generateAPIDocs(projectOptions, configOptions)

      const docsList = await this.parseScheme(projectOptions)

      allDocsList.push(...docsList)

      i += 1
    }

    sidebarOptions = await this.generateSidebarOptions(allDocsList, sidebarOptions)

    navbarOptions = await this.generateNavbarOptions(allDocsList, sidebarOptions, navbarOptions)

    const packageInfo = await this._parseBaseReadme(baseReadme)

    await moveVuepressTemp(options.docsSpace, {
      navbarOptions,
      sidebarOptions,
      packageInfo,
    })

    await installByPnpm(options.docsSpace)

    await this.watchChange(allDocsList, options)

    await vuepressAction(options.docsSpace, options.action)
  }

  private async _parseBaseReadme(item?: IDocsItem): Promise<IPackageInfo> {
    const info: IPackageInfo = {
      name: 'UNKNOWN',
      description: '',
    }

    if (!item) return info

    const readmeText = await fs.readFile(item.baseFilepath, { encoding: 'utf8' })

    const lines = readmeText.split(/\r|\n/g)
    const f = lines.find((i: string) => /^# /.test(i))
    if (f) info.name = f.replace(/^# /, '').trim()
    info.description = ''

    return info
  }

  private _addBaseReadme(optionsBase: ICommandOptions): IDocsItem | undefined {
    const options = this.toAbsolute(optionsBase)
    const list: string[] = [path.resolve(options.root, 'docs/README.md'), path.resolve(options.root, 'README.md')]
    const f = list.find((i) => fs.existsSync(i))

    if (!f) return undefined

    return {
      baseFilepath: f,
      newFilePath: path.resolve(options.docsSpace, 'src', 'README.md'),
      watchFilePath: f,

      sidebarCallback: (sidebarOptions: ISidebarOptions) => sidebarOptions,

      navbarCallback: (navbarOptions: INavbarOptions, sidebarOptions: ISidebarOptions) => {
        navbarOptions.push({
          text: '首页',
          link: '/',
        })

        return navbarOptions
      },
    }
  }

  private _readRushProjects(options: ICommandOptions): IRushProject[] {
    const rushJson = parseJsonC(fs.readFileSync(path.resolve(options.root, 'rush.json'), { encoding: 'utf8' }))
    const projects: IRushProject[] = []

    rushJson.projects.forEach((i: IRushProject) => {
      if (i.shouldPublish) {
        projects.push({
          packageName: i.packageName,
          projectFolder: i.projectFolder,
          shouldPublish: i.shouldPublish,
        })
      }
    })

    return projects
  }

  protected async parseAPIConfig(options: ICommandOptions, tempDir: string): Promise<IConfigOptions> {
    if (options.config) {
      const config = path.isAbsolute(options.config) ? options.config : path.resolve(options.root, options.config)

      if (fs.existsSync(config)) {
        const result = await super.parseAPIConfig({ ...options, config }, tempDir)
        return result
      }
    }

    const rigJsonPath = path.resolve(options.root, 'config/rig.json')

    if (!fs.existsSync(rigJsonPath)) {
      const result = await super.parseAPIConfig({ ...options, config: undefined }, tempDir)
      return result
    }

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

    const rigPackagePath = path.resolve(options.root, 'node_modules', rigPackageName)

    const result = await super.parseAPIConfig({ ...options, config }, tempDir)
    return {
      ...result,

      /**
       * Rig 的路径。
       */
      rigPackage: fs.existsSync(rigPackagePath) ? rigPackagePath : undefined,
    }
  }

  protected async parseScheme(options: ICommandOptions): Promise<IDocsItem[]> {
    const packageInfo = await readPkg(options.root)
    const packageName = (packageInfo.name.match(/[^/]+$/g) ?? ['unknown'])[0]
    const docsList: IDocsItem[] = []
    const schemeKeys = Object.getOwnPropertyNames(DocsParseScheme) as Array<keyof TDocsParseScheme>

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
        const navPath = isHome ? 'home' : schema.navPath.replace(/^\/|\/$/g, '')
        const navName = isHome ? '主页' : schema.navName

        let newFilePath = `${options.docsSpace}/src/${navPath}/${packageName}.md`
        if (schema.isDir) newFilePath = `${options.docsSpace}/src/${navPath}/${packageName}`

        docsList.push({
          baseFilepath: p,
          newFilePath,
          watchFilePath: schema.isDir ? `${p}/*` : p,
          transform: schema.transform,

          sidebarCallback: (sidebarOptions: ISidebarOptions) => {
            if (schema.isDir) {
              // 移动！！！
              // @ts-ignore
              sidebarOptions[`/${navPath}/${packageName}`] = navPath === 'api' ? getSidebar(p) : 'structure'
            } else {
              const sidebarOptions2 = sidebarOptions as ISidebarObjectOptions
              if (!sidebarOptions2[`/${navPath}`]) {
                sidebarOptions2[`/${navPath}`] = []
              }
              const arr = sidebarOptions2[`/${navPath}`]
              if (Array.isArray(arr)) {
                arr.push(path.basename(newFilePath))
              }
            }
            return sidebarOptions
          },
          navbarCallback: (navbarOptions: INavbarOptions, sidebarOptions: ISidebarOptions) => {
            if (schema.isDir) {
              const f = navbarOptions.find((i) => (i as INavbarGroupOptions).text === navName) as
                | INavbarGroupOptions
                | undefined

              if (f) {
                f.children.push(packageName)
              } else {
                navbarOptions.push({
                  text: navName,
                  prefix: `/${navPath}/`,
                  children: [packageName],
                })
              }
            } else {
              const f = navbarOptions.find((i) => (i as INavbarGroupOptions).text === navName)
              if (!f) {
                navbarOptions.push({
                  text: navName,
                  link: `/${navPath}`,
                })
              }
            }
            return navbarOptions
          },
        })
      }
    }

    return docsList
  }
}
