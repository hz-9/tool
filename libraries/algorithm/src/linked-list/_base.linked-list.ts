/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 15:18:52
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 20:20:49
 */
import { Base } from '../_base/index'
import { defaultEquals } from '../utils/index'

/**
 * @public
 *
 * Linked List Node Base Class
 *
 * 链表节点基类
 */
export class LinkedListNode<T> {
  /**
   * Node value
   *
   * 节点信息
   */
  public val: T

  /**
   * Next node
   *
   * 下一个节点
   */
  public next: LinkedListNode<T> | undefined

  public constructor(val: T, next?: LinkedListNode<T>) {
    this.val = val
    this.next = next
  }
}

/**
 * @public
 *
 * Linked List Base Class
 *
 * 链表基类
 */
export abstract class LinkedList<T, N extends LinkedListNode<T> = LinkedListNode<T>> implements Base<T> {
  /**
   * Head node of the linked list
   *
   * 链表的头部节点
   */
  protected _headNode: N | undefined

  /**
   * Tail node of the linked list
   *
   * 链表的尾部节点
   */
  protected _tailNode: N | undefined

  /**
   * Number of nodes in the linked list
   *
   * 链表节点数量
   */
  protected _size: number

  /**
   * Equality comparison function
   *
   * 相等判断函数
   */
  protected readonly _equalsFn: (a?: T, b?: T) => boolean

  public constructor(equalsFn: typeof defaultEquals<T> = defaultEquals) {
    this._headNode = undefined
    this._tailNode = undefined
    this._size = 0
    this._equalsFn = equalsFn
  }

  public get size(): number {
    return this._size
  }

  public get isEmpty(): boolean {
    return this.size === 0
  }

  /**
   * Head node
   *
   * 头部节点
   */
  public get headNode(): N | undefined {
    return this._headNode
  }

  /**
   * Tail node
   *
   * 尾部节点
   */
  public get tailNode(): N | undefined {
    return this._tailNode
  }

  /**
   * First value
   *
   * 第一个值
   */
  public get head(): T | undefined {
    return this._headNode?.val
  }

  /**
   * Last value
   *
   * 最后一个值
   */
  public get tail(): T | undefined {
    return this._tailNode?.val
  }

  /**
   * Add a new element to the end of the linked list.
   *
   * 在链尾添加一个新元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element to be added
   *
   * @returns Whether the addition was successful
   */
  public abstract push(value: T): boolean

  /**
   * Remove a node from the end of the linked list and return it.
   *
   * 在链尾删除一个节点，并返回该节点。
   *
   * Time Complexity: O(1) (O(n) for `SinglyLinkedList`, O(1) for `DoublyLinkedListNode`)
   *
   * Space Complexity: O(1)
   *
   * @returns The removed node, or undefined if the list is empty
   */
  public abstract popNode(): N | undefined

  /**
   * Remove an element from the end of the linked list and return it.
   *
   * 在链尾删除一个新元素，并返回该元素。
   *
   * Time Complexity: O(1) (O(n) for `SinglyLinkedList`, O(1) for `DoublyLinkedListNode`)
   *
   * Space Complexity: O(1)
   *
   * @returns The removed element, or undefined if the list is empty
   */
  public pop(): T | undefined {
    const node = this.popNode()
    return node?.val
  }

  /**
   * Add a new element to the beginning of the linked list.
   *
   * 向链头添加一个新元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element to be added
   *
   * @returns Whether the addition was successful
   */
  public abstract unshift(value: T): boolean

  /**
   * Remove an element from the beginning of the linked list and return it.
   *
   * 在链头删除一个新元素，并返回该节点。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @returns The removed node, or undefined if the list is empty
   */
  public abstract shiftNode(): N | undefined

  /**
   * Remove an element from the beginning of the linked list and return it.
   *
   * 在链头删除一个新元素，并返回该元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @returns The removed element, or undefined if the list is empty
   */
  public shift(): T | undefined {
    const node = this.shiftNode()
    return node?.val
  }

  /**
   * Get the node at a specific position in the linked list.
   *
   * 在链表某个位置的节点。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param index - The position to query
   *
   * @returns The queried node, or undefined if not found
   */
  public getNodeAt(index: number): N | undefined {
    if (index < 0 || index > this.size) return undefined

    let current = this._headNode

    let i = 0
    while (current && i < index) {
      current = current.next as N | undefined
      i += 1
    }

    return current
  }

  /**
   * Get the element at a specific position in the linked list.
   *
   * 获取链表某个位置的元素。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param index - The position to query
   *
   * @returns The queried element, or undefined if not found
   */
  public getAt(index: number): T | undefined {
    const node = this.getNodeAt(index)
    return node?.val
  }

  /**
   * Get the position of an element in the linked list.
   *
   * 获取某元素在链的位置。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element
   *
   * @returns The position, or -1 if not found
   */
  public getIndex(value: T): number {
    let index = 0
    let current: N | undefined = this._headNode

    while (current) {
      if (this._equalsFn(current.val, value)) return index

      index += 1
      current = current.next as N | undefined
    }

    return -1
  }

  /**
   * Get the node containing a specific element in the linked list.
   *
   * 获取某元素在链的节点。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element
   *
   * @returns The node, or undefined if not found
   */
  public getNode(value: T): N | undefined {
    let current = this._headNode

    while (current) {
      if (this._equalsFn(current.val, value)) return current
      current = current.next as N | undefined
    }

    return undefined
  }

  // /**
  //  * Traverse the linked list and find a specific value.
  //  *
  //  * 遍历链表，并找到某个值。
  //  *
  //  * Time Complexity: O(n)
  //  *
  //  * Space Complexity: O(1)
  //  *
  //  * @param value - The element
  //  *
  //  * @returns The value, or undefined if not found
  //  */
  // public find(callback: FindCallback<T>): T | undefined {
  //   let current: N | undefined = this._headNode

  //   while (current) {
  //     const result = callback(current.val)
  //     if (result) return current.val
  //     current = current.next as N | undefined
  //   }

  //   return undefined
  // }

  /**
   * Add a new element at a specific position in the linked list.
   *
   * 在链表某个位置添加元素。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param index - The position to add at.
   * @param value - The element to be added
   *
   * @returns Whether the addition was successful
   */
  public abstract addAt(index: number, value: T): boolean

  /**
   * Remove a node at a specific position in the linked list.
   *
   * 删除链表某个位置节点。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param index - The position to remove
   *
   * @returns Whether the removal was successful
   */
  public abstract removeAt(index: number): boolean

  /**
   * Remove a specific element from the linked list.
   *
   * 删除某个元素。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element
   *
   * @returns Whether the removal was successful
   */
  public abstract remove(value: T): boolean

  public clear(): void {
    this._headNode = undefined
    this._tailNode = undefined
    this._size = 0
  }

  public toString(): string {
    if (!this._headNode) return ''

    let current = this._headNode
    let str = `${current.val}`
    while (current.next) {
      current = current.next as N
      str = `${str},${current.val}`
    }

    return str
  }

  public toArray(): T[] {
    const array: T[] = []
    let currentNode = this.headNode
    while (currentNode) {
      array.push(currentNode.val)
      currentNode = currentNode.next as N
    }
    return array
  }
}
