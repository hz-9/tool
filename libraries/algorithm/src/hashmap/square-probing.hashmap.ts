/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 12:58:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-04 11:27:08
 */
import { EMPTY_KEY_VALUE, KeyValue, kVEqualFn } from './_base.hashmap'
import { SimpleHashmap } from './simple.hashmap'

/**
 * @public
 *
 * A hashmap with square probing.
 *
 * 一个使用平方探查法的哈希表。
 */
export class SquareProbingHashmap<K, V> extends SimpleHashmap<K, V> {
  public set(key: K, value: V): boolean {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))

    let isUpdate = false

    let index = 0
    let g = this._items[keyStr + index ** 2]
    while (g) {
      // is Empty Key Value, Set
      if (kVEqualFn(g, EMPTY_KEY_VALUE)) break

      // Equal Key, Update
      if (this._toKeyStr(key) === this._toKeyStr(g.key)) {
        isUpdate = true
        break
      }

      index += 1
      g = this._items[keyStr + index ** 2]
    }

    this._items[keyStr + index ** 2] = new KeyValue<K, V>(key, value)
    if (!isUpdate) this._size += 1
    return true
  }

  public get(key: K): V | undefined {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    if (!this._items[keyStr]) return undefined

    let index = 0
    let g = this._items[keyStr + index ** 2]
    while (g) {
      if (kVEqualFn(g, new KeyValue(key, null))) return g.value

      index += 1
      g = this._items[keyStr + index ** 2]
    }

    return undefined
  }

  public remove(key: K): boolean {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    if (!this._items[keyStr]) return false

    let index = 0
    let g = this._items[keyStr + index ** 2]
    while (g) {
      if (kVEqualFn(g, new KeyValue(key, null))) {
        this._items[keyStr + index ** 2] = EMPTY_KEY_VALUE as KeyValue<K, V>
        this._size -= 1
        return true
      }

      index += 1
      g = this._items[keyStr + index ** 2]
    }

    return false
  }
}
