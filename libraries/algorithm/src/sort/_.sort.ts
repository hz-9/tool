/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 19:00:08
 * @LastEditTime : 2024-08-10 02:25:16
 * @LastEditors  : Chen Zhen
 */

/**
 * Swaps two elements in an array.
 *
 * @param arr - The array.
 * @param i - The index of the first element.
 * @param j - The index of the second element.
 * @returns void
 */
export const swap = <T>(arr: T[], i: number, j: number): T[] => {
  const temp = arr[i]
  /* eslint-disable no-param-reassign */
  arr[i] = arr[j]
  arr[j] = temp
  /* eslint-enable no-param-reassign */
  return arr
}
