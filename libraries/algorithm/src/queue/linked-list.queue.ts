/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:05:19
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:12:09
 */
import { SinglyLinkedList } from '../linked-list/singly.linked-list'
import { Queue } from './_base.queue'

/**
 *
 * @class
 *
 *  一个基于链表（单向链表）的单向队列。
 *
 */
export class LinkedListQueue<T> implements Queue<T> {
  protected _linkedList: SinglyLinkedList<T>

  public constructor() {
    this._linkedList = new SinglyLinkedList<T>()
  }

  public get size(): number {
    return this._linkedList.size
  }

  public get isEmpty(): boolean {
    return this._linkedList.isEmpty
  }

  public get first(): T | undefined {
    return this._linkedList.head
  }

  public get last(): T | undefined {
    return this._linkedList.tail
  }

  public push(value: T): void {
    this._linkedList.push(value)
  }

  public peek(): T | undefined {
    return this.first
  }

  public shift(): T | undefined {
    return this._linkedList.shift()
  }

  public clear(): void {
    this._linkedList.clear()
  }

  public toString(): string {
    let str: string = ''

    let currentNode = this._linkedList.headNode
    while (currentNode) {
      str = currentNode === this._linkedList.headNode ? `${currentNode.val}` : `${str},${currentNode.val}`
      currentNode = currentNode.next
    }

    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    let currentNode = this._linkedList.headNode
    while (currentNode) {
      array.push(currentNode.val)
      currentNode = currentNode.next
    }
    return array
  }
}
