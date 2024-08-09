/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:59:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 02:39:39
 */
import { Compare, CompareFn, defaultCompare } from '../_base/index'
import { swap } from './_.sort'

/**
 * @public
 *
 * Selection sort algorithm.
 *
 * 选择排序。
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const selectionSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> => {
  const { length } = list

  let indexMin: number = 0
  for (let i = 0; i < length; i += 1) {
    indexMin = i

    for (let j = i; j < length; j += 1) {
      if (compareFu(list[indexMin], list[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
    }

    if (i !== indexMin) swap(list, i, indexMin)
  }
  return list
}
