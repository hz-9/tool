/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 01:40:19
 */
import {
  DoublyLinkedList,
  DoublyLinkedListNode,
  SinglyLinkedList,
  SinglyLinkedListNode,
  SortedLinkedList,
} from '../index'

describe('SinglyLinkedListNode', () => {
  it('Node - One', async () => {
    const node = new SinglyLinkedListNode<number>(1)

    expect(node.val).toBe(1)
    expect(node.next).toBeUndefined()

    // @ts-expect-error
    node.prev = undefined
  })

  it('Node with next', async () => {
    const node2 = new SinglyLinkedListNode<number>(2)
    const node1 = new SinglyLinkedListNode<number>(1)
    node1.next = node2

    expect(node1.val).toBe(1)
    expect(node1.next).toBe(node2)
    expect(node2.val).toBe(2)
    expect(node2.next).toBeUndefined()

    // @ts-expect-error
    node1.prev = undefined
  })

  it('Type', async () => {
    const linkedList = new SinglyLinkedList<number>()
    linkedList.push(1)

    expect(linkedList.headNode?.val).toBe(1)
    expect(linkedList.tailNode?.val).toBe(1)
    expect(linkedList.headNode).toBeInstanceOf(SinglyLinkedListNode)
    expect(linkedList.tailNode).toBeInstanceOf(SinglyLinkedListNode)
  })
})

describe('DoublyLinkedListNode', () => {
  it('Node - One', async () => {
    const node = new DoublyLinkedListNode<number>(1)

    expect(node.val).toBe(1)
    expect(node.prev).toBeUndefined()
    expect(node.next).toBeUndefined()
  })

  it('Node with next', async () => {
    const node2 = new DoublyLinkedListNode<number>(2)
    const node1 = new DoublyLinkedListNode<number>(1)
    node1.next = node2

    expect(node1.val).toBe(1)
    expect(node1.next).toBe(node2)
    expect(node2.val).toBe(2)
    expect(node2.next).toBeUndefined()
  })

  type GetLinkedList = () => DoublyLinkedList<number> | SortedLinkedList<number>

  it.each([() => new DoublyLinkedList<number>(), () => new SortedLinkedList<number>()])(
    'Type',
    async (getLinkedList: GetLinkedList) => {
      const linkedList = getLinkedList()
      linkedList.push(1)

      expect(linkedList.headNode?.val).toBe(1)
      expect(linkedList.tailNode?.val).toBe(1)
      expect(linkedList.headNode).toBeInstanceOf(DoublyLinkedListNode)
      expect(linkedList.tailNode).toBeInstanceOf(DoublyLinkedListNode)
    }
  )
})
