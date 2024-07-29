/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:57:19
 */
import { ArrayDeque, ArrayQueue, LinkedListDeque, LinkedListQueue, ObjectDeque, ObjectQueue } from '../index'

type GetDequeQueue = () => UnionQueue

type UnionDeque = ArrayDeque<number> | LinkedListDeque<number> | ObjectDeque<number>

type UnionQueue =
  | ArrayDeque<number>
  | LinkedListDeque<number>
  | ObjectDeque<number>
  | ArrayQueue<number>
  | LinkedListQueue<number>
  | ObjectQueue<number>

const isDeque = (queue: UnionQueue): boolean =>
  queue instanceof ArrayDeque || queue instanceof LinkedListDeque || queue instanceof ObjectDeque

interface IQueueInfo {
  size: number
  isEmpty: boolean
  first: number | undefined
  last: number | undefined
  toString: string
  toArray: Array<number>
}

const getQueueInfo = (queue: UnionQueue): IQueueInfo => ({
  size: queue.size,
  isEmpty: queue.isEmpty,
  first: queue.first,
  last: queue.last,
  toString: queue.toString(),
  toArray: queue.toArray(),
})

describe.each([
  () => new ArrayDeque<number>(),
  () => new ArrayQueue<number>(),
  () => new LinkedListDeque<number>(),
  () => new LinkedListQueue<number>(),
  () => new ObjectDeque<number>(),
  () => new ObjectQueue<number>(),
])('Deque & Queue - %s', (getDequeQueue: GetDequeQueue) => {
  const queue = getDequeQueue()

  it('Deque & Queue - push', async () => {
    queue.push(1)
    queue.push(3)
    queue.push(2)

    expect(getQueueInfo(queue)).toEqual({
      size: 3,
      isEmpty: false,
      first: 1,
      last: 2,
      toString: '1,3,2',
      toArray: [1, 3, 2],
    })
  })

  it('Deque & Queue - peek', async () => {
    expect(queue.peek()).toBe(1)
    expect(getQueueInfo(queue)).toEqual({
      size: 3,
      isEmpty: false,
      first: 1,
      last: 2,
      toString: '1,3,2',
      toArray: [1, 3, 2],
    })

    queue.peek()

    expect(getQueueInfo(queue)).toEqual({
      size: 3,
      isEmpty: false,
      first: 1,
      last: 2,
      toString: '1,3,2',
      toArray: [1, 3, 2],
    })

    queue.clear()

    expect(queue.peek()).toBe(undefined)

    expect(getQueueInfo(queue)).toEqual({
      size: 0,
      isEmpty: true,
      first: undefined,
      last: undefined,
      toString: '',
      toArray: [],
    })
  })

  it('Deque & Queue - shift', async () => {
    expect(queue.shift()).toBeUndefined()

    expect(getQueueInfo(queue)).toEqual({
      size: 0,
      isEmpty: true,
      first: undefined,
      last: undefined,
      toString: '',
      toArray: [],
    })

    queue.push(111)
    queue.push(222)

    expect(queue.shift()).toBe(111)

    expect(getQueueInfo(queue)).toEqual({
      size: 1,
      isEmpty: false,
      first: 222,
      last: 222,
      toString: '222',
      toArray: [222],
    })
  })

  it('Deque & Queue - unshift', async () => {
    // Only dequeue
    if (isDeque(queue)) {
      const deque = queue as UnionDeque

      deque.unshift(3)
      deque.unshift(2)
      deque.unshift(1)

      expect(getQueueInfo(deque)).toEqual({
        size: 4,
        isEmpty: false,
        first: 1,
        last: 222,
        toString: '1,2,3,222',
        toArray: [1, 2, 3, 222],
      })
    }
  })

  it('Deque & Queue - peekFront', async () => {
    // Only dequeue
    if (isDeque(queue)) {
      const deque = queue as UnionDeque

      expect(deque.peekFront()).toBe(1)

      expect(getQueueInfo(deque)).toEqual({
        size: 4,
        isEmpty: false,
        first: 1,
        last: 222,
        toString: '1,2,3,222',
        toArray: [1, 2, 3, 222],
      })

      deque.peekFront()
      deque.peekFront()
      deque.peekFront()

      expect(getQueueInfo(deque)).toEqual({
        size: 4,
        isEmpty: false,
        first: 1,
        last: 222,
        toString: '1,2,3,222',
        toArray: [1, 2, 3, 222],
      })
    }
  })

  it('Deque & Queue - peekBack', async () => {
    // Only dequeue
    if (isDeque(queue)) {
      const deque = queue as UnionDeque

      expect(deque.peekBack()).toBe(222)

      expect(getQueueInfo(deque)).toEqual({
        size: 4,
        isEmpty: false,
        first: 1,
        last: 222,
        toString: '1,2,3,222',
        toArray: [1, 2, 3, 222],
      })

      deque.peekBack()

      expect(getQueueInfo(deque)).toEqual({
        size: 4,
        isEmpty: false,
        first: 1,
        last: 222,
        toString: '1,2,3,222',
        toArray: [1, 2, 3, 222],
      })

      deque.clear()

      expect(deque.peekBack()).toBe(undefined)

      expect(getQueueInfo(deque)).toEqual({
        size: 0,
        isEmpty: true,
        first: undefined,
        last: undefined,
        toString: '',
        toArray: [],
      })
    }
  })

  it('Deque & Queue - pop', async () => {
    // Only dequeue
    if (isDeque(queue)) {
      const deque = queue as UnionDeque

      expect(deque.pop()).toBeUndefined()
      expect(getQueueInfo(deque)).toEqual({
        size: 0,
        isEmpty: true,
        first: undefined,
        last: undefined,
        toString: '',
        toArray: [],
      })

      deque.push(1)
      deque.push(2)
      deque.push(3)

      expect(deque.pop()).toBe(3)

      expect(getQueueInfo(deque)).toEqual({
        size: 2,
        isEmpty: false,
        first: 1,
        last: 2,
        toString: '1,2',
        toArray: [1, 2],
      })
    }
  })
})
