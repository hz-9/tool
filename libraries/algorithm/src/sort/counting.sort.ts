/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 17:24:55
 * @LastEditTime : 2024-08-10 02:44:57
 * @LastEditors  : Chen Zhen
 */
import { ToNumberFn, defaultToNumber } from '../_base/index'

/* eslint-disable no-param-reassign */

/**
 * @public
 *
 * Counting sort algorithm.
 *
 * 计数排序。
 *
 * @param list - The array to be sorted.
 * @param toNumber - The function used to convert elements to numbers.
 * @returns - The sorted array. (Is original array)
 */
export const countingSort = <T>(list: Array<T>, toNumber: ToNumberFn<T> = defaultToNumber): T[] => {
  if (list.length < 2) return list
  const { length } = list

  const maxValue = Math.max(...list.map(toNumber))

  interface IArrayItem {
    num: number
    val: T
  }

  const counts = new Array<IArrayItem>(maxValue + 1)

  for (let i = 0; i < length; i += 1) {
    const itemIndex = toNumber(list[i])

    if (!counts[itemIndex]) counts[itemIndex] = { num: 0, val: list[i] }

    counts[itemIndex].num += 1
  }

  let sortedIndex = 0
  counts.forEach((item, i) => {
    if (item) {
      let currentCount = item.num
      while (currentCount > 0) {
        list[sortedIndex] = item.val
        sortedIndex += 1
        currentCount -= 1
      }
    }
  })

  return list
}
