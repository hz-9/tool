/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:09:11
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-28 00:43:52
 */
import { Stack } from './_base.stack'

/**
 *
 * @class
 *
 *  一个基于数组实现的栈
 *
 */
export class ArrayStack<T> implements Stack<T> {
  private _list: Array<T>

  public constructor() {
    this._list = []
  }

  public get size(): number {
    return this._list.length
  }

  public get isEmpty(): boolean {
    return this.size === 0
  }

  public push(val: T): void {
    this._list.push(val)
  }

  public peek(): T | undefined {
    return this._list[this._list.length - 1]
  }

  public pop(): T | undefined {
    const a = this._list[this._list.length - 1]
    this._list.pop()
    return a
  }

  public clear(): void {
    this._list = []
  }

  public toString(): string {
    let str: string = ''
    this._list.forEach((item, index) => {
      str = index === 0 ? `${item}` : `${item},${str}`
    })
    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    this._list.forEach((item) => {
      array.unshift(item)
    })
    return array
  }
}
