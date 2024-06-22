/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-08 18:01:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-23 01:07:11
 */

/* eslint-disable no-param-reassign */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { parse as parseJsonC } from 'jsonc-parser'
import type { Package } from 'normalize-package-data'

import { DocsParseSchemeMultiItem, DocsParseSchemeMultiRoot } from '../config/index'
import type { ICommandOptions, IRushProject } from '../interface/index'
import { installByPnpm, printOptions } from '../util/index'
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
  public static async build(optionsBase: ICommandOptions): Promise<MultiDocsBuild> {
    const build = new MultiDocsBuild()
    await build.build(optionsBase)
    return build
  }

  public async build(options: ICommandOptions): Promise<void> {
    await printOptions(options)

    const projects = this.readRushProjects(options)

    await this.scan(options, DocsParseSchemeMultiRoot)

    const packageInfo = await this._parseBaseReadme(options)

    let i = 0
    while (i < projects.length) {
      const project = projects[i]

      const projectOptions = {
        ...options,
        root: path.resolve(options.root, project.projectFolder),
      }

      const tempDir = path.resolve(projectOptions.root, 'temp', '.hz9/docs-build', `${Date.now()}`)
      this.needDeleteDirList.push(tempDir)

      const configOptions = await this.parseAPIExtractorJson(projectOptions, tempDir)

      await this.generateAPIDocs(projectOptions, configOptions)

      await this.scan(projectOptions, DocsParseSchemeMultiItem, true)

      i += 1
    }

    await this.moveVuepressTemp(options.docsSpace, {
      options,
      packageInfo,
      locales: this.getLocales(options),
    })

    await installByPnpm(options.docsSpace)

    await this.moveAndWatch(options)

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

  protected readRushProjects(options: ICommandOptions): IRushProject[] {
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
}
