/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:59:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 13:18:12
 */
import { Compare, CompareFn, defaultCompare } from '../_base/index'
import { swap } from './_.sort'

const partition = <T>(list: Array<T>, left: number, right: number, compareFu: CompareFn<T>): number => {
  const pivot = list[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    while (compareFu(list[i], pivot) === Compare.LESS_THAN) {
      i += 1
    }

    while (compareFu(list[j], pivot) === Compare.BIGGER_THAN) {
      j -= 1
    }

    if (i <= j) {
      swap(list, i, j)
      i += 1
      j -= 1
    }
  }

  return i
}

const quick = <T>(list: Array<T>, left: number, right: number, compareFu: CompareFn<T>): Array<T> => {
  if (list.length < 2) return list

  const index = partition(list, left, right, compareFu)
  if (left < index - 1) {
    quick(list, left, index - 1, compareFu)
  }
  if (index < right) {
    quick(list, index, right, compareFu)
  }

  return list
}

/**
 * @public
 *
 * Quick sort algorithm.
 *
 * 快速排序。
 *
 * Time complexity: O(n logn)
 *
 * Time complexity badest case:  O(n^2)
 *
 * Time complexity goodest case:  O(n logn)
 *
 * Space complexity: O(n logn)
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const quickSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): Array<T> =>
  quick(list, 0, list.length - 1, compareFu)
