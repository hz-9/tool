#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 20:07:32
 */
import { Commander, PkgBuild } from '../index'

;(async () => {
  const options = await Commander.parse()

  await PkgBuild.build(options)
})()
