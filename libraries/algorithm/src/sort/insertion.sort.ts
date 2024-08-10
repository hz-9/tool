/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:59:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 13:15:52
 */
import { Compare, CompareFn, defaultCompare } from '../_base/index'

/* eslint-disable no-param-reassign */

/**
 * @public
 *
 * Insertion sort algorithm.
 *
 * 插入排序。
 *
 * Time complexity: O(n^2)
 *
 * Time complexity badest case: O(n^2)
 *
 * Time complexity goodest case: O(n)
 *
 * Space complexity: O(1)
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const insertionSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> => {
  const { length } = list
  if (!length) return list

  let temp: T = list[0]!
  for (let i = 0; i < length; i += 1) {
    let j = i
    temp = list[i]!
    while (j > 0 && compareFu(list[j - 1], temp) === Compare.BIGGER_THAN) {
      list[j] = list[j - 1]
      j -= 1
    }
    list[j] = temp
  }
  return list
}
