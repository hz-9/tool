/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-07-30 19:36:23
 * @LastEditors  : Chen Zhen
 */
import { defaultCompare } from '../index'

describe('Compare function', () => {
  it('compare - base', async () => {
    const arr = [1, 3, 2]
    arr.sort()
    expect(arr).toEqual([1, 2, 3])
  })
  it('compare - 2', async () => {
    const arr = [1, 3, 2]
    arr.sort(defaultCompare)
    expect(arr).toEqual([1, 2, 3])
  })
})
