/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 16:31:06
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import console from 'node:console'
import readPkg from 'read-pkg'

import type { IPkgBuildOptions } from '../interface'

/**
 * 打印所有配置信息。
 */
export const printOptions = async (options: IPkgBuildOptions): Promise<void> => {
  const pkg = await readPkg()

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

/**
 * 获取默认平台。
 *
 *  当处于 MacOS Arm 框架下，默认处理为 x64
 *
 */
const getDefaultFancyArch = (): string => {
  if (process.platform === 'darwin' && process.arch === 'arm64') return 'x64'
  return process.arch
}

/**
 * @public
 *
 * 获取框架名称
 *
 */
export const getFancyArch = (arch: string = getDefaultFancyArch()): string => {
  if (arch === 'arm') return 'armv7'
  if (arch === 'ia32') return 'x86'
  if (arch === 'x86_64') return 'x64'
  return arch
}

/**
 * @public
 *
 * 获取系统名称
 *
 */
export const getFancyPlatform = (platform: string = process.platform): string => {
  if (platform === 'darwin') return 'macos'
  if (platform === 'lin') return 'linux'
  if (platform === 'mac') return 'macos'
  if (platform === 'osx') return 'macos'
  if (platform === 'win32') return 'win'
  if (platform === 'windows') return 'win'
  return platform
}

/**
 * @public
 *
 *  获取 pkg node binary 文件名称。
 *
 */
export const getTarget = (
  nodeVersion: string = (process.versions.node.match(/^[0-9]+/) ?? ['0'])[0],
  platform: string = process.platform,
  arch: string = getDefaultFancyArch()
): string => `node${nodeVersion}-${getFancyPlatform(platform)}-${getFancyArch(arch)}`

/**
 *
 *  拷贝源文件至项目路径中。
 *
 * @param from - 源文件夹。
 * @param to - 目标文件夹。
 * @param platform - 目标平台。
 */
export const copyPkgFetchToTemp = async (from: string, to: string, targetPlatform: string): Promise<void> => {
  const currentPlatform =
    getFancyPlatform() === 'macos' ? getFancyPlatform() : `${getFancyPlatform()}-${getFancyArch()}`

  const versionStr = process.versions.node.match(/^[0-9]+/)
  if (!versionStr || !versionStr[0]) throw new Error('Unknow node.js version.')

  const version = `v${versionStr[0]}`

  let pkgFetchVersions = await fs.readdir(from)
  pkgFetchVersions = pkgFetchVersions.filter((i) => i === 'v3.4' || i === 'v3.5')

  let i = 0
  while (i < pkgFetchVersions.length) {
    const n = pkgFetchVersions[i]
    i += 1

    const d = path.resolve(from, n)
    const stat = await fs.stat(d)

    if (/^v[0-9]+.[0-9]+$/.test(n) && stat.isDirectory()) {
      const filenames = await fs.readdir(d)

      let j = 0
      while (j < filenames.length) {
        const filename = filenames[j]
        j += 1

        const needCopy =
          /^fetched-/.test(filename) &&
          !/.downloading$|-signed$/.test(filename) &&
          (filename.includes(targetPlatform) || filename.includes(currentPlatform)) &&
          filename.includes(version)

        if (needCopy) {
          // 需要进行文件拷贝
          const toDirSecond = path.resolve(to, n)

          if (!fs.existsSync(toDirSecond)) await fs.mkdirp(toDirSecond)
          await fs.copyFile(path.resolve(from, n, filename), path.resolve(to, n, filename))
        }
      }
    }
  }
}

export const getPkgCommand = async (root: string): Promise<string> => {
  const execaResult = await execa('npm', ['config', 'get', 'prefix'])

  const paths = [
    path.resolve(root, './node_modules/.bin/pkg'),

    path.resolve(process.cwd(), './node_modules/.bin/pkg'),

    path.resolve(execaResult.stdout, './bin/pkg'),
  ]

  let i = 0
  while (i < paths.length) {
    const p = paths[i]
    if (fs.existsSync(p)) return p
    i += 1
  }

  return paths[0]
}
