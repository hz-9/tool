/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:59:58
 */
import { ArrayStack, LinkedListStack, ObjectStack } from '../index'

type UnionStack = ArrayStack<number> | LinkedListStack<number> | ObjectStack<number>

type GetStack = () => UnionStack

interface IStackInfo {
  size: number
  isEmpty: boolean
  peek: number | undefined
  toString: string
  toArray: Array<number>
}

const getStackInfo = (stack: UnionStack): IStackInfo => ({
  size: stack.size,
  isEmpty: stack.isEmpty,
  peek: stack.peek(),
  toString: stack.toString(),
  toArray: stack.toArray(),
})

describe.each([() => new ArrayStack<number>(), () => new LinkedListStack<number>(), () => new ObjectStack<number>()])(
  'Stack - %s',
  (getStack: GetStack) => {
    const stack = getStack()

    it('Stack - push', async () => {
      stack.push(1)
      stack.push(3)
      stack.push(2)

      expect(getStackInfo(stack)).toEqual({
        size: 3,
        isEmpty: false,
        peek: 2,
        toString: '2,3,1',
        toArray: [2, 3, 1],
      })
    })

    it('Stack - peek', async () => {
      expect(stack.peek()).toBe(2)

      expect(getStackInfo(stack)).toEqual({
        size: 3,
        isEmpty: false,
        peek: 2,
        toString: '2,3,1',
        toArray: [2, 3, 1],
      })

      stack.peek()
      stack.peek()
      stack.peek()
      stack.peek()

      expect(getStackInfo(stack)).toEqual({
        size: 3,
        isEmpty: false,
        peek: 2,
        toString: '2,3,1',
        toArray: [2, 3, 1],
      })

      stack.clear()

      expect(stack.peek()).toBe(undefined)

      expect(getStackInfo(stack)).toEqual({
        size: 0,
        isEmpty: true,
        peek: undefined,
        toString: '',
        toArray: [],
      })
    })

    it('Stack - pop', async () => {
      expect(stack.pop()).toBeUndefined()

      expect(getStackInfo(stack)).toEqual({
        size: 0,
        isEmpty: true,
        peek: undefined,
        toString: '',
        toArray: [],
      })

      stack.push(111)
      stack.push(222)

      expect(stack.pop()).toBe(222)

      expect(getStackInfo(stack)).toEqual({
        size: 1,
        isEmpty: false,
        peek: 111,
        toString: '111',
        toArray: [111],
      })
    })
  }
)
