import { Queue } from './_base.queue'

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:09:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 18:22:22
 */

/**
 * @public
 *
 * Base class for double-ended queues.
 *
 * 双向队列基类。
 */
export abstract class Deque<T> extends Queue<T> {
  /**
   * Add a new element to the front of the queue.
   *
   * 在队列头部添加一个新元素。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param value - The element to be added.
   */
  public abstract unshift(value: T): void

  /**
   * Remove and return the element at the back of the queue.
   *
   * 返回队尾部的元素，并从队列内移除。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The element at the back of the queue, or undefined if the queue is empty.
   */
  public abstract pop(): T | undefined

  /**
   * Return the element at the front of the queue without removing it.
   *
   * 返回队列头部的元素，并不移除。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The element at the front of the queue, or undefined if the queue is empty.
   */
  public abstract peekFront(): T | undefined

  /**
   * Return the element at the back of the queue without removing it.
   *
   * 返回队列尾部的元素，并不移除。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @returns The element at the back of the queue, or undefined if the queue is empty.
   *
   */
  public abstract peekBack(): T | undefined
}
