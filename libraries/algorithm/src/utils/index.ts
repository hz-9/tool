/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 20:20:14
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 02:09:10
 */

/**
 *
 * 判断 a 与 b 是否相等
 *
 * @param a - 比较值 a
 * @param b - 比较值 b
 * @returns 判断结果
 *
 */
export const defaultEquals = <T>(a?: T, b?: T): boolean => a === b

/**
 *
 * 比较 a 与 b 大小关系
 *
 * @param a - 比较值 a
 * @param b - 比较值 b
 * @returns 判断结果
 *
 */
export const defaultCompare = <T>(a: T, b: T): number => {
  if (a === b) return 0
  return b > a ? 1 : -1
}
