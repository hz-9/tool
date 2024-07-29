/**
 * @Author       : Chen Zhen
 * @Date         : 2024-04-01 00:57:24
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-29 20:25:40
 */
import { Heap } from './_base.heap'

export class MinHeap<T> extends Heap<T> {
  public siftUp(index: number): void {
    const parent = this.getParentIndex(index)

    if (parent !== undefined && this._compareFn(this._list[parent], this._list[index]) > 0) {
      this.swap(parent, index)

      this.siftUp(parent)
    }
  }

  public siftDown(index: number): void {
    let i: number = index

    const left = this.getLeftIndex(index)
    const right = this.getLeftIndex(index)
    const size = this._size

    if (left < size && this._compareFn(this._list[i], this._list[left]) > 0) {
      i = left
    }

    if (right < size && this._compareFn(this._list[i], this._list[right]) > 0) {
      i = right
    }

    if (i !== index) {
      this.swap(i, index)
      this.siftDown(i)
    }
  }
}
