/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-10 13:55:41
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-10 13:58:04
 */

/**
 * @public
 *
 *  Shuffle the array randomly.
 *
 *  随机打乱数组。
 *
 * @param array
 */
export const shuffleRandom = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    // eslint-disable-next-line no-param-reassign
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
