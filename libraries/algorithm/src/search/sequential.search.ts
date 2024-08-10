/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:22:24
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 13:54:17
 */
import { EqualsFn, defaultEquals } from '../_base'

/**
 * @public
 *
 *  Sequential search algorithm.
 *
 *  线性搜索算法。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const sequentialSearch = <T>(list: Array<T>, value: T, equalsFn: EqualsFn<T> = defaultEquals): number => {
  for (let i = 0; i < list.length; i += 1) {
    if (equalsFn(list[i], value)) return i
  }
  return -1
}
