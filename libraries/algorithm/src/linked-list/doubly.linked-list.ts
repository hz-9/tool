/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 01:40:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 01:58:16
 */
import { LinkedList, LinkedListNode } from './_base.linked-list'

/**
 *
 * @public
 *
 *  双向链表节点
 *
 */
export class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  /**
   * 上一个节点。
   */
  public prev: DoublyLinkedListNode<T> | undefined

  public next: DoublyLinkedListNode<T> | undefined

  public constructor(val: T) {
    super(val)

    this.prev = undefined
    this.next = undefined
  }
}

/**
 *
 * @public
 *
 *  双向链表
 *
 */
export class DoublyLinkedList<T> extends LinkedList<T, DoublyLinkedListNode<T>> {
  public push(value: T): boolean {
    const node = new DoublyLinkedListNode(value)

    if (!this._tailNode) {
      this._headNode = node
      this._tailNode = node
    } else {
      this._tailNode.next = node
      node.prev = this._tailNode

      this._tailNode = node
    }

    this._size += 1

    return true
  }

  public popNode(): DoublyLinkedListNode<T> | undefined {
    if (!this._tailNode || !this._headNode) return undefined

    const temp: DoublyLinkedListNode<T> = this._tailNode

    if (!temp.prev) {
      this._headNode = undefined
      this._tailNode = undefined
    } else {
      this._tailNode = temp.prev

      this._tailNode.next = undefined
    }

    temp.prev = undefined
    temp.next = undefined

    this._size -= 1
    return temp
  }

  public unshift(value: T): boolean {
    const node = new DoublyLinkedListNode<T>(value)

    if (!this._headNode) {
      this._headNode = node
      this._tailNode = node
    } else {
      node.next = this._headNode
      this._headNode.prev = node

      this._headNode = node
    }

    this._size += 1

    return true
  }

  public shiftNode(): DoublyLinkedListNode<T> | undefined {
    if (!this._tailNode || !this._headNode) return undefined

    const temp: DoublyLinkedListNode<T> = this._headNode

    if (!temp.next) {
      this._headNode = undefined
      this._tailNode = undefined
    } else {
      this._headNode = temp.next
      this._headNode.prev = undefined
    }

    temp.prev = undefined
    temp.next = undefined

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

    const prevNode = this.getNodeAt(index - 1)
    if (!prevNode) return false

    const node = new DoublyLinkedListNode<T>(value)
    node.next = prevNode.next
    node.prev = prevNode

    prevNode.next = node
    if (node.next) node.next.prev = node

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

    const currentNode = this.getNodeAt(index)
    if (!currentNode) return false

    if (currentNode.prev) currentNode.prev.next = currentNode.next
    if (currentNode.next) currentNode.next.prev = currentNode.prev

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

    const currentNode = this.getNode(value)
    if (!currentNode) return false

    if (currentNode.prev) currentNode.prev.next = currentNode.next
    if (currentNode.next) currentNode.next.prev = currentNode.prev

    this._size -= 1
    return true
  }
}
