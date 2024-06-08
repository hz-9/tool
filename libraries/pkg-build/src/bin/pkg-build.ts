#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-08 15:46:04
 */
import { Commander } from '../core/commander'
import { PkgBuild } from '../core/pkg-build'

;(async () => {
  const options = await Commander.parse()

  await PkgBuild.build(options)
})()
