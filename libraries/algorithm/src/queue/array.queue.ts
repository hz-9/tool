/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:05:19
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:12:05
 */
import { Queue } from './_base.queue'

/**
 *
 * @class
 *
 *  一个基于数组的单向队列。
 *
 */
export class ArrayQueue<T> implements Queue<T> {
  protected _list: Array<T>

  public constructor() {
    this._list = []
  }

  public get size(): number {
    return this._list.length
  }

  public get isEmpty(): boolean {
    return this._list.length === 0
  }

  public get first(): T | undefined {
    return this._list[0]
  }

  public get last(): T | undefined {
    return this._list[this._list.length - 1]
  }

  public push(value: T): void {
    this._list.push(value)
  }

  public peek(): T | undefined {
    return this.first
  }

  public shift(): T | undefined {
    return this._list.shift()
  }

  public clear(): void {
    this._list = []
  }

  public toString(): string {
    let str: string = ''
    this._list.forEach((item, index) => {
      str = index === 0 ? `${item}` : `${str},${item}`
    })
    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    this._list.forEach((item) => {
      array.push(item)
    })
    return array
  }
}
