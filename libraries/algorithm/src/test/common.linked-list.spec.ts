/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 17:29:43
 */
import { DoublyLinkedList, SinglyLinkedList, SortedLinkedList } from '../index'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

type UnionLinkedList = SinglyLinkedList<number> | DoublyLinkedList<number> | SortedLinkedList<number>

type GetLinkedList = () => UnionLinkedList

interface ILinkedListInfo {
  size: number
  isEmpty: boolean
  head: number | undefined
  tail: number | undefined
  toString: string
  toArray: Array<number>
}

const getLinkedListInfo = (linkedList: UnionLinkedList): ILinkedListInfo => ({
  size: linkedList.size,
  isEmpty: linkedList.isEmpty,
  head: linkedList.head,
  tail: linkedList.tail,
  toString: linkedList.toString(),
  toArray: linkedList.toArray(),
})

describe.each([
  () => new SinglyLinkedList<number>(),
  () => new DoublyLinkedList<number>(),
  () => new SortedLinkedList<number>(),
])('SinglyLinkedList & DoublyLinkedList - %s', (getLinkedList: GetLinkedList) => {
  const linkedList = getLinkedList()

  it('Linked List - push', async () => {
    linkedList.push(1)
    linkedList.push(3)
    linkedList.push(2)

    if (linkedList instanceof SortedLinkedList) {
      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 2,
        isEmpty: false,
        head: 1,
        tail: 3,
        toString: '1,3',
        toArray: [1, 3],
      })
    } else {
      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 3,
        isEmpty: false,
        head: 1,
        tail: 2,
        toString: '1,3,2',
        toArray: [1, 3, 2],
      })
    }
  })

  it('Linked List - pop', async () => {
    const val = linkedList.pop()

    if (linkedList instanceof SortedLinkedList) {
      expect(val).toBe(3)

      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 1,
        isEmpty: false,
        head: 1,
        tail: 1,
        toString: '1',
        toArray: [1],
      })
    } else {
      expect(val).toBe(2)

      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 2,
        isEmpty: false,
        head: 1,
        tail: 3,
        toString: '1,3',
        toArray: [1, 3],
      })
    }

    linkedList.clear()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })

    expect(linkedList.pop()).toBeUndefined()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })

    linkedList.pop()
    linkedList.pop()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - pop2', async () => {
    const currentLinkedList = getLinkedList()
    currentLinkedList.push(1)

    expect(currentLinkedList.pop()).toBe(1)

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - unshift', async () => {
    linkedList.unshift(4)
    linkedList.unshift(6)
    linkedList.unshift(5)

    if (linkedList instanceof SortedLinkedList) {
      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 1,
        isEmpty: false,
        head: 4,
        tail: 4,
        toString: '4',
        toArray: [4],
      })
    } else {
      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 3,
        isEmpty: false,
        head: 5,
        tail: 4,
        toString: '5,6,4',
        toArray: [5, 6, 4],
      })
    }
  })

  it('Linked List - shift', async () => {
    const val = linkedList.shift()

    if (linkedList instanceof SortedLinkedList) {
      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 0,
        isEmpty: true,
        head: undefined,
        tail: undefined,
        toString: '',
        toArray: [],
      })
    } else {
      expect(val).toBe(5)

      expect(getLinkedListInfo(linkedList)).toEqual({
        size: 2,
        isEmpty: false,
        head: 6,
        tail: 4,
        toString: '6,4',
        toArray: [6, 4],
      })
    }

    linkedList.clear()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })

    expect(linkedList.shift()).toBeUndefined()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })

    linkedList.shift()
    linkedList.shift()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - shift2', async () => {
    const currentLinkedList = getLinkedList()
    currentLinkedList.push(1)

    expect(currentLinkedList.shift()).toBe(1)

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - remove', async () => {
    linkedList.push(1)
    linkedList.push(2)
    linkedList.push(3)
    linkedList.push(4)
    linkedList.push(5)

    expect(linkedList.remove(-1)).toBe(false)

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 5,
      isEmpty: false,
      head: 1,
      tail: 5,
      toString: '1,2,3,4,5',
      toArray: [1, 2, 3, 4, 5],
    })

    expect(linkedList.remove(1)).toBe(true)

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 4,
      isEmpty: false,
      head: 2,
      tail: 5,
      toString: '2,3,4,5',
      toArray: [2, 3, 4, 5],
    })

    expect(linkedList.remove(5)).toBe(true)

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 3,
      isEmpty: false,
      head: 2,
      tail: 4,
      toString: '2,3,4',
      toArray: [2, 3, 4],
    })

    linkedList.remove(3)
    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 2,
      isEmpty: false,
      head: 2,
      tail: 4,
      toString: '2,4',
      toArray: [2, 4],
    })

    linkedList.clear()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - getAt', async () => {
    linkedList.push(1)
    linkedList.push(2)
    linkedList.push(3)
    linkedList.push(4)
    linkedList.push(5)

    expect(linkedList.getAt(-1)).toBe(undefined)
    expect(linkedList.getAt(100)).toBe(undefined)
    expect(linkedList.getAt(0)).toBe(1)
    expect(linkedList.getAt(2)).toBe(3)

    expect(linkedList.toString()).toEqual('1,2,3,4,5')
  })

  it('Linked List - removeAt', async () => {
    expect(linkedList.removeAt(-1)).toBe(false)
    expect(linkedList.toString()).toEqual('1,2,3,4,5')

    expect(linkedList.removeAt(0)).toBe(true)
    expect(linkedList.toString()).toEqual('2,3,4,5')

    expect(linkedList.removeAt(1)).toBe(true)
    expect(linkedList.toString()).toEqual('2,4,5')

    expect(linkedList.removeAt(2)).toBe(true)
    expect(linkedList.toString()).toEqual('2,4')

    expect(linkedList.removeAt(99)).toBe(false)
    expect(linkedList.size).toEqual(2)
    expect(linkedList.toString()).toEqual('2,4')

    linkedList.clear()

    expect(getLinkedListInfo(linkedList)).toEqual({
      size: 0,
      isEmpty: true,
      head: undefined,
      tail: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Linked List - addAt', async () => {
    if (linkedList instanceof SortedLinkedList) {
      expect(linkedList.addAt(-1, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(2, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(0, 1)).toBe(true)
      expect(linkedList.toString()).toEqual('1')

      expect(linkedList.addAt(0, -1)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1')

      expect(linkedList.addAt(0, 999)).toBe(false)
      expect(linkedList.toString()).toEqual('-1,1')

      expect(linkedList.addAt(2, 2)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1,2')

      expect(linkedList.addAt(2, 1.5)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1,1.5,2')

      expect(linkedList.addAt(2, 999)).toBe(false)
      expect(linkedList.toString()).toEqual('-1,1,1.5,2')

      expect(linkedList.size).toBe(4)
    } else {
      expect(linkedList.addAt(-1, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(2, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(0, 1)).toBe(true)
      expect(linkedList.toString()).toEqual('1')

      expect(linkedList.addAt(0, -1)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1')

      expect(linkedList.addAt(2, 2)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1,2')

      expect(linkedList.addAt(2, 1.5)).toBe(true)
      expect(linkedList.toString()).toEqual('-1,1,1.5,2')

      expect(linkedList.size).toBe(4)
    }

    linkedList.clear()
  })

  it('Linked List - getIndex', async () => {
    linkedList.push(1)
    linkedList.push(2)
    linkedList.push(3)
    linkedList.push(4)
    linkedList.push(5)

    expect(linkedList.getIndex(1)).toBe(0)
    expect(linkedList.getIndex(3)).toBe(2)
    expect(linkedList.getIndex(999)).toBe(-1)
  })
})
