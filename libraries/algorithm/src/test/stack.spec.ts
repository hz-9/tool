/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-28 00:35:20
 */
import { ArrayStack, LinkedListStack, ObjectStack } from '../index'

type GetStack = () => ArrayStack<number> | LinkedListStack<number> | ObjectStack<number>

describe.each([() => new ArrayStack<number>(), () => new LinkedListStack<number>(), () => new ObjectStack<number>()])(
  'Stack - %s',
  (getStack: GetStack) => {
    const stack = getStack()

    it('Stack - push', async () => {
      stack.push(1)
      stack.push(3)
      stack.push(2)

      expect(stack.size).toBe(3)
      expect(stack.isEmpty).toBe(false)
      expect(stack.toString()).toBe('2,3,1')
      expect(stack.toArray()).toEqual([2, 3, 1])
    })

    it('Stack - peek', async () => {
      const peek1 = stack.peek()

      expect(peek1).toBe(2)
      expect(stack.size).toBe(3)
      expect(stack.isEmpty).toBe(false)
      expect(stack.toString()).toBe('2,3,1')
      expect(stack.toArray()).toEqual([2, 3, 1])

      stack.peek()
      stack.peek()
      stack.peek()
      stack.peek()

      expect(stack.size).toBe(3)

      stack.clear()

      const peek2 = stack.peek()

      expect(peek2).toBe(undefined)
      expect(stack.size).toBe(0)
      expect(stack.isEmpty).toBe(true)
      expect(stack.toString()).toBe('')
      expect(stack.toArray()).toEqual([])
    })

    it('Stack - pop', async () => {
      const pop1 = stack.pop()

      expect(pop1).toBeUndefined()
      expect(stack.size).toBe(0)
      expect(stack.isEmpty).toBe(true)
      expect(stack.toString()).toBe('')
      expect(stack.toArray()).toEqual([])

      stack.push(111)
      stack.push(222)

      const pop2 = stack.pop()
      expect(pop2).toBe(222)
      expect(stack.size).toBe(1)
      expect(stack.isEmpty).toBe(false)
      expect(stack.toString()).toBe('111')
      expect(stack.toArray()).toEqual([111])
    })
  }
)
