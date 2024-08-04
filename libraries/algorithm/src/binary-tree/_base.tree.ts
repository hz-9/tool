/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 20:03:20
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-04 15:33:05
 */
import { Base } from '../_base'
import type { OrderTraverseCallback } from '../types/index'
import { defaultCompare, defaultEquals } from '../utils/index'

/**
 * @class
 *
 * Tree node in a tree structure.
 *
 * 树结构中的节点。
 */
export class TreeNode<T> {
  public val: T

  public left?: TreeNode<T>

  public right?: TreeNode<T>

  public constructor(val: T, left?: TreeNode<T>, right?: TreeNode<T>) {
    this.val = val

    this.left = left

    this.right = right
  }
}

/**
 * @public
 *
 * Abstract class for trees.
 *
 * 树的抽象类。
 */
export abstract class Tree<T> implements Base<T> {
  protected _size: number

  protected _root?: TreeNode<T>

  /**
   * Function to determine if two values are equal.
   *
   * 判断两个值是否相等的函数。
   */
  protected readonly _equalsFn: (a?: T, b?: T) => boolean

  /**
   * Function to compare two values.
   *
   * 比较两个值的函数。
   */
  protected readonly _compareFn: (a: T, b: T) => number

  public constructor(
    equalsFn: typeof defaultEquals<T> = defaultEquals,
    compareFn: typeof defaultCompare<T> = defaultCompare
  ) {
    this._equalsFn = equalsFn

    this._compareFn = compareFn

    this._size = 0
  }

  public get size(): number {
    return this._size
  }

  public get isEmpty(): boolean {
    return this._size === 0
  }

  /**
   * Add an element to the tree.
   *
   * 添加一个元素到树中。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param {T} value - The value to be added.
   */
  public add(value: T): void {
    this._root = this._addNode(this._root, value)
  }

  /**
   * Add a value to a node.
   *
   * 将一个值添加到节点中。
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {T} value - The value to be added.
   */
  protected abstract _addNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> | undefined

  /**
   * Check if a value exists in the tree.
   *
   * 检查树中是否存在某个值。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param {T} value - The value to be checked.
   * @returns {boolean} - Whether the value exists.
   */
  public has(value: T): boolean {
    return this._hasNode(this._root, value)
  }

  /**
   * Check if a value exists in a node.
   *
   * 检查节点下是否存在某个值。
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {T} value - The value to be checked.
   */
  protected abstract _hasNode(node: TreeNode<T> | undefined, value: T): boolean

  /**
   * Remove an element from the tree.
   *
   * 从树中移除一个元素。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @param {T} value - The value to be removed.
   */
  public remove(value: T): void {
    this._removeNode(this._root, value)
  }

  /**
   * Remove a value from a node.
   *
   * 从节点中移除一个值。
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {T} value - The value to be removed.
   */
  protected abstract _removeNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> | undefined

  /**
   * Get the minimum value in the tree.
   *
   * 获取树中的最小值。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @returns {T | undefined} - The minimum value in the tree. Returns undefined if the tree is empty.
   */
  public get min(): T | undefined {
    return this._minNode(this._root)?.val
  }

  /**
   * Get the minimum value in a node.
   *
   * 获取节点中的最小值。
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   */
  protected abstract _minNode(node: TreeNode<T> | undefined): TreeNode<T> | undefined

  /**
   * Get the maximum value in the tree.
   *
   * 获取树中的最大值。
   *
   * Time complexity: O(log n)
   *
   * Space complexity: O(1)
   *
   * @returns {T | undefined} - The maximum value in the tree. Returns undefined if the tree is empty.
   */
  public get max(): T | undefined {
    return this._maxNode(this._root)?.val
  }

  /**
   * Get the maximum value in a node.
   *
   * 获取节点中的最大值。
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   */
  protected abstract _maxNode(node: TreeNode<T> | undefined): TreeNode<T> | undefined

  /**
   * Traverse all nodes in the tree using in-order traversal.
   *
   * 使用中序遍历方式遍历树中的所有节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  public inOrderTraverse(callback: OrderTraverseCallback<T>): void {
    this._inOrderTraverseNode(this._root, callback)
  }

  /**
   * Traverse a node using in-order traversal.
   *
   * 使用中序遍历方式遍历节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  protected abstract _inOrderTraverseNode(node: TreeNode<T> | undefined, callback: OrderTraverseCallback<T>): void

  /**
   * Traverse all nodes in the tree using pre-order traversal.
   *
   * 使用先序遍历方式遍历树中的所有节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  public preOrderTraverse(callback: OrderTraverseCallback<T>): void {
    this._preOrderTraverseNode(this._root, callback)
  }

  /**
   * Traverse a node using pre-order traversal.
   *
   * 使用先序遍历方式遍历节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  protected abstract _preOrderTraverseNode(node: TreeNode<T> | undefined, callback: OrderTraverseCallback<T>): void

  /**
   * Traverse all nodes in the tree using post-order traversal.
   *
   * 使用后序遍历方式遍历树中的所有节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  public postOrderTraverse(callback: OrderTraverseCallback<T>): void {
    this._postOrderTraverseNode(this._root, callback)
  }

  /**
   * Traverse a node using post-order traversal.
   *
   * 使用后序遍历方式遍历节点。
   *
   * Time complexity: O(n)
   *
   * Space complexity: O(1)
   *
   * @param {TreeNode<T> | undefined} node - The base node.
   * @param {OrderTraverseCallback<T>} callback - The callback function for traversal.
   */
  protected abstract _postOrderTraverseNode(node: TreeNode<T> | undefined, callback: OrderTraverseCallback<T>): void

  /**
   * Clear the tree.
   *
   * 清除树结构。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   */
  public clear(): void {
    this._root = undefined
    this._size = 0
  }

  public toString(): string {
    let str: string = ''

    this.inOrderTraverse((val) => {
      str += str === '' ? `${val}` : `,${val}`
    })

    return str
  }

  public toArray(): T[] {
    const result: T[] = []

    this.inOrderTraverse((val) => {
      result.push(val)
    })

    return result
  }
}
