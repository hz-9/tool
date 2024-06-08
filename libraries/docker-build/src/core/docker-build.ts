/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 17:37:23
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 16:36:57
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import execa from 'execa'
import exitHook from 'exit-hook'
import _ from 'lodash'
import console from 'node:console'
import { v1 as uuidV1 } from 'uuid'

import type { IDockerBuildOptions } from '../interface'
import { printCommand, printOptions } from '../util'

/**
 * 等待删除的文件列表。
 */
const needDeleteDirList: string[] = []

/**
 * 推出后，对中间成果进行删除。
 */
exitHook(() => {
  needDeleteDirList.forEach((d: string) => {
    fs.removeSync(d)
  })
})

/**
 * @public
 *
 *  Docker Image Build
 *
 */
export class DockerBuild {
  public static async build(options: IDockerBuildOptions): Promise<void> {
    await printOptions(options)

    const tempDir = path.resolve(options.root, 'temp', '.hz9/docker-build', `${Date.now()}`)
    needDeleteDirList.push(tempDir)

    const dockerfilePath: string = path.resolve(tempDir, 'dockerfile')

    await this._checkDockerInstalled()

    await this._downloadBaseImage(options)

    await this._createDockerfile(options, dockerfilePath)

    await this._buildDockerImage(options, dockerfilePath)

    if (options.publish) await this._publishDockerImage(options)

    if (options.clean) await this._clean(options)
  }

  /**
   * 检查是否已经安装了 Docker?
   */
  private static async _checkDockerInstalled(): Promise<void> {
    try {
      await execa('docker', ['--version'])
    } catch (error) {
      console.error("Not found 'docker' command.")
      throw error
    }
  }

  /**
   * 下载基础镜像。
   */
  private static async _downloadBaseImage(options: IDockerBuildOptions): Promise<void> {
    const commands: string[] = ['pull', `--platform=${options.platform}`, options.image]

    await printCommand(`docker ${commands.join(' ')}`)

    await execa('docker', commands, {
      cwd: options.root,
      stderr: process.stderr,
      stdout: process.stdout,
    })
  }

  /**
   *
   * 创建 Dockerfile
   *
   */
  private static async _createDockerfile(options: IDockerBuildOptions, dockerfilePath: string): Promise<void> {
    fs.mkdirpSync(path.dirname(dockerfilePath))
    const template = fs.readFileSync(path.resolve(__dirname, '../../dockerfile.ejs'), { encoding: 'utf8' })
    const newOptions: IDockerBuildOptions = JSON.parse(JSON.stringify(options))

    const toRelative = (p: string): string => path.relative(options.root, p)

    newOptions.inputPath = toRelative(newOptions.inputPath)
    newOptions.assets = newOptions.assets.map((i) => toRelative(i))

    const maxLength: number = Math.max(newOptions.inputPath.length, ...newOptions.assets.map((i) => i.length))
    newOptions.inputPath = _.padEnd(newOptions.inputPath, maxLength, ' ')

    /**
     * 要进行移动的静态资源，并创建对应文件夹。
     */
    const assets: string[][] = []
    options.assets.forEach((i) => {
      const middleDir = path.relative(options.root, i)
      const appDir: string = path.resolve('/app', path.dirname(middleDir))
      assets.push([_.padEnd(toRelative(i), maxLength, ' '), appDir])
    })

    const content = _.template(template)({ options: newOptions, assets })
    fs.writeFileSync(dockerfilePath, content, { encoding: 'utf8' })
  }

  /**
   * 构建 Docker Image
   */
  private static async _buildDockerImage(options: IDockerBuildOptions, dockerfilePath: string): Promise<void> {
    const hashTag: string = uuidV1()
    const imageTag: string = this._getDockerImageTag(options)

    // 删除历史镜像。
    const exists = await this._existsDockerIamge(imageTag)
    if (exists) await this._deleteDockerIamge(imageTag)

    const commands: string[] = [
      'build',
      '-f',
      path.relative(options.root, dockerfilePath),
      `--platform=${options.platform}`,
      '-t',
      hashTag,
      '.',
    ]

    await printCommand(`docker ${commands.join(' ')}`)
    await execa('docker', commands, {
      // cwd: path.dirname(dockerfilePath),
      cwd: options.root,
      stderr: process.stderr,
      stdout: process.stdout,
    })

    await this._renameDockerImage(hashTag, imageTag)
    await this._deleteDockerIamge(hashTag)
  }

  private static async _existsDockerIamge(dockerTag: string): Promise<boolean> {
    try {
      const commands: string[] = ['image', 'inspect', dockerTag]

      await printCommand(`docker ${commands.join(' ')}`)

      await execa('docker', commands)
      return true
    } catch (error) {
      return false
    }
  }

  private static async _deleteDockerIamge(dockerTag: string): Promise<void> {
    try {
      const commands: string[] = ['rmi', dockerTag]

      await printCommand(`docker ${commands.join(' ')}`)

      await execa('docker', commands)
    } catch (error) {
      // ...
    }
  }

  private static async _renameDockerImage(historyTag: string, newTag: string): Promise<void> {
    try {
      const commands: string[] = ['tag', historyTag, newTag]

      await printCommand(`docker ${commands.join(' ')}`)

      await execa('docker', commands, {
        stderr: process.stderr,
        stdout: process.stdout,
      })
    } catch (error) {
      // ...
    }
  }

  private static async _publishDockerImage(options: IDockerBuildOptions): Promise<void> {
    const imageTag: string = this._getDockerImageTag(options)

    const commands: string[] = ['push', imageTag]

    await printCommand(`docker ${commands.join(' ')}`)
    await execa('docker', commands, {
      stderr: process.stderr,
      stdout: process.stdout,
    })
  }

  private static async _clean(options: IDockerBuildOptions): Promise<void> {
    const imageTag: string = this._getDockerImageTag(options)
    await this._deleteDockerIamge(imageTag)
  }

  private static _getDockerImageTag(options: IDockerBuildOptions): string {
    let imageTag: string = `${options.buildName}:${options.buildVersion}`
    if (options.publishHost) imageTag = `${options.publishHost}/${imageTag}`
    return imageTag
  }
}
