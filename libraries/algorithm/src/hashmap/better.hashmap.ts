/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 12:58:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 21:01:37
 */
import { ToHashCode, ToKeyStr, toKeyStrDefault } from './_base.hashmap'
import { djb2HashCode } from './hash-code'
import { SquareProbingHashmap } from './square-probing.hashmap'

/**
 *
 * @public
 *
 * 一个比较合适的哈希表，采用 djb2 哈希算法，以及平方探测，用以解决冲突。
 *
 */
export class BetterHashmap<K, V> extends SquareProbingHashmap<K, V> {
  public constructor(toKeyStr: ToKeyStr<K> = toKeyStrDefault, toHashCode: ToHashCode = djb2HashCode) {
    super(toKeyStr, toHashCode)
  }
}
