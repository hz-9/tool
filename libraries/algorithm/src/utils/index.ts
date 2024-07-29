/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 20:20:14
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 17:58:04
 */

/**
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
 * Compare the relationship between a and b.
 *
 * 比较 a 和 b 的大小关系。
 *
 * @param a - The value to compare a
 * @param b - The value to compare b
 *
 * @returns The result of the comparison
 */
export const defaultCompare = <T>(a: T, b: T): number => {
  if (a === b) return 0
  return b > a ? 1 : -1
}
