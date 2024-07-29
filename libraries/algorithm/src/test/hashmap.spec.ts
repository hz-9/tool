/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 23:10:41
 */
import {
  BetterHashmap,
  KeyValue,
  LinearProbingHashmap,
  LinkedListHashmap,
  SimpleHashmap,
  SquareProbingHashmap,
  toKeyStrDefault,
} from '../index'

type GetHashmap = () => UnionHashmap

type UnionHashmap =
  | BetterHashmap<number, string>
  | LinearProbingHashmap<number, string>
  | LinkedListHashmap<number, string>
  | SimpleHashmap<number, string>
  | SquareProbingHashmap<number, string>

interface IHashmapInfo {
  size: number
  isEmpty: boolean
  toString: string
  toArray: KeyValue<number, string>[]
}

const getHashmapInfo = (hashmap: UnionHashmap): IHashmapInfo => ({
  size: hashmap.size,
  isEmpty: hashmap.isEmpty,
  toString: hashmap.toString(),
  toArray: hashmap.toArray(),
})

describe.each([
  () => new BetterHashmap<number, string>(),
  () => new LinearProbingHashmap<number, string>(),
  () => new LinkedListHashmap<number, string>(),
  () => new SimpleHashmap<number, string>(),
  () => new SquareProbingHashmap<number, string>(),
])('Hashmap - %s', (getHashmap: GetHashmap) => {
  const hashmap = getHashmap()

  it('Hashmap - set', async () => {
    hashmap.set(1, '1')
    hashmap.set(2, '2')
    hashmap.set(3, '3')

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 3,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2', '3: 3 => 3'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
      ],
    })
  })

  it('Hashmap - get', async () => {
    expect(hashmap.get(1)).toBe('1')
    expect(hashmap.get(2)).toBe('2')
    expect(hashmap.get(3)).toBe('3')
    expect(hashmap.get(4)).toBeUndefined()

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 3,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2', '3: 3 => 3'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
      ],
    })
  })

  it('Hashmap - has', async () => {
    expect(hashmap.has(1)).toBe(true)
    expect(hashmap.has(2)).toBe(true)
    expect(hashmap.has(3)).toBe(true)
    expect(hashmap.has(4)).toBe(false)

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 3,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2', '3: 3 => 3'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' },
      ],
    })
  })

  it('Hashmap - remove', async () => {
    expect(hashmap.remove(4)).toBe(false)
    expect(hashmap.remove(3)).toBe(true)

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 2,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
      ],
    })

    expect(hashmap.get(3)).toBeUndefined()

    hashmap.clear()

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 0,
      isEmpty: true,
      toString: '',
      toArray: [],
    })
  })

  it('Hashmap - reSet', async () => {
    hashmap.set(1, '1')
    hashmap.set(2, '2')
    hashmap.set(3, '3')
    hashmap.set(4, '4')
    hashmap.set(5, '5')

    hashmap.remove(3)
    hashmap.remove(4)
    hashmap.remove(5)

    hashmap.set(2, '2-2')

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 2,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2-2'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2-2' },
      ],
    })

    hashmap.set(3, '3-3')

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 3,
      isEmpty: false,
      toString: ['1: 1 => 1', '2: 2 => 2-2', '3: 3 => 3-3'].join('\n'),
      toArray: [
        { key: 1, value: '1' },
        { key: 2, value: '2-2' },
        { key: 3, value: '3-3' },
      ],
    })

    hashmap.remove(1)
    hashmap.remove(2)
    hashmap.remove(3)
    hashmap.remove(4)
    hashmap.remove(5)

    expect(getHashmapInfo(hashmap)).toEqual({
      size: 0,
      isEmpty: true,
      toString: '',
      toArray: [],
    })
  })
})

/**
 * 仅支持 `[a-z]-?` 格式作为 key.
 */
const toCustomHashCode = (tableKey: string): number => Math.floor(+tableKey / 10)

const supportClash = (hashmap: UnionHashmap) =>
  hashmap instanceof BetterHashmap ||
  hashmap instanceof LinearProbingHashmap ||
  hashmap instanceof LinkedListHashmap ||
  hashmap instanceof SquareProbingHashmap

describe.each([
  () => new BetterHashmap<number, string>(toKeyStrDefault, toCustomHashCode),
  () => new LinearProbingHashmap<number, string>(toKeyStrDefault, toCustomHashCode),
  () => new LinkedListHashmap<number, string>(toKeyStrDefault, toCustomHashCode),
  () => new SimpleHashmap<number, string>(toKeyStrDefault, toCustomHashCode),
  () => new SquareProbingHashmap<number, string>(toKeyStrDefault, toCustomHashCode),
])('Hashmap - toCustomHashCode - %s', (getHashmap: GetHashmap) => {
  const hashmap = getHashmap()

  it('Hashmap - set', async () => {
    hashmap.set(11, '1-1')
    hashmap.set(12, '1-2')
    hashmap.set(13, '1-3')

    if (!supportClash(hashmap)) {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 1,
        isEmpty: false,
        toString: ['13: 13 => 1-3'].join('\n'),
        toArray: [{ key: 13, value: '1-3' }],
      })
    } else {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 3,
        isEmpty: false,
        toString: ['11: 11 => 1-1', '12: 12 => 1-2', '13: 13 => 1-3'].join('\n'),
        toArray: [
          { key: 11, value: '1-1' },
          { key: 12, value: '1-2' },
          { key: 13, value: '1-3' },
        ],
      })
    }

    hashmap.set(21, '2-1')

    if (!supportClash(hashmap)) {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 2,
        isEmpty: false,
        toString: ['13: 13 => 1-3', '21: 21 => 2-1'].join('\n'),
        toArray: [
          { key: 13, value: '1-3' },
          { key: 21, value: '2-1' },
        ],
      })
    } else if (hashmap instanceof SquareProbingHashmap) {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 4,
        isEmpty: false,
        toString: ['11: 11 => 1-1', '12: 12 => 1-2', '21: 21 => 2-1', '13: 13 => 1-3'].join('\n'),
        toArray: [
          { key: 11, value: '1-1' },
          { key: 12, value: '1-2' },
          { key: 21, value: '2-1' },
          { key: 13, value: '1-3' },
        ],
      })
    } else {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 4,
        isEmpty: false,
        toString: ['11: 11 => 1-1', '12: 12 => 1-2', '13: 13 => 1-3', '21: 21 => 2-1'].join('\n'),
        toArray: [
          { key: 11, value: '1-1' },
          { key: 12, value: '1-2' },
          { key: 13, value: '1-3' },
          { key: 21, value: '2-1' },
        ],
      })
    }

    if (!supportClash(hashmap)) {
      const simpleHashmap = hashmap as SimpleHashmap<number, string>
      expect(simpleHashmap.get(11)).toBe('1-3')
      expect(simpleHashmap.get(12)).toBe('1-3')
      expect(simpleHashmap.get(13)).toBe('1-3')
      expect(simpleHashmap.get(14)).toBe('1-3')
    } else {
      expect(hashmap.get(11)).toBe('1-1')
      expect(hashmap.get(12)).toBe('1-2')
      expect(hashmap.get(13)).toBe('1-3')
      expect(hashmap.get(14)).toBeUndefined()
    }

    hashmap.remove(12)
    hashmap.remove(21)

    if (!supportClash(hashmap)) {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 0,
        isEmpty: true,
        toString: '',
        toArray: [],
      })
    } else {
      expect(getHashmapInfo(hashmap)).toEqual({
        size: 2,
        isEmpty: false,
        toString: ['11: 11 => 1-1', '13: 13 => 1-3'].join('\n'),
        toArray: [
          { key: 11, value: '1-1' },
          { key: 13, value: '1-3' },
        ],
      })
    }
  })
})
