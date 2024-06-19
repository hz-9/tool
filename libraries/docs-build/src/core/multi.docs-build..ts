/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-08 18:01:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 10:41:07
 */

/* eslint-disable no-param-reassign */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { parse as parseJsonC } from 'jsonc-parser'
import type { Package } from 'normalize-package-data'

import { DocsParseScheme, DocsParseSchemeMultiItem, DocsParseSchemeMultiRoot } from '../config/index'
import type {
  ICommandOptions,
  IConfigOptions,
  IDocsItem,
  IDocsParseSchemeItem,
  INavbarGroupOptions,
  INavbarOptions,
  IRushProject,
  ISidebarObjectOptions,
  ISidebarOptions,
} from '../interface/index'
import { installByPnpm, printOptions, readPkg } from '../util/index'
import { SingleDocsBuild } from './single.docs-build'

/**
 *
 * @public
 *
 * A build class that utilizes the docs build result.
 *
 * In rush.js project.
 *
 */
export class MultiDocsBuild extends SingleDocsBuild {
  public async build(options: ICommandOptions): Promise<void> {
    await printOptions(options)

    const projects = this._readRushProjects(options)

    let sidebarOptions: ISidebarOptions = {}
    let navbarOptions: INavbarOptions = []

    const allDocsList: IDocsItem[] = []

    const rootDocsList = await super.parseScheme(options, DocsParseSchemeMultiRoot)
    const packageInfo = await this._parseBaseReadme(options)
    allDocsList.push(...rootDocsList)

    let i = 0
    while (i < projects.length) {
      const project = projects[i]

      const projectOptions = {
        ...options,
        root: path.resolve(options.root, project.projectFolder),
      }

      const tempDir = path.resolve(projectOptions.root, 'temp', '.hz9/docs-build', `${Date.now()}`)
      this.needDeleteDirList.push(tempDir)

      const configOptions = await this.parseAPIConfig(projectOptions, tempDir)

      await this.generateAPIDocs(projectOptions, configOptions)

      const docsList = await this.parseScheme(projectOptions)

      allDocsList.push(...docsList)

      i += 1
    }

    sidebarOptions = await this.generateSidebarOptions(allDocsList, sidebarOptions)

    navbarOptions = await this.generateNavbarOptions(allDocsList, sidebarOptions, navbarOptions)

    await this.moveVuepressTemp(options.docsSpace, {
      options,
      navbarOptions: this.sortNavbarOptions(navbarOptions),
      sidebarOptions,
      packageInfo,
    })

    await installByPnpm(options.docsSpace)

    await this.watchChange(allDocsList, options)

    await this.vuepressAction(options.docsSpace, options.action)
  }

  private async _parseBaseReadme(options: ICommandOptions): Promise<Package> {
    const info: Package = {
      name: 'UNKNOWN',
      version: '0.0.0',
      description: '',
      readme: '',
      _id: '',
    }

    const list: string[] = [path.resolve(options.root, 'docs/README.md'), path.resolve(options.root, 'README.md')]
    const p = list.find((i) => fs.existsSync(i))
    if (!p) return info

    const readmeText = await fs.readFile(p, { encoding: 'utf8' })

    const lines = readmeText.split(/\r|\n/g)
    const f = lines.find((i: string) => /^# /.test(i))
    if (f) info.name = f.replace(/^# /, '').trim()
    info.description = ''
    return info
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
    const packageInfo = readPkg(options.root)
    const packageName = (packageInfo.name.match(/[^/]+$/g) ?? ['unknown'])[0]
    const docsList: IDocsItem[] = []
    const schemeKeys = Object.getOwnPropertyNames(DocsParseSchemeMultiItem) as Array<
      keyof typeof DocsParseSchemeMultiItem
    >

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
        const navPath = schema.navPath.replace(/^\/|\/$/g, '')
        const navName = this.getNavName(schema.navName, options.lang)

        let newFilePath = `${options.docsSpace}/src/${navPath}/${packageName}.md`
        if (schema.isDir) newFilePath = `${options.docsSpace}/src/${navPath}/${packageName}`

        docsList.push({
          baseFilepath: p,
          newFilePath,
          transform: schema.transform,
          isDir: schema.isDir === true,
          sidebarCallback: (sidebarOptions: ISidebarOptions) => {
            if (schema.isDir) {
              // 移动！！！
              // @ts-ignore
              sidebarOptions[`/${navPath}/${packageName}`] =
                navPath === 'api' ? this.getSidebar(p) : this.praseSidebarJson(p) ?? 'structure'
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
