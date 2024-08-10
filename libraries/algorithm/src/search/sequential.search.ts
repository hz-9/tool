/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:22:24
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 17:32:24
 */
import { EqualsFn, defaultEquals } from '../_base'

/**
 * @public
 *
 *  Sequential search algorithm.
 *  Input parameters must be sorted in ascending order.
 *
 *  线性搜索算法。
 *  传入参数必须已经进行从小到大排序。
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
