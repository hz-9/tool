#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 20:13:26
 */
import { Commander, DockerBuild } from '../index'

;(async () => {
  const options = await Commander.parse()

  await DockerBuild.build(options)
})()
