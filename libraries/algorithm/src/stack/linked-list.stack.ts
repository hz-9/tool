/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:09:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-28 00:37:37
 */
import { SinglyLinkedList } from '../linked-list/singly.linked-list'
import { Stack } from './_base.stack'

/**
 *
 * @class
 *
 *  一个基于链表实现的栈
 *
 */
export class LinkedListStack<T> extends Stack<T> {
  private _linkList: SinglyLinkedList<T>

  public constructor() {
    super()
    this._linkList = new SinglyLinkedList<T>()
  }

  public get size(): number {
    return this._linkList.size
  }

  public get isEmpty(): boolean {
    return this._linkList.isEmpty
  }

  public push(val: T): void {
    this._linkList.push(val)
  }

  public peek(): T | undefined {
    return this._linkList.tail
  }

  public pop(): T | undefined {
    return this._linkList.pop()
  }

  public clear(): void {
    this._linkList.clear()
  }

  public toString(): string {
    let str: string = ''

    let currentNode = this._linkList.headNode
    while (currentNode) {
      str = currentNode === this._linkList.headNode ? `${currentNode.val}` : `${currentNode.val},${str}`
      currentNode = currentNode.next
    }

    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    let currentNode = this._linkList.headNode
    while (currentNode) {
      array.unshift(currentNode.val)
      currentNode = currentNode.next
    }
    return array
  }
}
