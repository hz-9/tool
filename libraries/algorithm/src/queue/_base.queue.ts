/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:09:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 20:19:25
 */
import { Base } from '../_base/index'

/**
 * @public
 *
 * Base class for a queue.
 *
 * 队列的基类。
 */
export abstract class Queue<T> extends Base<T> {
  /**
   * The first element in the queue.
   *
   * 队列第一个元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   */
  public abstract get first(): T | undefined

  /**
   * The last element in the queue.
   *
   * 队列最后一个元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   */
  public abstract get last(): T | undefined

  /**
   * Add a new element to the end of the queue.
   * 在队列尾部添加一个新元素。
   * 在队列尾部添加一个新元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @param value - The element to be added.
   *
   */
  public abstract push(value: T): void

  /**
   * Return the first element in the queue without removing it.
   *
   * 返回队列头部的元素，并不移除。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @returns The first element in the queue, or undefined if the queue is empty.
   *
   */
  public abstract peek(): T | undefined

  /**
   * Return the first element in the queue and remove it from the queue.
   *
   * 返回队列头部的元素，并从队列内移除。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   * @returns The first element in the queue, or undefined if the queue is empty.
   *
   */
  public abstract shift(): T | undefined
}
