/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 01:40:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 17:29:14
 */
import { defaultCompare, defaultEquals } from '../utils/index'
import { DoublyLinkedList } from './doubly.linked-list'

/**
 *
 * @public
 *
 *  Sorted Linked List Class
 *
 */
export class SortedLinkedList<T> extends DoublyLinkedList<T> {
  /**
   * 相等判断函数
   */
  protected readonly _compareFn: (a: T, b: T) => number

  public constructor(
    equalsFn: typeof defaultEquals<T> = defaultEquals,
    compareFn: typeof defaultCompare<T> = defaultCompare
  ) {
    super(equalsFn)
    this._compareFn = compareFn
  }

  public push(value: T): boolean {
    if (!this._tailNode) return super.push(value)

    const c = this._compareFn(this._tailNode.val, value)
    if (c > 0) return super.push(value)
    return false
  }

  public unshift(value: T): boolean {
    if (!this._headNode) return super.unshift(value)

    const c = this._compareFn(value, this._headNode.val)
    if (c > 0) return super.unshift(value)
    return false
  }

  public addAt(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false

    if (!this._headNode) {
      this.push(value)
      return true
    }

    if (index === 0) {
      if (this._compareFn(value, this._headNode.val) > 0) {
        this.unshift(value)
        return true
      }
      return false
    }

    /**
     * If `index` is an illegal value, false is already returned above
     */
    const prevNode = this.getNodeAt(index - 1)!
    // if (!prevNode) return false

    if (this._compareFn(prevNode.val, value) > 0) {
      const nextNode = this.getNodeAt(index)

      if (nextNode) {
        if (this._compareFn(value, nextNode.val) > 0) {
          return super.addAt(index, value)
        }
      } else {
        return super.addAt(index, value)
      }
    }

    return false
  }
}
