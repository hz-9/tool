/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-04 12:11:25
 * @LastEditors  : Chen Zhen
 */
import { BinarySearchTree } from '../index'

type UnionTree = BinarySearchTree<number>

type GetTree = () => UnionTree

interface ITreeInfo {
  size: number
  isEmpty: boolean
  min: number | undefined
  max: number | undefined
  preOrderTraverse: number[]
  inOrderTraverse: number[]
  postOrderTraverse: number[]
  toString: string
  toArray: number[]
  // toArray: KeyValue<number, string>[]
}

const getHashmapInfo = (tree: UnionTree): ITreeInfo => {
  const preOrderTraverseResult: number[] = []
  const inOrderTraverseResult: number[] = []
  const postOrderTraverseResult: number[] = []

  tree.inOrderTraverse((val) => {
    inOrderTraverseResult.push(val)
  })

  tree.preOrderTraverse((val) => {
    preOrderTraverseResult.push(val)
  })

  tree.postOrderTraverse((val) => {
    postOrderTraverseResult.push(val)
  })

  return {
    size: tree.size,
    isEmpty: tree.isEmpty,
    min: tree.min,
    max: tree.max,
    preOrderTraverse: preOrderTraverseResult,
    inOrderTraverse: inOrderTraverseResult,
    postOrderTraverse: postOrderTraverseResult,
    toString: tree.toString(),
    toArray: tree.toArray(),
  }
}

describe.each([() => new BinarySearchTree<number>()])('BinaryTree - %s', (getTree: GetTree) => {
  const tree = getTree()

  it('BinaryTree - add', async () => {
    expect(getHashmapInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
      preOrderTraverse: [],
      inOrderTraverse: [],
      postOrderTraverse: [],
      toString: '',
      toArray: [],
    })

    tree.add(11)
    tree.add(7)
    tree.add(15)
    tree.add(5)
    tree.add(3)
    tree.add(9)
    tree.add(8)
    tree.add(10)
    tree.add(13)
    tree.add(12)
    tree.add(14)
    tree.add(20)
    tree.add(18)
    tree.add(25)
    tree.add(6)

    expect(getHashmapInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
      inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
      toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
      toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    })

    // Duplicate addition, will not cause any impact
    tree.add(14)
    tree.add(20)
    tree.add(18)
    tree.add(25)
    tree.add(6)

    expect(getHashmapInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
      inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
      toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
      toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    })
  })

  it('BinaryTree - has', async () => {
    expect(tree.has(11)).toBe(true)
    expect(tree.has(12)).toBe(true)
    expect(tree.has(3)).toBe(true)
    expect(tree.has(100000)).toBe(false)
    expect(tree.has(-1)).toBe(false)

    expect(getHashmapInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
      inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
      toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
      toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    })
  })

  it('BinaryTree - remove', async () => {
    tree.remove(6)
    tree.remove(6)
    tree.remove(6)

    expect(getHashmapInfo(tree)).toEqual({
      size: 14,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 5, 3, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
      inOrderTraverse: [3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      postOrderTraverse: [3, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
      toString: '3,5,7,8,9,10,11,12,13,14,15,18,20,25',
      toArray: [3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    })

    tree.remove(5)

    expect(getHashmapInfo(tree)).toEqual({
      size: 13,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 3, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
      inOrderTraverse: [3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      postOrderTraverse: [3, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
      toString: '3,7,8,9,10,11,12,13,14,15,18,20,25',
      toArray: [3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    })

    tree.remove(15)

    expect(getHashmapInfo(tree)).toEqual({
      size: 12,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 3, 9, 8, 10, 18, 13, 12, 14, 20, 25],
      inOrderTraverse: [3, 7, 8, 9, 10, 11, 12, 13, 14, 18, 20, 25],
      postOrderTraverse: [3, 8, 10, 9, 7, 12, 14, 13, 25, 20, 18, 11],
      toString: '3,7,8,9,10,11,12,13,14,18,20,25',
      toArray: [3, 7, 8, 9, 10, 11, 12, 13, 14, 18, 20, 25],
    })

    tree.remove(8)

    expect(getHashmapInfo(tree)).toEqual({
      size: 11,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 3, 9, 10, 18, 13, 12, 14, 20, 25],
      inOrderTraverse: [3, 7, 9, 10, 11, 12, 13, 14, 18, 20, 25],
      postOrderTraverse: [3, 10, 9, 7, 12, 14, 13, 25, 20, 18, 11],
      toString: '3,7,9,10,11,12,13,14,18,20,25',
      toArray: [3, 7, 9, 10, 11, 12, 13, 14, 18, 20, 25],
    })

    tree.remove(9)

    expect(getHashmapInfo(tree)).toEqual({
      size: 10,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 3, 10, 18, 13, 12, 14, 20, 25],
      inOrderTraverse: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
      postOrderTraverse: [3, 10, 7, 12, 14, 13, 25, 20, 18, 11],
      toString: '3,7,10,11,12,13,14,18,20,25',
      toArray: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
    })

    tree.remove(-1)

    expect(getHashmapInfo(tree)).toEqual({
      size: 10,
      isEmpty: false,
      min: 3,
      max: 25,
      preOrderTraverse: [11, 7, 3, 10, 18, 13, 12, 14, 20, 25],
      inOrderTraverse: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
      postOrderTraverse: [3, 10, 7, 12, 14, 13, 25, 20, 18, 11],
      toString: '3,7,10,11,12,13,14,18,20,25',
      toArray: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
    })

    tree.clear()

    expect(getHashmapInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
      preOrderTraverse: [],
      inOrderTraverse: [],
      postOrderTraverse: [],
      toString: '',
      toArray: [],
    })

    tree.remove(-1)

    expect(getHashmapInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
      preOrderTraverse: [],
      inOrderTraverse: [],
      postOrderTraverse: [],
      toString: '',
      toArray: [],
    })
  })
})
