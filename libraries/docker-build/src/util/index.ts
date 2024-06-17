/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-17 18:33:21
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import console from 'node:console'
import type { Package } from 'normalize-package-data'

import type { IDockerBuildOptions } from '../interface'

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
export const printOptions = async (options: IDockerBuildOptions): Promise<void> => {
  const pkg = readPkg()

  console.log()
  console.log(`${pkg.name} - ${pkg.version}`)
  console.log()
  console.log(`Options:`)
  console.log(`  root        : ${options.root}`)
  console.log(`  config      : ${options.config ?? 'No file.'}`)
  console.log(`  platform    : ${options.platform}`)
  console.log(`  name        : ${options.buildName}`)
  console.log(`  version     : ${options.buildVersion}`)
  console.log(`  input path  : ${options.inputPath}`)
  console.log(`  base image  : ${options.baseImage}`)
  console.log(`  publish     : ${options.publish}`)
  console.log(`  publish host: ${options.publishHost ?? 'Offical'}`)
  console.log(`  expose port : ${options.exposePort}`)
  console.log(`  last clean  : ${options.lastClean}`)

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

export const getDefaultImage = (): string => `node:${process.version.replace(/^v/, '')}-slim`
