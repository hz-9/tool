/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 16:37:56
 * @LastEditTime : 2024-08-10 02:38:06
 * @LastEditors  : Chen Zhen
 */
import {
  bubbleSort,
  bubbleSortBase,
  bucketSort,
  countingSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
} from '../index'

type SortFunction<T> =
  | typeof bubbleSort<T>
  | typeof bubbleSortBase<T>
  | typeof selectionSort<T>
  | typeof insertionSort<T>
  | typeof mergeSort<T>
  | typeof quickSort<T>
  | typeof countingSort<T>
  | typeof bucketSort<T>
  | typeof radixSort<T>

describe.each([
  bubbleSortBase,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  countingSort,
  bucketSort,
  radixSort,
])('Sort - %s', (sortFun: SortFunction<number>) => {
  it('Test 0', async () => {
    expect(sortFun([])).toEqual([])
    expect(sortFun([1])).toEqual([1])
  })

  it('Test 1', async () => {
    const question = [5, 4, 3, 2, 1, 9, 9]
    const answer = [1, 2, 3, 4, 5, 9, 9]

    expect(sortFun(question)).toEqual(answer)
  })

  it('Test 2', async () => {
    const question = [5, 2, 4, 3, 1]
    const answer = [1, 2, 3, 4, 5]

    expect(sortFun(question)).toEqual(answer)
  })
})
