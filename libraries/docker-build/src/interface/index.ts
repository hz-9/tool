/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 17:50:32
 */
import type { SupportPlatform } from '../enum'

/**
 * @public
 *
 *  从命令行出进行解析的参数结果。
 *
 *  除 root 外，不进行默认值设置。
 *
 */
export type ICommandOptions = Partial<Omit<IDockerBuildOptions, 'root' | 'assets'>> & Pick<IDockerBuildOptions, 'root'>

/**
 * @public
 *
 *  配置文件解析结果。
 *
 */
export interface IConfigOptions extends Partial<Omit<IDockerBuildOptions, 'root' | 'config'>> {}

/**
 * @public
 *
 *  DockerBuild 构建时所需参数。
 *
 */
export interface IDockerBuildOptions {
  /**
   * 操作根路径。会由 Command 直接设置默认值为 process.cwd()
   */
  root: string

  /**
   * 配置文件存在路径。
   */
  config?: string

  /**
   *
   * 构建名称。
   *
   * 默认：采用 package.json 的 name 属性；（去除 scoped 部分）
   *
   */
  buildName: string

  /**
   * 构建版本。
   *
   * 默认：采用 package.json 的 version 属性；
   */
  buildVersion: string

  /**
   * 目标平台。
   *
   * 默认：'linux-amd64'
   */
  platform: SupportPlatform

  /**
   * 入口文件。
   */
  inputPath: string

  /**
   * 打包时使用的镜像。
   *
   * image 会根据 node 属性而改变,
   * 若指定了 image 属性，则 node 属性无效。
   *
   * 默认为：'node:${node}-slim' ('node:18.20-slim')
   */
  baseImage: string

  /**
   * 开放的端口。
   *
   * 默认：16100。
   */
  exposePort: number

  /**
   * 需要移入镜像的静态资源。
   *
   * 默认为：['package.json']
   */
  assets: string[]

  /**
   * 是否发布镜像。
   *
   * 默认：false
   */
  publish: boolean

  /**
   * 镜像发布地址。
   */
  publishHost?: string

  /**
   * 是否清理构建的镜像
   *
   * 默认：false
   */
  lastClean: boolean
}
