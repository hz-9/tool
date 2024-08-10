/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-29 20:15:26
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 02:04:13
 */

/**
 * @public
 *
 *  Compare the two values.
 *
 *  比较两值结果。
 *
 */
export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

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

/**
 * @public
 *
 * Check if a and b are equal.
 *
 * 判断 a 和 b 是否相等。
 *
 * @param a - The value to compare a
 * @param b - The value to compare b
 *
 * @returns The result of the comparison
 */
export const defaultEquals = <T>(a?: T, b?: T): boolean => a === b

/**
 * @public
 *
 * Compare the relationship between a and b.
 *
 * 比较 a 和 b 的大小关系。
 *
 * @param a - The value to compare a
 * @param b - The value to compare b
 *
 * @returns The result of the comparison
 */
export const defaultCompare = <T>(a: T, b: T): Compare => {
  if (a === b) return Compare.EQUALS
  return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN
}

/**
 * @public
 *
 * Convert any type to a number.
 * This function should ensure that different objects in the target dataset are not converted to the same number.
 *
 * 将任意类型转换为数字。
 * 此函数应保证目标数据集中不同对象不会被转换为相同数字。
 *
 * @param val - The value to convert
 * @returns The converted number
 */
export const defaultToNumber = <T>(val: T): number => {
  if (typeof val === 'number') return val
  if (typeof val === 'string') return Number(val)
  return Number(String(val))
}

/**
 * @public
 *
 * (Type) Check if a and b are equal.
 *
 * (类型) 判断 a 和 b 是否相等。
 *
 * @param a - The value to compare a
 * @param b - The value to compare b
 *
 * @returns The result of the comparison
 */
export type EqualsFn<T> = (a?: T, b?: T) => boolean

/**
 * @public
 *
 * (Type) Compare the relationship between a and b.
 *
 * (类型) 比较 a 和 b 的大小关系。
 *
 * @param a - The value to compare a
 * @param b - The value to compare b
 *
 * @returns The result of the comparison
 */
export type CompareFn<T> = (a: T, b: T) => Compare

/**
 * @public
 *
 * Convert any type to a number.
 * This function should ensure that different objects in the target dataset are not converted to the same number.
 *
 * 将任意类型转换为数字。
 * 此函数应保证目标数据集中不同对象不会被转换为相同数字。
 *
 * @param val - The value to convert
 * @returns The converted number
 */
export type ToNumberFn<T> = (val: T) => number
