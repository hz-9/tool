/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:26:51
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import console from 'node:console'
import type { Package } from 'normalize-package-data'

import type { IPkgBuildOptions } from '../interface'

/**
 * @internal
 *
 * Reads package.json information.
 *
 * @param cwd - The path where package.json exists
 *
 */
export const readPkg = (cwd: string = path.resolve(__dirname, '../..')): Package => {
  const p = path.resolve(cwd, 'package.json')
  const info = fs.readFileSync(p, { encoding: 'utf8' })
  return JSON.parse(info)
}

/**
 * @internal
 *
 * Outputs the final configuration information.
 *
 */
export const printOptions = async (options: IPkgBuildOptions): Promise<void> => {
  const pkg = readPkg()

  console.log()
  console.log(`${pkg.name} - ${pkg.version}`)
  console.log()
  console.log(`Options:`)
  console.log(`  root        : ${options.root}`)
  console.log(`  config      : ${options.config ?? 'No file.'}`)
  console.log(`  targets     : ${options.targets.join(' ')}`)
  console.log(`  name        : ${options.buildName}`)
  console.log(`  version     : ${options.buildVersion}`)
  console.log(`  input path  : ${options.inputPath}`)
  console.log(`  output path : ${options.outputPath}`)
  options.scripts.forEach((i, index) => {
    if (index === 0) {
      console.log(`  scripts     : ${i}`)
    } else {
      console.log(`              : ${i}`)
    }
  })
  options.assets.forEach((i, index) => {
    if (index === 0) {
      console.log(`  assets      : ${i}`)
    } else {
      console.log(`              : ${i}`)
    }
  })
  console.log()
}

/**
 * @internal
 *
 * Prints command line information.
 *
 */
export const printCommand = async (command: string): Promise<void> => {
  const pkg = readPkg()

  console.log(`${pkg.name} command:`)
  console.log(`    ${command}`)
  console.log()
}
