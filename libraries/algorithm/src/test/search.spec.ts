/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 16:37:56
 * @LastEditTime : 2024-08-10 13:52:46
 * @LastEditors  : Chen Zhen
 */
import { binarySearch, interpolationSearch, sequentialSearch } from '../index'

type SearchFunction<T> = typeof sequentialSearch<T> | typeof binarySearch<T> | typeof interpolationSearch<T>

describe.each([
  ['sequentialSearch', sequentialSearch],
  ['binarySearch', binarySearch],
  ['interpolationSearch', interpolationSearch],
])('Search - %s', (name: string, searchFun: SearchFunction<number>) => {
  it('Test 0', async () => {
    expect(searchFun([], 1)).toBe(-1)
    expect(searchFun([123], 1)).toBe(-1)
  })

  it('Test 1', async () => {
    expect(searchFun([1, 2, 3, 4, 5, 9, 9], 3)).toBe(2)
    expect(searchFun([1, 2, 3, 4, 5, 6, 7, 8, 9], 1)).toBe(0)
    expect(searchFun([1, 2, 3, 4, 5, 6, 7, 8, 9], 9)).toBe(8)
    expect(searchFun([1, 2, 3, 4, 5, 6, 7, 8, 9], -1)).toBe(-1)

    if (searchFun === interpolationSearch) {
      expect(searchFun([2, 1], 1)).toBe(-1)
    }
  })
})