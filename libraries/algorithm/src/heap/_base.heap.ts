/**
 * @Author       : Chen Zhen
 * @Date         : 2024-04-01 00:51:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-09 16:54:04
 */
import { Base, CompareFn, defaultCompare } from '../_base'

/**
 * @public
 *
 * Base class for MaxHeap and MinHeap.
 *
 * 最大堆、最小堆的基类。
 */
export abstract class Heap<T> implements Base<T> {
  protected _size: number

  protected _list: Array<T>

  protected readonly _compareFn: CompareFn<T>

  public constructor(compareFn: CompareFn<T> = defaultCompare) {
    this._compareFn = compareFn

    this._list = []

    this._size = 0
  }

  public get size(): number {
    return this._size
  }

  public get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Insert a value into the heap. Returns true if successful, false otherwise.
   *
   * 在堆中插入一个值。如果插入成功，则返回 true，否则返回 false。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param value - The value to be inserted.
   */
  public add(value: T): boolean {
    this._list.push(value)
    this.siftUp(this._list.length - 1)

    this._size += 1
    return true
  }

  /**
   * Remove and return the maximum or minimum value of the heap.
   *
   * 移除这个堆的最大值或最小值，并返回。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The maximum or minimum value of the heap.
   */
  public pop(): T | undefined {
    const first = this._list[0]

    if (this._list.length > 0) {
      this._list[0] = this._list.pop()!
      this._size -= 1
      this.siftDown(0)
    }

    return first
  }

  /**
   * Return the maximum or minimum value of the heap.
   *
   * 返回这个堆的最大值或最小值。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The maximum or minimum value of the heap.
   */
  public peek(): T | undefined {
    return this._list[0]
  }

  /**
   * Perform the sift-up operation.
   *
   * 上移操作。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param index - The index of the element to be moved.
   */
  protected abstract siftUp(index: number): void

  /**
   * Perform the sift-down operation.
   *
   * 下移操作。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param index - The index of the element to be moved.
   */
  protected abstract siftDown(index: number): void

  /**
   * Swap the values at two positions.
   *
   * 交换两个位置的数值。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param a - The index of the first position.
   * @param b - The index of the second position.
   */
  protected swap(a: number, b: number): void {
    const x = this._list[a]
    const y = this._list[b]
    this._list[a] = y
    this._list[b] = x
  }

  /**
   * Get the index of the left child node.
   *
   * 获取节点左支的位置。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param index - The index of the node.
   * @returns The index of the left child node.
   */
  protected getLeftIndex(index: number): number {
    return index * 2 + 1
  }

  /**
   * Get the index of the right child node.
   *
   * 获取节点右支的位置。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param index - The index of the node.
   * @returns The index of the right child node.
   */
  protected getRightIndex(index: number): number {
    return index * 2 + 2
  }

  /**
   * Get the index of the parent node.
   *
   * 获取节点父节点的位置。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param index - The index of the node.
   * @returns The index of the parent node.
   */
  protected getParentIndex(index: number): number | undefined {
    if (index === 0) return undefined
    return Math.floor((index - 1) / 2)
  }

  /**
   * Clear the heap.
   *
   * 清空堆。
   *
   * ime complexity: O(1)
   *
   * Space complexity: O(1)
   */
  public clear(): void {
    this._list = []
    this._size = 0
  }

  public toString(): string {
    let str = ''
    this._list.forEach((i) => {
      if (i !== undefined) str += str === '' ? `${i}` : `,${i}`
    })
    return str
  }

  public toArray(): Array<T> {
    return this._list.filter((i) => i !== undefined)
  }
}
