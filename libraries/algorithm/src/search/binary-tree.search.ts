/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:22:24
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 17:59:40
 */
import { CompareFn, defaultCompare } from '../_base'
import { AdelsonVelskiiLandiTree, BinarySearchTree, RedBlackTree } from '../binary-tree/index'

type UnionTree<T> = BinarySearchTree<T> | AdelsonVelskiiLandiTree<T> | RedBlackTree<T>

const treeSearchBase = <T>(
  list: Array<T>,
  value: T,
  compareFn: CompareFn<T>,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Tree: new () => UnionTree<T>
): number => {
  interface ITreeItem {
    val: T
    index: number
  }
  const compareFnWrap: CompareFn<ITreeItem> = (a, b) => compareFn(a.val, b.val)
  const tree = new BinarySearchTree<ITreeItem>(compareFnWrap)
  list.forEach((val, index) => tree.add({ val, index }))
  return tree.get({ val: value, index: 0 })?.index ?? -1
}

/**
 * @public
 *
 *  Sequential search algorithm.(BinarySearchTree)
 *  Input parameters do not need to be sorted.
 *
 *  线性搜索算法。(二叉搜索树)
 *  传入参数必须已经进行从小到大排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const binaryTreeSearch = <T>(list: Array<T>, value: T, compareFn: CompareFn<T> = defaultCompare): number =>
  treeSearchBase(list, value, compareFn, BinarySearchTree)

/**
 * @public
 *
 *  Sequential search algorithm.(AdelsonVelskiiLandiTree)
 *  Input parameters do not need to be sorted.
 *
 *  线性搜索算法。(自平衡树)
 *  传入参数必须已经进行从小到大排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const adelsonVelskiiLandiTreeSearch = <T>(
  list: Array<T>,
  value: T,
  compareFn: CompareFn<T> = defaultCompare
): number => treeSearchBase(list, value, compareFn, AdelsonVelskiiLandiTree)

/**
 * @public
 *
 *  Sequential search algorithm.(RedBlackTree)
 *  Input parameters do not need to be sorted.
 *
 *  线性搜索算法。(红黑树)
 *  传入参数必须已经进行从小到大排序。
 *
 * @param list - The list to search.
 * @param value - The value to search for.
 * @param compareFn - The compare function.
 * @returns - The index of the value in the list. If the value is not found, return -1.
 */
export const redBlackTreeSearch = <T>(list: Array<T>, value: T, compareFn: CompareFn<T> = defaultCompare): number =>
  treeSearchBase(list, value, compareFn, RedBlackTree)
