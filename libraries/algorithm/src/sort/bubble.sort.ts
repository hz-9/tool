/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:59:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 02:38:52
 */
import { Compare, CompareFn, defaultCompare } from '../_base/index'
import { swap } from './_.sort'

/**
 * @public
 *
 * Bubble sort algorithm.
 *
 * 冒泡排序。
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const bubbleSortBase = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> => {
  const { length } = list
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length - 1; j += 1) {
      if (compareFu(list[j], list[j + 1]) === Compare.BIGGER_THAN) {
        swap(list, j, j + 1)
      }
    }
  }
  return list
}

/**
 * @public
 *
 * Bubble sort algorithm.
 *
 * 冒泡排序。
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns The sorted array. (Is original array)
 */
export const bubbleSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> => {
  const { length } = list
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length - 1 - i; j += 1) {
      if (compareFu(list[j], list[j + 1]) === Compare.BIGGER_THAN) {
        swap(list, j, j + 1)
      }
    }
  }
  return list
}
