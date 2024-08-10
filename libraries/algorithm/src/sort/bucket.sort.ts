/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 18:00:36
 * @LastEditTime : 2024-08-10 13:20:39
 * @LastEditors  : Chen Zhen
 */
import { CompareFn, ToNumberFn, defaultCompare, defaultToNumber } from '../_base/index'
import { insertionSort } from './insertion.sort'

/* eslint-disable no-param-reassign */

const createBucket = <T>(list: Array<T>, bucketSize: number, toNumber: ToNumberFn<T>): Array<T[]> => {
  let minNum = toNumber(list[0])
  let maxNum = toNumber(list[0])
  for (let i = 1; i < list.length; i += 1) {
    const itemNum = toNumber(list[i])
    if (itemNum < minNum) {
      minNum = itemNum
    } else if (itemNum > maxNum) {
      maxNum = itemNum
    }
  }

  const bucketCount = Math.floor((maxNum - minNum) / bucketSize) + 1

  const buckets: Array<T[]> = []
  while (buckets.length < bucketCount) {
    buckets.push([])
  }

  for (let i = 0; i < list.length; i += 1) {
    const itemNum = toNumber(list[i])
    const bucketIndex = Math.floor((itemNum - minNum) / bucketSize)
    buckets[bucketIndex].push(list[i])
  }

  return buckets
}

const sortBuckets = <T>(buckets: Array<T[]>, compareFu: CompareFn<T>): Array<T> => {
  const sortedList: T[] = []
  for (let i = 0; i < buckets.length; i += 1) {
    if (buckets[i].length > 0) {
      insertionSort(buckets[i], compareFu)
      sortedList.push(...buckets[i])
    }
  }

  return sortedList
}

/**
 * @public
 *
 * Bucket sort algorithm.
 *
 * 桶排序。
 *
 * Time complexity: O(n)
 *
 * @param list - The array to be sorted.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @param bucketSize - The size of each bucket.
 * @param toNumber - The function used to convert elements to numbers.
 * @returns - The sorted array. (Is not original array)
 */
export const bucketSort = <T>(
  list: Array<T>,
  compareFu: CompareFn<number> = defaultCompare,
  bucketSize: number = 5,
  toNumber: ToNumberFn<T> = defaultToNumber
): Array<T> => {
  if (list.length < 2) return list

  const buckets = createBucket(list, bucketSize, toNumber)

  return sortBuckets(buckets, (a, b) => compareFu(toNumber(a), toNumber(b)))
}
