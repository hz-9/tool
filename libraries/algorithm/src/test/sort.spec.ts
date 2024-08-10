/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-09 16:37:56
 * @LastEditTime : 2024-08-10 14:15:19
 * @LastEditors  : Chen Zhen
 */
import {
  bubbleSort,
  bubbleSortBase,
  bucketSort,
  countingSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
  shuffleRandom,
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
  | typeof heapSort<T>

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
  heapSort,
])('Sort - %s', (sortFun: SortFunction<number>) => {
  it('Test 0', async () => {
    expect(sortFun([])).toEqual([])
    expect(sortFun([1])).toEqual([1])
  })

  it('Test 1', async () => {
    const question = shuffleRandom([5, 4, 3, 2, 1, 9, 9])
    const answer = [1, 2, 3, 4, 5, 9, 9]

    expect(sortFun(question)).toEqual(answer)
  })

  it.each([
    shuffleRandom([5, 2, 4, 3, 1]),
    shuffleRandom([5, 2, 4, 3, 1]),
    shuffleRandom([5, 2, 4, 3, 1]),
    shuffleRandom([5, 2, 4, 3, 1]),
    shuffleRandom([5, 2, 4, 3, 1]),
  ])('Test 2', async (...question: number[]) => {
    const answer = [1, 2, 3, 4, 5]

    expect(sortFun(question)).toEqual(answer)
  })
})
