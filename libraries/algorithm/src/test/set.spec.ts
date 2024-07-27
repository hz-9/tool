/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-27 02:46:08
 */
import { SetPlus } from '../index'

describe('SetPlus', () => {
  it('SetPlus.prototype.toSet', async () => {
    const setPlus = new SetPlus([1, 2, 3, 4, 5])

    expect(setPlus.toSet()).toEqual(new Set([1, 2, 3, 4, 5]))
  })

  it('SetPlus.union', async () => {
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([3, 4, 5, 6])

    const s = SetPlus.union(set1, set2).toSet()

    expect(Array.from(s)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('SetPlus.intersection', async () => {
    const set1 = new Set([1, 2, 3, 4])
    const set2 = new Set([3, 4, 5, 6])

    const s = SetPlus.intersection(set1, set2).toSet()

    expect(Array.from(s)).toEqual([3, 4])
  })

  it('SetPlus.difference', async () => {
    const set1 = new Set([1, 2, 3, 4])
    const set2 = new Set([3, 4, 5, 6])

    const s = SetPlus.difference(set1, set2).toSet()

    expect(Array.from(s)).toEqual([1, 2])
  })

  it('SetPlus.isSubsetOf', async () => {
    const set1 = new Set([1, 2, 3, 4])
    const set2 = new Set([3, 4])
    const set3 = new Set([3, 4, 5])

    expect(SetPlus.isSubsetOf(set1, set2)).toBe(true)
    expect(SetPlus.isSubsetOf(set1, set3)).toBe(false)
  })
})
