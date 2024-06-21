#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 19:39:52
 */
import { Commander, MultiDocsBuild, SingleDocsBuild } from '../index'

;(async () => {
  const options = await Commander.parse()

  if (Commander.inRush(options)) {
    await MultiDocsBuild.build(options)
  } else {
    await SingleDocsBuild.build(options)
  }
})()
