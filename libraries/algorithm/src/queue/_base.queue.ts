/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-30 20:09:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 16:06:50
 */

/**
 *
 * @classw
 *
 *  单项队列基类
 *
 */
export abstract class Queue<T> {
  /**
   * 队列内元素数量
   */
  public abstract get size(): number

  /**
   * 队列内是否为空
   */
  public abstract get isEmpty(): boolean

  /**
   * 队列第一个元素
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   */
  public abstract get first(): T | undefined

  /**
   * 队列最后一个值
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   */
  public abstract get last(): T | undefined

  /**
   *
   * 在队列尾部添加一个新元素。
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   * @param {T} value - 待添加的元素
   *
   */
  public abstract push(value: T): void

  /**
   *
   * 返回队列列头部的元素，并不移除。
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   * @returns 队列头部的元素，队列栈为空，则返回 undefined
   *
   */
  public abstract peek(): T | undefined

  /**
   *
   * 返回队列头部的元素，并从队列内移除。
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   * @returns 队列头部的元素，队列栈为空，则返回 undefined
   *
   */
  public abstract shift(): T | undefined

  /**
   *
   * 清空队列内所有元素。
   *
   * 时间复杂度: O(1)
   *
   * 空间复杂度: O(1)
   *
   */
  public abstract clear(): void

  /**
   * Returns a array of queue information.
   *
   * 返回由队列信息组成的字符串。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toString(): string

  /**
   * Returns a array of queue information.
   *
   * 返回由队列信息组成的数组。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toArray(): T[]
}
