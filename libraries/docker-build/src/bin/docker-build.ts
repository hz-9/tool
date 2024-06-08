#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 12:51:17
 */
import { Commander } from '../core/commander'
import { DockerBuild } from '../core/docker-build'

;(async () => {
  const options = await Commander.parse()

  await DockerBuild.build(options)
})()
