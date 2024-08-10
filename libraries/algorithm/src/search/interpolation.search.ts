/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:28:40
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 17:31:49
 */
import { Compare, CompareFn, defaultCompare } from '../_base'

/**
 * @public
 *
 *  Interpolation search algorithm.
 *  Input parameters must be sorted in ascending order.
 *
 *  内插搜索算法。
 *  传入参数必须已经进行从小到大排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const interpolationSearch = <T>(array: T[], target: T, compareFn: CompareFn<T> = defaultCompare): number => {
  let low = 0
  let high = array.length - 1

  while (low <= high) {
    const delta = compareFn(array[high], array[low])
    if (delta === Compare.LESS_THAN) {
      return -1
    }

    const position = Math.floor(
      low + ((high - low) / (compareFn(array[high], array[low]) as number)) * (compareFn(target, array[low]) as number)
    )

    if (position < 0 || position >= array.length) {
      return -1
    }

    const element = array[position]

    if (compareFn(element, target) === Compare.EQUALS) {
      return position
    }

    if (compareFn(element, target) === Compare.LESS_THAN) {
      low = position + 1
    } else {
      high = position - 1
    }
  }

  return -1
}
