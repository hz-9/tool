#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 20:00:06
 */
import { Commander } from '../core/commander'
import { PKGUtil } from '../core/pkg-util'

;(async () => {
  const options = await Commander.parse()

  await PKGUtil.build(options)
})()
