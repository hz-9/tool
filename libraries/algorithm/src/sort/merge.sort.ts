/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:59:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 13:17:27
 */
import { Compare, CompareFn, defaultCompare } from '../_base/index'

/* eslint-disable no-param-reassign, no-plusplus */

const merge = <T>(left: Array<T>, right: Array<T>, compareFu: CompareFn<T>): Array<T> => {
  let i = 0
  let j = 0
  const result = []

  while (i < left.length && j < right.length) {
    result.push(compareFu(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
  }

  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

/**
 * @public
 *
 * Merge sort algorithm.
 *
 * 归并排序。
 *
 * Time complexity: O(n logn)
 *
 * Time complexity badest case:  O(n logn)
 *
 * Time complexity goodest case:  O(n logn)
 *
 * Space complexity: O(n)
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is not original array)
 */
export const mergeSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> => {
  const { length } = list
  if (length < 2) return list

  const middle = Math.floor(length / 2)
  const left = mergeSort(list.slice(0, middle), compareFu)
  const right = mergeSort(list.slice(middle, length), compareFu)
  list = merge(left, right, compareFu)

  return list
}
