/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 01:40:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-09 16:52:50
 */
import { Compare, CompareFn, EqualsFn, defaultCompare, defaultEquals } from '../_base'
import { DoublyLinkedList } from './doubly.linked-list'

/**
 *
 * @public
 *
 *  Sorted Linked List Class
 *
 *  有序链表
 *
 */
export class SortedLinkedList<T> extends DoublyLinkedList<T> {
  protected readonly _compareFn: CompareFn<T>

  public constructor(equalsFn: EqualsFn<T> = defaultEquals, compareFn: CompareFn<T> = defaultCompare) {
    super(equalsFn)
    this._compareFn = compareFn
  }

  public push(value: T): boolean {
    if (!this._tailNode) return super.push(value)

    const c = this._compareFn(this._tailNode.val, value)
    if (c === Compare.LESS_THAN) return super.push(value)
    return false
  }

  public unshift(value: T): boolean {
    if (!this._headNode) return super.unshift(value)

    const c = this._compareFn(value, this._headNode.val)
    if (c === Compare.LESS_THAN) return super.unshift(value)
    return false
  }

  public addAt(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false

    if (!this._headNode) {
      this.push(value)
      return true
    }

    if (index === 0) {
      if (this._compareFn(value, this._headNode.val) === Compare.LESS_THAN) {
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

    if (this._compareFn(prevNode.val, value) === Compare.LESS_THAN) {
      const nextNode = this.getNodeAt(index)

      if (nextNode) {
        if (this._compareFn(value, nextNode.val) === Compare.LESS_THAN) {
          return super.addAt(index, value)
        }
      } else {
        return super.addAt(index, value)
      }
    }

    return false
  }
}
