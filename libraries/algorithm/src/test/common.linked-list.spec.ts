/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 02:16:18
 */
import { DoublyLinkedList, SinglyLinkedList, SortedLinkedList } from '../index'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

type GetLinkedList = () => SinglyLinkedList<number> | DoublyLinkedList<number> | SortedLinkedList<number>

/**
 *
 * 一个单属性的必选设置。
 *
 */
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
      expect(linkedList.head).toBe(1)
      expect(linkedList.tail).toBe(3)
      expect(linkedList.size).toBe(2)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('1,3')
      expect(linkedList.toArray()).toEqual([1, 3])
    } else {
      expect(linkedList.head).toBe(1)
      expect(linkedList.tail).toBe(2)
      expect(linkedList.size).toBe(3)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('1,3,2')
      expect(linkedList.toArray()).toEqual([1, 3, 2])
    }
  })

  it('Linked List - pop', async () => {
    const val = linkedList.pop()

    if (linkedList instanceof SortedLinkedList) {
      expect(val).toBe(3)
      expect(linkedList.head).toBe(1)
      expect(linkedList.tail).toBe(1)
      expect(linkedList.size).toBe(1)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('1')
      expect(linkedList.toArray()).toEqual([1])
    } else {
      expect(val).toBe(2)
      expect(linkedList.head).toBe(1)
      expect(linkedList.tail).toBe(3)
      expect(linkedList.size).toBe(2)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('1,3')
      expect(linkedList.toArray()).toEqual([1, 3])
    }

    linkedList.clear()
    expect(linkedList.size).toBe(0)
    expect(linkedList.isEmpty).toBe(true)
    expect(linkedList.toString()).toEqual('')
    expect(linkedList.toArray()).toEqual([])

    const popVal = linkedList.pop()

    expect(popVal).toBeUndefined()
    expect(linkedList.size).toBe(0)

    linkedList.pop()
    linkedList.pop()

    expect(linkedList.head).toBeUndefined()
    expect(linkedList.tail).toBeUndefined()
    expect(linkedList.size).toBe(0)
  })

  it('Linked List - unshift', async () => {
    linkedList.unshift(4)
    linkedList.unshift(6)
    linkedList.unshift(5)

    if (linkedList instanceof SortedLinkedList) {
      expect(linkedList.head).toBe(4)
      expect(linkedList.tail).toBe(4)
      expect(linkedList.size).toBe(1)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('4')
      expect(linkedList.toArray()).toEqual([4])
    } else {
      expect(linkedList.head).toBe(5)
      expect(linkedList.tail).toBe(4)
      expect(linkedList.size).toBe(3)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('5,6,4')
      expect(linkedList.toArray()).toEqual([5, 6, 4])
    }
  })

  it('Linked List - shift', async () => {
    const val = linkedList.shift()

    if (linkedList instanceof SortedLinkedList) {
      expect(linkedList.isEmpty).toBe(true)
    } else {
      expect(val).toBe(5)
      expect(linkedList.head).toBe(6)
      expect(linkedList.tail).toBe(4)
      expect(linkedList.size).toBe(2)
      expect(linkedList.isEmpty).toBe(false)
      expect(linkedList.toString()).toEqual('6,4')
      expect(linkedList.toArray()).toEqual([6, 4])
    }

    linkedList.clear()
    expect(linkedList.size).toBe(0)
    expect(linkedList.isEmpty).toBe(true)
    expect(linkedList.toString()).toEqual('')
    expect(linkedList.toArray()).toEqual([])

    const shiftVal = linkedList.shift()

    expect(shiftVal).toBeUndefined()
    expect(linkedList.size).toBe(0)

    linkedList.shift()
    linkedList.shift()

    expect(linkedList.head).toBeUndefined()
    expect(linkedList.tail).toBeUndefined()
    expect(linkedList.size).toBe(0)
  })

  it('Linked List - remove', async () => {
    linkedList.push(1)
    linkedList.push(2)
    linkedList.push(3)
    linkedList.push(4)
    linkedList.push(5)

    const result1 = linkedList.remove(-1)

    expect(result1).toBe(false)
    expect(linkedList.toString()).toEqual('1,2,3,4,5')

    const result2 = linkedList.remove(1)
    expect(result2).toBe(true)
    expect(linkedList.toString()).toEqual('2,3,4,5')

    const result3 = linkedList.remove(5)
    expect(result3).toBe(true)
    expect(linkedList.size).toBe(3)
    expect(linkedList.toString()).toEqual('2,3,4')

    linkedList.remove(3)
    expect(linkedList.size).toBe(2)
    expect(linkedList.toString()).toEqual('2,4')

    linkedList.clear()
    expect(linkedList.toString()).toEqual('')
    expect(linkedList.size).toBe(0)
    expect(linkedList.isEmpty).toBe(true)
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

    expect(linkedList.removeAt(1)).toBe(true)
    expect(linkedList.toString()).toEqual('1,3,4,5')

    expect(linkedList.removeAt(2)).toBe(true)
    expect(linkedList.toString()).toEqual('1,3,5')

    expect(linkedList.removeAt(99)).toBe(false)
    expect(linkedList.size).toEqual(3)
    expect(linkedList.toString()).toEqual('1,3,5')

    linkedList.clear()
    expect(linkedList.toString()).toEqual('')
    expect(linkedList.size).toBe(0)
    expect(linkedList.isEmpty).toBe(true)
  })

  it('Linked List - addAt', async () => {
    if (linkedList instanceof SortedLinkedList) {
      expect(linkedList.addAt(-1, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(2, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(0, 1)).toBe(true)
      expect(linkedList.toString()).toEqual('1')

      expect(linkedList.addAt(1, 2)).toBe(true)
      expect(linkedList.toString()).toEqual('1,2')

      expect(linkedList.size).toBe(2)
    } else {
      expect(linkedList.addAt(-1, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(2, 1)).toBe(false)
      expect(linkedList.toString()).toEqual('')

      expect(linkedList.addAt(0, 1)).toBe(true)
      expect(linkedList.toString()).toEqual('1')

      expect(linkedList.addAt(1, 2)).toBe(true)
      expect(linkedList.toString()).toEqual('1,2')

      expect(linkedList.size).toBe(2)
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
