/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 12:58:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 22:28:33
 */
import {
  EMPTY_KEY_VALUE,
  Hashmap,
  IKeyValueObj,
  KeyValue,
  ToHashCode,
  ToKeyStr,
  kVToObj,
  toKeyStrDefault,
} from './_base.hashmap'
import { loseloseHashCode } from './hash-code'

/**
 *
 * @public
 *
 * 一个简单的哈希表。
 *
 * 较容易遇到键冲突问题，冲突的键无法添加到哈希表中。
 *
 */
export class SimpleHashmap<K, V> implements Hashmap<K, V> {
  protected _items: Record<number, KeyValue<K, V>>

  protected _size: number

  protected _toKeyStr: ToKeyStr<K>

  protected _toHashCode: ToHashCode

  public constructor(toKeyStr: ToKeyStr<K> = toKeyStrDefault, toHashCode: ToHashCode = loseloseHashCode) {
    this._items = {}

    this._size = 0

    this._toKeyStr = toKeyStr

    this._toHashCode = toHashCode
  }

  public get size(): number {
    return this._size
  }

  public get isEmpty(): boolean {
    return this.size === 0
  }

  public set(key: K, value: V): boolean {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))

    const isUpdate = !!this._items[keyStr]

    this._items[keyStr] = new KeyValue<K, V>(key, value)
    if (!isUpdate) this._size += 1
    return true
  }

  public get(key: K): V | undefined {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    return this._items[keyStr]?.value
  }

  public has(key: K): boolean {
    return !!this.get(key)
  }

  public remove(key: K): boolean {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    if (!this._items[keyStr]) return false

    delete this._items[keyStr]
    this._size -= 1
    return true
  }

  public clear(): void {
    this._size = 0
    this._items = {}
  }

  public toString(): string {
    let str = ''

    Object.keys(this._items).forEach((key) => {
      const kv = this._items[+key]

      if (kv.key !== EMPTY_KEY_VALUE.key) {
        const s = `${this._toKeyStr(kv.key)}: ${kv.toString()}`
        str += str === '' ? s : `\n${s}`
      }
    })

    return str
  }

  public toArray(): IKeyValueObj<K, V>[] {
    const array: IKeyValueObj<K, V>[] = []

    Object.values(this._items).forEach((kv) => {
      if (kv.key !== EMPTY_KEY_VALUE.key) {
        array.push(kVToObj(kv))
      }
    })

    return array
  }
}
