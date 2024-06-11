/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-10 19:48:01
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
      .option('-r, --root <char>', 'Root dir for workspace.', process.cwd())
      .option('-d, --docs-space <char>', 'Vuepress temp path.', 'docs/.vuepress')
      .option('-c, --config <char>', "Config file 's path.")
      .option('-m, --markdown-path <char>', "Generated Markdowns file 's path.", './docs/.markdowns')
      .option('-a, --action <char>', "Vuepress action. Only support 'serve' or 'build'")

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
      config: options.config,
      markdownPath: options.markdownPath,
      docsSpace: options.docsSpace,
      action: options.action,
    }
  }
}
