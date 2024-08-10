/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 17:25:53
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 17:36:26
 */
import { ToHashCode, ToKeyStr, toKeyStrDefault } from '../hashmap/_base.hashmap'
import { BetterHashmap } from '../hashmap/better.hashmap'
import { djb2HashCode } from '../hashmap/hash-code'

/**
 * @public
 *
 *  Hash search algorithm.
 *  Input parameters do not need to be sorted.
 *
 *  哈希搜索算法。
 *  传入参数无需排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param toKeyStr - The function to convert the value to a key string.
 * @param toHashCode - The function to convert the key string to a hash code.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const hashSearch = <T>(
  list: Array<T>,
  value: T,
  toKeyStr: ToKeyStr<T> = toKeyStrDefault,
  toHashCode: ToHashCode = djb2HashCode
): number => {
  const map = new BetterHashmap<T, number>(toKeyStr, toHashCode)
  list.forEach((item, index) => {
    map.set(item, index)
  })

  return map.get(value) ?? -1
}
