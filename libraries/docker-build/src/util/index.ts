/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 17:48:18
 */
import console from 'node:console'
import readPkg from 'read-pkg'

import type { IDockerBuildOptions } from '../interface'

/**
 * 打印所有配置信息。
 */
export const printOptions = async (options: IDockerBuildOptions): Promise<void> => {
  const pkg = await readPkg()

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
 * @public
 *
 *  打印了命令行信息。
 *
 */
export const printCommand = async (command: string): Promise<void> => {
  const pkg = await readPkg()

  console.log(`${pkg.name} command:`)
  console.log(`    ${command}`)
  console.log()
}

export const getDefaultImage = (): string => `node:${process.version.replace(/^v/, '')}-slim`
