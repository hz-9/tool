/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 01:29:40
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 20:21:27
 */
import { Base } from '../_base/index'

/**
 * Stack base class.
 *
 * 栈基类。
 */
export abstract class Stack<T> extends Base<T> {
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
}
