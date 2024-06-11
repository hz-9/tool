#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-10 19:39:23
 */
import { Commander } from '../core/commander'
import { MultiDocsBuild } from '../core/multi.docs-build.'
import { SingleDocsBuild } from '../core/single.docs-build'

;(async () => {
  const options = await Commander.parse()

  if (Commander.inRush(options)) {
    await new MultiDocsBuild().build(options)
  } else {
    await new SingleDocsBuild().build(options)
  }
})()
