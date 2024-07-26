/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-29 01:33:33
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 02:31:24
 */

/* eslint-disable no-restricted-syntax */

/**
 * @public
 *
 * A class that extends Set with additional functionalities.
 *
 * 一个扩展了 Set 的类，提供了额外的功能。
 */
export class SetPlus<T> extends Set<T> {
  /**
   * Checks if the otherSet is a subset of the current instance.
   *
   * 判断 otherSet 是否为当前实例的子集。
   *
   * @param otherSet - The other set to compare.
   *
   * @returns The result of the subset check.
   */
  public isSubsetOf(otherSet: Set<T>): boolean {
    if (otherSet.size > this.size) return false

    for (const v of otherSet.values()) {
      if (!this.has(v)) return false
    }

    return true
  }

  /**
   * Converts the set to a new Set object.
   *
   * 将集合转换为新的 Set 对象。
   *
   * @returns The converted Set object.
   */
  public toSet(): Set<T> {
    const set = new Set<T>()
    this.forEach((v) => set.add(v))
    return set
  }

  /**
   * Gets the union of two sets and returns a SetPlus instance. (Static function)
   *
   * 获取两个集合的并集，并返回 SetPlus 实例。（静态函数）
   *
   * @param setA - The first set.
   * @param setB - The second set.
   *
   * @returns The union set as a SetPlus instance.
   */
  public static union<T>(setA: Set<T>, setB: Set<T>): SetPlus<T> {
    const set = new SetPlus<T>()

    setA.forEach((v) => set.add(v))
    setB.forEach((v) => set.add(v))

    return set
  }

  /**
   * Gets the intersection of two sets and returns a SetPlus instance. (Static function)
   * 获取两个集合的交集，并返回 SetPlus 实例。（静态函数）
   *
   * @param setA - The first set.
   * @param setB - The second set.
   *
   * @returns The intersection set as a SetPlus instance.
   */
  public static intersection<T>(setA: Set<T>, setB: Set<T>): SetPlus<T> {
    const set = new SetPlus<T>()

    setA.forEach((v) => {
      if (setB.has(v)) {
        set.add(v)
      }
    })

    return set
  }

  /**
   * Gets the difference between SetA and SetB and returns a SetPlus instance. (Static function)
   *
   * 获取 SetA 中存在但 SetB 中不存在的元素，并返回 SetPlus 实例。（静态函数）
   *
   * @param setA - The first set.
   * @param setB - The second set.
   *
   * @returns The difference set as a SetPlus instance.
   */
  public static difference<T>(setA: Set<T>, setB: Set<T>): SetPlus<T> {
    const set = new SetPlus<T>()

    setA.forEach((v) => {
      if (!setB.has(v)) {
        set.add(v)
      }
    })

    return set
  }

  /**
   * Checks if SetB is a subset of SetA. (Static function)
   *
   * 判断 SetB 是否为 SetA 的子集。（静态函数）
   *
   * @param setA - The first set.
   * @param setB - The second set.
   *
   * @returns The result of the subset check.
   */
  public static isSubsetOf<T>(setA: Set<T>, setB: Set<T>): boolean {
    if (setB.size > setA.size) return false

    for (const v of setB.values()) {
      if (!setA.has(v)) return false
    }

    return true
  }
}
