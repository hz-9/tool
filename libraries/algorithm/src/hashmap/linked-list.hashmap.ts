/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 12:58:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 23:05:04
 */
import { SinglyLinkedList } from '../linked-list/singly.linked-list'
import {
  Hashmap,
  IKeyValueObj,
  KeyValue,
  ToHashCode,
  ToKeyStr,
  kVEqualFn,
  kVToObj,
  toKeyStrDefault,
} from './_base.hashmap'
import { loseloseHashCode } from './hash-code'

/**
 *
 * @public
 *
 * 一个链式寻址的哈希表。
 *
 * 若遇到哈希值冲突时，将会根据在链表中继续寻找。
 *
 */
export class LinkedListHashmap<K, V> implements Hashmap<K, V> {
  protected _items: Record<number, SinglyLinkedList<KeyValue<K, V>>>

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

    if (!this._items[keyStr]) {
      this._items[keyStr] = new SinglyLinkedList<KeyValue<K, V>>(kVEqualFn)
    }

    let hasUpdate = false
    const kv = new KeyValue<K, V>(key, value)
    let { headNode } = this._items[keyStr]
    while (headNode) {
      if (kVEqualFn(headNode.val, kv)) {
        headNode.val = kv
        hasUpdate = true
        break
      }

      headNode = headNode.next
    }

    if (!hasUpdate) {
      this._items[keyStr].push(kv)
      this._size += 1
    }

    return true
  }

  public get(key: K): V | undefined {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    if (!this._items[keyStr]) return undefined

    let { headNode } = this._items[keyStr]
    while (headNode) {
      if (headNode.val.key === key) return headNode.val.value
      headNode = headNode.next
    }

    return undefined
  }

  public has(key: K): boolean {
    return !!this.get(key)
  }

  public remove(key: K): boolean {
    const keyStr: number = this._toHashCode(this._toKeyStr(key))
    if (!this._items[keyStr]) return false

    const removeResult = this._items[keyStr].remove(new KeyValue<K, V>(key, null as V))
    if (removeResult) this._size -= 1
    if (this._items[keyStr].isEmpty) delete this._items[keyStr]
    return removeResult
  }

  public clear(): void {
    this._size = 0
    this._items = {}
  }

  public toString(): string {
    let str = ''

    Object.keys(this._items).forEach((key) => {
      let { headNode } = this._items[+key]
      while (headNode) {
        const headStr = this._toKeyStr(headNode.val.key)
        const s = `${headStr}: ${headNode.val.toString()}`

        str += str === '' ? s : `\n${s}`

        headNode = headNode.next
      }
    })

    return str
  }

  public toArray(): IKeyValueObj<K, V>[] {
    const array: IKeyValueObj<K, V>[] = []

    Object.keys(this._items).forEach((key) => {
      let { headNode } = this._items[+key]
      while (headNode) {
        array.push(kVToObj(headNode.val))
        headNode = headNode.next
      }
    })

    return array
  }
}
