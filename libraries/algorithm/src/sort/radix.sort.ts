/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 02:16:27
 * @LastEditTime : 2024-08-10 02:38:16
 * @LastEditors  : Chen Zhen
 */
import { ToNumberFn, defaultToNumber } from '../_base/index'

/* eslint-disable no-param-reassign */

/**
 * @public
 *
 * Radix sort algorithm.
 *
 * 基数排序。
 *
 * @param list - The array to be sorted.
 * @param radixBase - The base of the radix.
 * @param compareFu - The comparison function used to determine the order of the elements.
 * @returns - The sorted array. (Is original array)
 */
export const radixSort = <T>(
  list: Array<T>,
  radixBase: number = 10,
  toNumber: ToNumberFn<T> = defaultToNumber
): Array<T> => {
  if (list.length < 2) return list

  const maxValue = Math.max(...list.map(toNumber))
  const maxDigit = String(maxValue).length

  interface IArrayItem {
    num: number
    val: T
  }

  const buckets: IArrayItem[][] = new Array(radixBase).fill(0).map(() => [])

  for (let i = 0; i < maxDigit; i += 1) {
    list.forEach((item) => {
      const num = toNumber(item)
      const digit = Math.floor(num / radixBase ** i) % radixBase
      buckets[digit].push({ val: item, num })
    })

    let index = 0
    buckets.forEach((bucket) => {
      while (bucket.length > 0) {
        list[index] = bucket.shift()!.val
        index += 1
      }
    })

    // 清空桶以便下一次迭代使用
    buckets.forEach((n) => {
      n.length = 0
    })
  }

  return list
}
