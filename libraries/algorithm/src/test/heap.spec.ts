/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 17:07:50
 * @LastEditTime : 2024-07-30 20:19:03
 * @LastEditors  : Chen Zhen
 */
import { MaxHeap, MinHeap } from '../index'

type UnionHeap = MaxHeap<number> | MinHeap<number>

interface IHeapInfo {
  size: number
  isEmpty: boolean
  peek: number | undefined
  toString: string
  toArray: Array<number>
}

const getHeapInfo = (heap: UnionHeap): IHeapInfo => ({
  size: heap.size,
  isEmpty: heap.isEmpty,
  peek: heap.peek(),
  toString: heap.toString(),
  toArray: heap.toArray(),
})

describe('Minheap', () => {
  const heap = new MinHeap<number>()

  it('Minheap - add', async () => {
    heap.add(2)
    heap.add(3)
    heap.add(4)
    heap.add(5)

    expect(getHeapInfo(heap)).toEqual({
      size: 4,
      isEmpty: false,
      peek: 2,
      toString: '2,3,4,5',
      toArray: [2, 3, 4, 5],
    })

    heap.add(1)

    expect(getHeapInfo(heap)).toEqual({
      size: 5,
      isEmpty: false,
      peek: 1,
      toString: '1,2,4,5,3',
      toArray: [1, 2, 4, 5, 3],
    })
  })

  it('Minheap - pop', async () => {
    heap.clear()

    expect(getHeapInfo(heap)).toEqual({
      size: 0,
      isEmpty: true,
      peek: undefined,
      toString: '',
      toArray: [],
    })

    heap.add(1)
    heap.add(2)
    heap.add(3)
    heap.add(4)
    heap.add(5)
    heap.add(6)
    heap.add(7)
    heap.add(8)
    heap.add(9)

    expect(getHeapInfo(heap)).toEqual({
      size: 9,
      isEmpty: false,
      peek: 1,
      toString: '1,2,3,4,5,6,7,8,9',
      toArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    })

    expect(heap.pop()).toBe(1)

    expect(getHeapInfo(heap)).toEqual({
      size: 8,
      isEmpty: false,
      peek: 2,
      toString: '2,4,3,8,5,6,7,9',
      toArray: [2, 4, 3, 8, 5, 6, 7, 9],
    })
  })
})

describe('Maxheap', () => {
  const heap = new MaxHeap<number>()

  it('Maxheap - add', async () => {
    heap.add(4)
    heap.add(3)
    heap.add(2)
    heap.add(1)

    expect(getHeapInfo(heap)).toEqual({
      size: 4,
      isEmpty: false,
      peek: 4,
      toString: '4,3,2,1',
      toArray: [4, 3, 2, 1],
    })

    heap.add(5)

    expect(getHeapInfo(heap)).toEqual({
      size: 5,
      isEmpty: false,
      peek: 5,
      toString: '5,4,2,1,3',
      toArray: [5, 4, 2, 1, 3],
    })
  })

  it('Minheap - pop', async () => {
    heap.clear()

    expect(getHeapInfo(heap)).toEqual({
      size: 0,
      isEmpty: true,
      peek: undefined,
      toString: '',
      toArray: [],
    })

    heap.add(9)
    heap.add(8)
    heap.add(7)
    heap.add(6)
    heap.add(5)
    heap.add(4)
    heap.add(3)
    heap.add(2)
    heap.add(1)

    expect(getHeapInfo(heap)).toEqual({
      size: 9,
      isEmpty: false,
      peek: 9,
      toString: '9,8,7,6,5,4,3,2,1',
      toArray: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    })

    expect(heap.pop()).toBe(9)

    expect(getHeapInfo(heap)).toEqual({
      size: 8,
      isEmpty: false,
      peek: 8,
      toString: '8,6,7,2,5,4,3,1',
      toArray: [8, 6, 7, 2, 5, 4, 3, 1],
    })
  })
})
