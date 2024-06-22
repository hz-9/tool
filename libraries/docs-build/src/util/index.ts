/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-22 13:08:28
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import console from 'node:console'
import crypto from 'node:crypto'
import type { Package } from 'normalize-package-data'

import type { ICommandOptions } from '../interface/index'

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
export const printOptions = async (options: ICommandOptions): Promise<void> => {
  const pkg = readPkg()

  const inRush = fs.existsSync(path.resolve(options.root, 'rush.json'))

  console.log()
  console.log(`${pkg.name} - ${pkg.version}`)
  console.log()
  console.log(`Options:`)
  console.log(`  root        : ${options.root}`)

  console.log(`  action      : ${options.action}`)
  console.log(`  in rush     : ${inRush}`)
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

/**
 * @internal
 *
 * Checks if the command exists.
 *
 */
export const commandIsExists = async (c: string, commands: string[]): Promise<boolean> => {
  try {
    await execa(c, commands, {
      // stderr: process.stderr,
      // stdout: process.stdout,
    })
    return true
  } catch (error) {
    return false
  }
}

/**
 * @internal
 *
 * Installs a package in global env.
 *
 */
export const installInGlobal = async (packageName: string): Promise<void> => {
  await execa('npm', ['i', '-g', packageName], {
    stderr: process.stderr,
    stdout: process.stdout,
  })
}

/**
 * @internal
 *
 * Installs dependencies using pnpm.
 *
 */
export const installByPnpm = async (cwd: string): Promise<void> => {
  const exists = await commandIsExists('pnpm', ['--version'])
  if (!exists) {
    await installInGlobal('pnpm')
  }

  await execa('pnpm', ['install'], {
    cwd,
    stderr: process.stderr,
    stdout: process.stdout,
  })
}

/**
 * @internal
 *
 *  Calculate the hash value of the file
 *
 * @param filePath - The path of the file to be calculated
 * @param algorithm - The algorithm used to calculate the hash value
 * @returns - The hash value of the file
 */
export const calculateFileHash = (filePath: string, algorithm = 'sha256'): Promise<string> =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm)
    const stream = fs.createReadStream(filePath)

    stream.on('error', (err) => reject(err))
    stream.on('data', (chunk) => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
