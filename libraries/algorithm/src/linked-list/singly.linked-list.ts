/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 01:40:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 17:24:00
 */
import { LinkedList, LinkedListNode } from './_base.linked-list'

/**
 *
 * @public
 *
 *  Singly Linked List Node Class
 *
 *  单向链表节点
 *
 */
export class SinglyLinkedListNode<T> extends LinkedListNode<T> {}

/**
 *
 * @public
 *
 *  Singly Linked List Class
 *
 *  单向链表
 *
 */
export class SinglyLinkedList<T> extends LinkedList<T, SinglyLinkedListNode<T>> {
  public push(value: T): boolean {
    const node = new SinglyLinkedListNode(value)

    if (!this._tailNode) {
      this._headNode = node
      this._tailNode = node
    } else {
      this._tailNode.next = node
      this._tailNode = node
    }

    this._size += 1

    return true
  }

  public popNode(): SinglyLinkedListNode<T> | undefined {
    if (!this._tailNode || !this._headNode) return undefined

    // eslint-disable-next-line no-undef-init
    let temp: SinglyLinkedListNode<T> | undefined = undefined
    let current: SinglyLinkedListNode<T> = this._headNode

    if (!current.next) {
      temp = this._headNode
      this._headNode = undefined
      this._tailNode = undefined
    } else {
      while (current.next!.next) {
        current = current.next!
      }

      temp = current.next
      current.next = undefined
      this._tailNode = current
    }

    this._size -= 1
    return temp
  }

  public unshift(value: T): boolean {
    const node = new SinglyLinkedListNode(value)

    if (!this._headNode) {
      this._headNode = node
      this._tailNode = node
    } else {
      node.next = this._headNode
      this._headNode = node
    }

    this._size += 1

    return true
  }

  public shiftNode(): SinglyLinkedListNode<T> | undefined {
    if (!this._tailNode || !this._headNode) return undefined

    const temp: SinglyLinkedListNode<T> | undefined = this._headNode

    if (!temp.next) {
      this._headNode = undefined
      this._tailNode = undefined
    } else {
      this._headNode = temp.next
    }

    this._size -= 1
    return temp
  }

  public addAt(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false

    if (this.size === 0) {
      this.push(value)
      return true
    }

    if (index === 0) {
      this.unshift(value)
      return true
    }

    /**
     * If `index` is an illegal value, false is already returned above
     */
    const prevNode = this.getNodeAt(index - 1)!
    // if (!prevNode) return false

    const node = new SinglyLinkedListNode<T>(value)
    node.next = prevNode.next

    prevNode.next = node
    this._size += 1

    return true
  }

  public removeAt(index: number): boolean {
    if (index < 0 || index > this.size) return false

    if (index === 0) {
      this.shiftNode()
      return true
    }

    if (index === this.size - 1) {
      this.popNode()
      return true
    }

    /**
     * If `index` is an illegal value, false is already returned above
     */
    const prevNode = this.getNodeAt(index - 1)!
    // if (!prevNode) return false

    prevNode.next = prevNode.next?.next

    this._size -= 1

    return true
  }

  public remove(value: T): boolean {
    if (this._equalsFn(this.head, value)) {
      this.shiftNode()
      return true
    }

    if (this._equalsFn(this.tail, value)) {
      this.popNode()
      return true
    }

    let prev = this._headNode

    while (prev && prev.next) {
      if (this._equalsFn(prev.next.val, value)) {
        const beDeleted = prev.next
        prev.next = prev.next.next
        beDeleted.next = undefined
        this._size -= 1
        return true
      }

      prev = prev.next
    }

    return false
  }
}
