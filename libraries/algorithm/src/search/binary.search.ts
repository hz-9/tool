/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:28:40
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 17:38:03
 */
import { Compare, CompareFn, defaultCompare } from '../_base'

/**
 * @public
 *
 *  Binary search algorithm.
 *  Input parameters must be sorted in ascending order.
 *
 *  二分搜索算法。
 *  传入参数无需排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const binarySearch = <T>(array: T[], target: T, compareFn: CompareFn<T> = defaultCompare): number => {
  let low = 0
  let high = array.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = array[mid]

    if (compareFn(element, target) === Compare.EQUALS) {
      return mid
    }

    if (compareFn(element, target) === Compare.LESS_THAN) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return -1
}
