/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 17:24:55
 * @LastEditTime : 2024-08-10 14:15:53
 * @LastEditors  : Chen Zhen
 */
import { CompareFn, defaultCompare } from '../_base/index'
import { MinHeap } from '../heap/min.heap'

/* eslint-disable no-param-reassign */

/**
 * @public
 *
 * Heap sort algorithm.
 *
 * 堆排序。
 *
 * Time complexity: O(n logn)
 *
 * Time complexity badest case:  O(n logn)
 *
 * Time complexity goodest case:  O(n logn)
 *
 * Space complexity: O(1)
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const heapSort = <T>(list: Array<T>, compareFu: CompareFn<T> = defaultCompare): T[] => {
  if (list.length < 2) return list

  const heap = new MinHeap<T>(compareFu)
  list.forEach((item) => heap.add(item))

  for (let i = 0; i < list.length; i += 1) {
    list[i] = heap.pop() as T
  }

  return list
}
