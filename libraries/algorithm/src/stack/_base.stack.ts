/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:29:40
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 18:22:30
 */

/**
 * Stack base class.
 *
 * 栈基类。
 */
export abstract class Stack<T> {
  /**
   * Number of elements in the stack.
   *
   * 栈内元素数量。
   */
  public abstract get size(): number

  /**
   * Checks if the stack is empty.
   *
   * 栈内是否为空。
   */
  public abstract get isEmpty(): boolean

  /**
   * Adds a new element to the top of the stack.
   *
   * 在栈顶添加一个新元素。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param value - The element to be added.
   *
   */
  public abstract push(val: T): void

  /**
   * Returns the top element of the stack without removing it.
   *
   * 返回栈顶的元素，但不从栈内移除。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The top element of the stack, or undefined if the stack is empty.
   *
   */
  public abstract peek(): T | undefined

  /**
   * Returns the top element of the stack and removes it from the stack.
   *
   * 返回栈顶的元素，并从栈内移除。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The top element of the stack, or undefined if the stack is empty.
   *
   */
  public abstract pop(): T | undefined

  /**
   * Clears all elements from the stack.
   *
   * 清空栈内所有元素。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   */
  public abstract clear(): void

  /**
   * Returns a array of stack information.
   *
   * 返回由栈信息组成的字符串。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toString(): string

  /**
   * Returns a array of stack information.
   *
   * 返回由栈信息组成的数组。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toArray(): T[]
}
