/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:09:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 18:18:24
 */
import { SinglyLinkedList } from '../linked-list/singly.linked-list'
import { Stack } from './_base.stack'

/**
 *
 * @public
 *
 *  A stack implementation based on SinglyLinkedList.
 *
 *  一个基于数组实现的栈。
 *
 */
export class LinkedListStack<T> implements Stack<T> {
  private _linkedList: SinglyLinkedList<T>

  public constructor() {
    this._linkedList = new SinglyLinkedList<T>()
  }

  public get size(): number {
    return this._linkedList.size
  }

  public get isEmpty(): boolean {
    return this._linkedList.isEmpty
  }

  public push(val: T): void {
    this._linkedList.push(val)
  }

  public peek(): T | undefined {
    return this._linkedList.tail
  }

  public pop(): T | undefined {
    return this._linkedList.pop()
  }

  public clear(): void {
    this._linkedList.clear()
  }

  public toString(): string {
    let str: string = ''

    let currentNode = this._linkedList.headNode
    while (currentNode) {
      str = currentNode === this._linkedList.headNode ? `${currentNode.val}` : `${currentNode.val},${str}`
      currentNode = currentNode.next
    }

    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    let currentNode = this._linkedList.headNode
    while (currentNode) {
      array.unshift(currentNode.val)
      currentNode = currentNode.next
    }
    return array
  }
}
