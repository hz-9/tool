/**
 * @Author       : Chen Zhen
 * @Date         : 2024-04-01 00:20:20
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-09 11:35:20
 */
import { Compare } from '../_base'
import { TreeNode } from './_base.tree'
import { BinarySearchTree } from './binary-search.tree'

const enum BalanceFactor {
  /**
   * Right imbalance.
   * The depth on the right side is 2 more than the depth on the left side.
   *
   * 右侧失衡。
   * 右侧深度比左侧深度多 2。
   */
  UNBALANCED_RIGHT,

  /**
   * Right imbalance.
   * The depth on the right side is 1 more than the depth on the left side.
   *
   * 右侧失衡。
   * 右侧深度比左侧深度多 1。
   */
  SLIGHTLY_UNBALANCED_RIGHT,

  /**
   * Balanced.
   *
   * 相等。
   */
  BALANCED,

  /**
   * Left imbalance.
   * The depth on the left side is 1 more than the depth on the right side.
   *
   * 左侧失衡。
   * 左侧深度比右侧深度多 1。
   */
  SLIGHTLY_UNBALANCED_LEFT,

  /**
   * Left imbalance.
   * The depth on the left side is 2 more than the depth on the right side.
   *
   * 左侧失衡。
   * 左侧深度比右侧深度多 2。
   */
  UNBALANCED_LEFT,
}

/* eslint-disable no-param-reassign */

/**
 * @public
 *
 * Self-balancing tree.
 *
 * 自平衡树。
 */
export class AdelsonVelskiiLandiTree<T> extends BinarySearchTree<T> {
  protected _addNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> {
    if (!node) {
      this._size += 1
      return new TreeNode(value)
    }

    const compareResult = this._compareFn(value, node.val)
    if (compareResult === Compare.EQUALS) return node

    if (compareResult === Compare.LESS_THAN) {
      node.left = this._addNode(node.left, value)
    } else if (compareResult === Compare.BIGGER_THAN) {
      node.right = this._addNode(node.right, value)
    }

    const balanceFactor = this._getBalanceFactor(node)

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this._compareFn(value, node.left!.val) === Compare.LESS_THAN) {
        return this._rotationLL(node)
      }
      return this._rotationLR(node)
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this._compareFn(value, node.right!.val) === Compare.BIGGER_THAN) {
        return this._rotationRR(node)
      }

      return this._rotationRL(node)
    }
    return node
  }

  protected _removeNode(node: TreeNode<T> | undefined, value: T): TreeNode<T> | undefined {
    node = super._removeNode(node, value)
    if (!node) return undefined

    const balanceFactor = this._getBalanceFactor(node)
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this._getBalanceFactor(node.left!)
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this._rotationLL(node)
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this._rotationLR(node.left!)
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this._getBalanceFactor(node.right!)
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this._rotationRR(node)
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this._rotationRL(node.right!)
      }
    }
    return node
  }

  /**
   * Get the height of a node.
   *
   * 获取节点高度。
   *
   * @param node - The node.
   *
   * @returns The height of the node. If the node is missing, it returns -1.
   *
   */
  protected _getNodeHeight(node: TreeNode<T> | undefined): number {
    if (!node) return -1
    return Math.max(this._getNodeHeight(node.left), this._getNodeHeight(node.right)) + 1
  }

  /**
   * Get the height difference of a node.
   *
   * 获取节点高度差距。
   *
   * @param node - The node.
   *
   * @returns The height difference. Usually one of the five integers: -2, -1, 0, 1, 2.
   */
  protected _getBalanceFactor(node: TreeNode<T>): BalanceFactor {
    const diff = this._getNodeHeight(node.left) - this._getNodeHeight(node.right)

    switch (diff) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  /**
   * Left rotation. (Left - Left)
   *
   * 向右的单旋转。（左 - 左）
   *
   * ```
   *         3               2
   *        /               / \
   *       2        =>     1   3
   *     /
   *    1
   * ```
   *
   * @param node - The node.
   * @returns The rotated node.
   */
  protected _rotationLL(node: TreeNode<T>): TreeNode<T> {
    const tmp: TreeNode<T> = node.left!
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  /**
   * Right rotation. (Right - Right)
   *
   * 向左的单旋转。（右 - 右）
   *
   * ```
   *    1               2
   *     \             / \
   *      2     =>    1   3
   *       \
   *        3
   * ```
   *
   * @param node - The node.
   * @returns The rotated node.
   */
  protected _rotationRR(node: TreeNode<T>): TreeNode<T> {
    const tmp: TreeNode<T> = node.right!
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  /**
   * Left-Right rotation. (Left - Right)
   *
   * 向左的单旋转。（左 - 右）
   *
   * ```
   *        3                          3                          2
   *       / \                        / \                        / \
   *     1    c4   rotateLeft(1)     2   c4  rotateRight(3)    1     3
   *    / \            =>           / \           =>          / \   / \
   *  c1   2                       1  c3                    c1  c2 c3 c4
   *      / \                     / \
   *    c2  c3                   c1 c2
   * ```
   *
   * @param node - The node.
   * @returns The rotated node.
   */
  protected _rotationLR(node: TreeNode<T>): TreeNode<T> {
    node.left = this._rotationRR(node.left!)
    return this._rotationLL(node)
  }

  /**
   * Right-Left rotation. (Right - Left)
   *
   * 向右的单旋转。（右 - 左）
   *
   * ```
   *
   *        1                         1                          2
   *       / \                       / \                        / \
   *     c1   3    rotateRight(3)   c1  2     rotateLeft(2)   1    3
   *         / \       =>              / \         =>        / \  / \
   *        2   c4                    c2  3                 c1 c2 c3 c4
   *       / \                           / \
   *      c2 c3                         c3 c4
   * ```
   *
   * @param node - The node.
   * @returns The rotated node.
   */
  protected _rotationRL(node: TreeNode<T>): TreeNode<T> {
    node.right = this._rotationLL(node.right!)
    return this._rotationRR(node)
  }
}
