/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:05:19
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:11:50
 */
import { Deque } from './_base.deque'
import { ArrayQueue } from './array.queue'

/**
 *
 * @class
 *
 *  一个基于数组的双向队列。
 *
 */
export class ArrayDeque<T> extends ArrayQueue<T> implements Deque<T> {
  public unshift(value: T): void {
    this._list.unshift(value)
  }

  public pop(): T | undefined {
    return this._list.pop()
  }

  public peekFront(): T | undefined {
    return this.first
  }

  public peekBack(): T | undefined {
    return this.last
  }
}
