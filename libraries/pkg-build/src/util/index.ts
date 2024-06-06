/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 17:36:56
 */

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
