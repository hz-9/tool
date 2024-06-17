/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:57:39
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:46:40
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import { Command, type OptionValues } from 'commander'

import type { ICommandOptions } from '../interface/index'
import { readPkg } from '../util'

/**
 *
 * @public
 *
 * Command Line Argument Parsing Class
 *
 */
export class Commander {
  public static inRush(options: ICommandOptions): boolean {
    return fs.existsSync(path.resolve(options.root, 'rush.json'))
  }

  public static async parse(): Promise<ICommandOptions> {
    const pkg = readPkg()

    const program = new Command()

    program.name(pkg.name).version(pkg.version)
    if (pkg.description) program.description(pkg.description)

    program
      .option('-r, --root <char>', 'the execution path.', process.cwd())
      .option('-c, --config <char>', "the path to 'api-extractor.json'.")
      .option('--docs-space <char>', 'The space to docs website.', './docs/.vuepress')
      .option('--markdown-path <char>', 'the markdown folder.', './docs/.markdowns')
      .option('-a, --action <char>', "vuepress action. Support 'serve' or 'build'")
      .option('--base-url <char>', 'vuepress website base path', '/')
      .option('--lang <char>', 'vuepress website language', 'en-US')

    program.parse(process.argv)
    const commandOptions = this._parseCommandOptions(program.opts())
    return commandOptions
  }

  /**
   *
   * @internal
   *
   * Converts the property describing the path from command line arguments into
   * an absolute path starting from the `options.root` location
   * and returns the correct `ICommandOptions` object.
   *
   * @param options - The unformatted command line object
   * @returns The formatted result.
   */
  public static _parseCommandOptions(options: OptionValues): ICommandOptions {
    const root: string = options.root ?? process.cwd()

    return {
      root,
      baseUrl: options.baseUrl,
      lang: options.lang,
      config: options.config,
      markdownPath: options.markdownPath,
      docsSpace: options.docsSpace,
      action: options.action,
    }
  }
}
