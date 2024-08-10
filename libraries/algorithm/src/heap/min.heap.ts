/**
 * @Author       : Chen Zhen
 * @Date         : 2024-04-01 00:57:24
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-09 11:36:34
 */
import { Compare } from '../_base'
import { Heap } from './_base.heap'

/**
 * @public
 *
 *  Min Heap Class
 *
 *  最小堆
 *
 */
export class MinHeap<T> extends Heap<T> {
  public siftUp(index: number): void {
    const parent = this.getParentIndex(index)

    if (parent !== undefined && this._compareFn(this._list[parent], this._list[index]) === Compare.BIGGER_THAN) {
      this.swap(parent, index)

      this.siftUp(parent)
    }
  }

  public siftDown(index: number): void {
    let i: number = index

    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this._size

    if (left < size && this._compareFn(this._list[i], this._list[left]) === Compare.BIGGER_THAN) {
      i = left
    }

    if (right < size && this._compareFn(this._list[i], this._list[right]) === Compare.BIGGER_THAN) {
      i = right
    }

    if (i !== index) {
      this.swap(i, index)
      this.siftDown(i)
    }
  }
}
