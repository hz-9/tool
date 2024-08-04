/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-31 12:39:45
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-04 11:29:47
 */
import { Base } from '../_base'

/**
 * @public
 *
 * A key-value pair.
 *
 * 一个键值对。
 */
export class KeyValue<K, V> {
  public readonly key: K

  public readonly value: V

  /**
   * Constructs a new KeyValue instance.
   *
   * 构造一个新的 KeyValue 实例。
   *
   * @param key - The key.
   * @param value - The value.
   */
  public constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  /**
   * Returns a string representation of the KeyValue.
   *
   * 返回 KeyValue 的字符串表示。
   *
   * @returns The string representation.
   */
  public toString(): string {
    return `${String(this.key)} => ${String(this.value)}`
  }
}

/**
 * An empty KeyValue.
 *
 * 一个空的 KeyValue。
 *
 */
export const EMPTY_KEY_VALUE: KeyValue<unknown, unknown> = new KeyValue(
  Symbol('__EMPTY_KEY_VALUE__'),
  Symbol('__EMPTY_KEY_VALUE__')
)

/**
 * Converts a key to a string.
 *
 * 将键转换为字符串。
 */
export type ToKeyStr<K> = (key: K) => string

/**
 * Converts a key to a string.
 *
 * 将键转换为字符串。
 */
export const toKeyStrDefault = <K>(key: K): string => `${key}`

/**
 * Converts a string key to a hash code.
 *
 * 将字符串键转换为哈希码。
 */
export type ToHashCode = (keyStr: string) => number

/**
 * An interface representing a key-value object.
 *
 * 表示键值对象的接口。
 */
export interface IKeyValueObj<K, V> {
  key: K
  value: V
}

/**
 * The default function to convert a key-value pair to an object.
 *
 * 将键值对转换为对象的默认函数。
 */
export const kVToObj = <K, V>(keyValue: KeyValue<K, V>): IKeyValueObj<K, V> => ({
  key: keyValue.key,
  value: keyValue.value,
})

/**
 * The equality function for KeyValue objects.
 *
 * KeyValue 对象的相等性函数。
 */
export const kVEqualFn = <K, V>(a?: KeyValue<K, V>, b?: KeyValue<K, V>): boolean => a?.key === b?.key

/**
 * @public
 *
 * A base class for hash maps.
 *
 * 一个哈希表的基类。
 */
export abstract class Hashmap<K, V> extends Base<IKeyValueObj<K, V>> {
  /**
   * Adds a key-value pair to the hash map.
   *
   * 将键值对添加到哈希表中。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param key - The key object.
   * @param value - The value information.
   * @returns Whether the addition is successful. Returns false if the key already exists.
   */
  public abstract set(key: K, value: V): boolean

  /**
   * Retrieves the value from the hash map based on the key.
   *
   * 根据键从哈希表中获取值。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param key - The key object.
   * @returns The value object. Returns undefined if the key does not exist.
   */
  public abstract get(key: K): V | undefined

  /**
   * Checks if the hash map contains a value for the key.
   *
   * 判断在哈希表中是否有该键的值。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param key - The key object.
   * @returns Whether the key has a value in the hash map.
   */
  public abstract has(key: K): boolean

  /**
   * Removes the key from the hash map.
   *
   * 在哈希表中删除该键。
   *
   * Time complexity: O(1)
   *
   * Space complexity: O(1)
   *
   * @param key - The key object.
   * @returns Whether the removal is successful.
   */
  public abstract remove(key: K): boolean
}
