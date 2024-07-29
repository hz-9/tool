/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:09:11
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-28 00:43:45
 */
import { Stack } from './_base.stack'

/**
 *
 * @class
 *
 *  一个基于对象实现的栈
 *
 */
export class ObjectStack<T> implements Stack<T> {
  private _items: Record<number, T>

  private _size: number

  public constructor() {
    this._items = {}
    this._size = 0
  }

  public get size(): number {
    return this._size
  }

  public get isEmpty(): boolean {
    return this.size === 0
  }

  public push(val: T): void {
    this._items[this._size] = val
    this._size += 1
  }

  public peek(): T | undefined {
    return this._items[this._size - 1]
  }

  public pop(): T | undefined {
    const a = this._items[this._size - 1]
    if (this._size > 0) this._size -= 1
    return a
  }

  public clear(): void {
    this._items = {}
    this._size = 0
  }

  public toString(): string {
    let str: string = ''
    let i = this._size - 1
    while (i >= 0) {
      str = i === this._size - 1 ? `${this._items[i]}` : `${str},${this._items[i]}`
      i -= 1
    }
    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    let i = this._size - 1
    while (i >= 0) {
      array.push(this._items[i])
      i -= 1
    }
    return array
  }
}
