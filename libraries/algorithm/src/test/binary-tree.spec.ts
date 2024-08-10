/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-10 18:04:38
 * @LastEditors  : Chen Zhen
 */
import { AdelsonVelskiiLandiTree, BinarySearchTree, RedBlackTree } from '../index'

type UnionTree = BinarySearchTree<number> | AdelsonVelskiiLandiTree<number> | RedBlackTree<number>

type GetTree = () => UnionTree

interface ITreeCommonInfo {
  size: number
  isEmpty: boolean
  min: number | undefined
  max: number | undefined
}

interface ITreeDiffInfo {
  preOrderTraverse: number[]
  inOrderTraverse: number[]
  postOrderTraverse: number[]
  toString: string
  toArray: number[]
}

const getTreeCommonInfo = (tree: UnionTree): ITreeCommonInfo => ({
  size: tree.size,
  isEmpty: tree.isEmpty,
  min: tree.min,
  max: tree.max,
})

// const isRedBlackTree = (tree: UnionTree): boolean => tree instanceof RedBlackTree

const isAdelsonVelskiiLandiTree = (tree: UnionTree): boolean => tree instanceof AdelsonVelskiiLandiTree

const isBinarySearchTree = (tree: UnionTree): boolean =>
  tree instanceof BinarySearchTree && !(tree instanceof AdelsonVelskiiLandiTree) && !(tree instanceof RedBlackTree)

const getTreeDiffInfo = (tree: UnionTree): ITreeDiffInfo => {
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
    preOrderTraverse: preOrderTraverseResult,
    inOrderTraverse: inOrderTraverseResult,
    postOrderTraverse: postOrderTraverseResult,
    toString: tree.toString(),
    toArray: tree.toArray(),
  }
}

describe.each([
  () => new BinarySearchTree<number>(),
  () => new AdelsonVelskiiLandiTree<number>(),
  () => new RedBlackTree<number>(),
])('BinaryTree - %s', (getTree: GetTree) => {
  const tree = getTree()

  it('BinaryTree - add', async () => {
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
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

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
        inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
        postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
        toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
        toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      })
    }

    // Duplicate addition, will not cause any impact
    tree.add(14)
    tree.add(20)
    tree.add(18)
    tree.add(25)
    tree.add(6)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
        inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
        postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
        toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
        toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      })
    }
  })

  it('BinaryTree - has & get', async () => {
    expect(tree.has(11)).toBe(true)
    expect(tree.has(12)).toBe(true)
    expect(tree.has(3)).toBe(true)
    expect(tree.has(100000)).toBe(false)
    expect(tree.has(-1)).toBe(false)

    expect(tree.get(11)).toBe(11)
    expect(tree.get(12)).toBe(12)
    expect(tree.get(3)).toBe(3)
    expect(tree.get(100000)).toBe(undefined)
    expect(tree.get(-1)).toBe(undefined)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 15,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
        inOrderTraverse: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
        postOrderTraverse: [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
        toString: '3,5,6,7,8,9,10,11,12,13,14,15,18,20,25',
        toArray: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      })
    }
  })

  it('BinaryTree - remove', async () => {
    tree.remove(6)
    tree.remove(6)
    tree.remove(6)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 14,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 5, 3, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
        inOrderTraverse: [3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
        postOrderTraverse: [3, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
        toString: '3,5,7,8,9,10,11,12,13,14,15,18,20,25',
        toArray: [3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      })
    }

    tree.remove(5)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 13,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 3, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25],
        inOrderTraverse: [3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
        postOrderTraverse: [3, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11],
        toString: '3,7,8,9,10,11,12,13,14,15,18,20,25',
        toArray: [3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
      })
    }

    tree.remove(15)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 12,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 3, 9, 8, 10, 18, 13, 12, 14, 20, 25],
        inOrderTraverse: [3, 7, 8, 9, 10, 11, 12, 13, 14, 18, 20, 25],
        postOrderTraverse: [3, 8, 10, 9, 7, 12, 14, 13, 25, 20, 18, 11],
        toString: '3,7,8,9,10,11,12,13,14,18,20,25',
        toArray: [3, 7, 8, 9, 10, 11, 12, 13, 14, 18, 20, 25],
      })
    }

    tree.remove(8)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 11,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 3, 9, 10, 18, 13, 12, 14, 20, 25],
        inOrderTraverse: [3, 7, 9, 10, 11, 12, 13, 14, 18, 20, 25],
        postOrderTraverse: [3, 10, 9, 7, 12, 14, 13, 25, 20, 18, 11],
        toString: '3,7,9,10,11,12,13,14,18,20,25',
        toArray: [3, 7, 9, 10, 11, 12, 13, 14, 18, 20, 25],
      })
    }

    tree.remove(9)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 10,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 3, 10, 18, 13, 12, 14, 20, 25],
        inOrderTraverse: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
        postOrderTraverse: [3, 10, 7, 12, 14, 13, 25, 20, 18, 11],
        toString: '3,7,10,11,12,13,14,18,20,25',
        toArray: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
      })
    }

    tree.remove(-1)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 10,
      isEmpty: false,
      min: 3,
      max: 25,
    })

    if (isBinarySearchTree(tree) || isAdelsonVelskiiLandiTree(tree)) {
      expect(getTreeDiffInfo(tree)).toEqual({
        preOrderTraverse: [11, 7, 3, 10, 18, 13, 12, 14, 20, 25],
        inOrderTraverse: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
        postOrderTraverse: [3, 10, 7, 12, 14, 13, 25, 20, 18, 11],
        toString: '3,7,10,11,12,13,14,18,20,25',
        toArray: [3, 7, 10, 11, 12, 13, 14, 18, 20, 25],
      })
    }

    tree.clear()

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [],
      inOrderTraverse: [],
      postOrderTraverse: [],
      toString: '',
      toArray: [],
    })

    tree.remove(-1)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [],
      inOrderTraverse: [],
      postOrderTraverse: [],
      toString: '',
      toArray: [],
    })
  })
})

describe('BinaryTree - AdelsonVelskiiLandiTree', () => {
  const tree = new AdelsonVelskiiLandiTree<number>()

  it('AdelsonVelskiiLandiTree - rotationLL', async () => {
    tree.clear()
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })

    tree.add(50)
    tree.add(30)
    tree.add(70)
    tree.add(10)
    tree.add(40)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 5,
      isEmpty: false,
      min: 10,
      max: 70,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [50, 30, 10, 40, 70],
      inOrderTraverse: [10, 30, 40, 50, 70],
      postOrderTraverse: [10, 40, 30, 70, 50],
      toString: '10,30,40,50,70',
      toArray: [10, 30, 40, 50, 70],
    })

    tree.add(5)
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 6,
      isEmpty: false,
      min: 5,
      max: 70,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [30, 10, 5, 50, 40, 70],
      inOrderTraverse: [5, 10, 30, 40, 50, 70],
      postOrderTraverse: [5, 10, 40, 70, 50, 30],
      toString: '5,10,30,40,50,70',
      toArray: [5, 10, 30, 40, 50, 70],
    })
  })

  it('AdelsonVelskiiLandiTree - rotationRR', async () => {
    tree.clear()
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })

    tree.add(50)
    tree.add(30)
    tree.add(70)
    tree.add(60)
    tree.add(80)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 5,
      isEmpty: false,
      min: 30,
      max: 80,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [50, 30, 70, 60, 80],
      inOrderTraverse: [30, 50, 60, 70, 80],
      postOrderTraverse: [30, 60, 80, 70, 50],
      toString: '30,50,60,70,80',
      toArray: [30, 50, 60, 70, 80],
    })

    tree.add(90)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 6,
      isEmpty: false,
      min: 30,
      max: 90,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [70, 50, 30, 60, 80, 90],
      inOrderTraverse: [30, 50, 60, 70, 80, 90],
      postOrderTraverse: [30, 60, 50, 90, 80, 70],
      toString: '30,50,60,70,80,90',
      toArray: [30, 50, 60, 70, 80, 90],
    })
  })

  it('AdelsonVelskiiLandiTree - rotationLR', async () => {
    tree.clear()
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })

    tree.add(50)
    tree.add(30)
    tree.add(70)
    tree.add(10)
    tree.add(40)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 5,
      isEmpty: false,
      min: 10,
      max: 70,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [50, 30, 10, 40, 70],
      inOrderTraverse: [10, 30, 40, 50, 70],
      postOrderTraverse: [10, 40, 30, 70, 50],
      toString: '10,30,40,50,70',
      toArray: [10, 30, 40, 50, 70],
    })

    tree.add(35)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 6,
      isEmpty: false,
      min: 10,
      max: 70,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [40, 30, 10, 35, 50, 70],
      inOrderTraverse: [10, 30, 35, 40, 50, 70],
      postOrderTraverse: [10, 35, 30, 70, 50, 40],
      toString: '10,30,35,40,50,70',
      toArray: [10, 30, 35, 40, 50, 70],
    })
  })

  it('AdelsonVelskiiLandiTree - rotationRL', async () => {
    tree.clear()
    expect(getTreeCommonInfo(tree)).toEqual({
      size: 0,
      isEmpty: true,
      min: undefined,
      max: undefined,
    })

    tree.add(70)
    tree.add(50)
    tree.add(80)
    tree.add(72)
    tree.add(90)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 5,
      isEmpty: false,
      min: 50,
      max: 90,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [70, 50, 80, 72, 90],
      inOrderTraverse: [50, 70, 72, 80, 90],
      postOrderTraverse: [50, 72, 90, 80, 70],
      toString: '50,70,72,80,90',
      toArray: [50, 70, 72, 80, 90],
    })

    tree.add(75)

    expect(getTreeCommonInfo(tree)).toEqual({
      size: 6,
      isEmpty: false,
      min: 50,
      max: 90,
    })
    expect(getTreeDiffInfo(tree)).toEqual({
      preOrderTraverse: [72, 70, 50, 80, 75, 90],
      inOrderTraverse: [50, 70, 72, 75, 80, 90],
      postOrderTraverse: [50, 70, 75, 90, 80, 72],
      toString: '50,70,72,75,80,90',
      toArray: [50, 70, 72, 75, 80, 90],
    })
  })
})
