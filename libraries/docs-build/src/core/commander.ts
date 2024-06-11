/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 20:59:44
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command, type OptionValues } from 'commander'

import type { ICommandOptions } from '../interface/index'
import { readPkg } from '../util'

/**
 * @public
 *
 * 命令行交互对象
 *
 */
export class Commander {
  public static inRush(options: ICommandOptions): boolean {
    return fs.existsSync(path.resolve(options.root, 'rush.json'))
  }

  public static async parse(): Promise<ICommandOptions> {
    const pkg = await readPkg()

    const program = new Command()

    program.name('docs-build').version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'the execution path.', process.cwd())
      .option('-c, --config <char>', "the path to 'api-extractor.json'.")
      .option('--docs-space <char>', 'The space to docs website.', './docs/.vuepress')
      .option('--markdown-path <char>', 'the markdown folder.', './docs/.markdowns')
      .option('-a, --action <char>', "vuepress action. Support 'serve' or 'build'")
      .option('--base-url <char>', 'vuepress build path', '/')

    program.parse(process.argv)
    const commandOptions = this._parseCommandOptions(program.opts())
    return commandOptions
  }

  /**
   * @internal
   *
   *  用以解析命令行获取的对象。
   *
   * 除了 root 所有参数，均为相对路径。
   *
   * @param options - 命令行参数。
   * @returns 解析成果。
   */
  public static _parseCommandOptions(options: OptionValues): ICommandOptions {
    const root: string = options.root ?? process.cwd()

    return {
      root,
      baseUrl: options.baseUrl,
      config: options.config,
      markdownPath: options.markdownPath,
      docsSpace: options.docsSpace,
      action: options.action,
    }
  }
}
