/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-29 20:15:26
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 20:19:17
 */

/**
 * @public
 *
 * Base class for algorithm.
 *
 * 基类。
 */
export abstract class Base<T> {
  /**
   * The number of elements in the algorithm class.
   *
   * 算法类内元素数量。
   */
  public abstract get size(): number

  /**
   * Whether the algorithm class is empty.
   *
   * 算法类是否为空？
   */
  public abstract get isEmpty(): boolean

  /**
   * Clear all elements in the algorithm class.
   *
   * 清空算法类内所有元素。
   *
   * Time Complexity: O(1)
   *
   * Space Complexity: O(1)
   *
   */
  public abstract clear(): void

  /**
   * Returns a string representation of the algorithm class.
   *
   * 返回由算法类信息组成的字符串。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toString(): string

  /**
   * Returns an array representation of the algorithm class.
   *
   * 返回由算法类信息组成的数组。
   *
   * Time Complexity: O(n)
   *
   * Space Complexity: O(n)
   */
  public abstract toArray(): T[]
}
