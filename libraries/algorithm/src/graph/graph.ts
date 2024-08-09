/**
 * @Author       : Chen Zhen
 * @Date         : 2024-04-02 11:29:16
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-08-04 20:41:34
 */
import { Base, EqualsFn, defaultEquals } from '../_base'

/**
 * Remove elements from an array based on a callback function.
 *
 * 从数组中移除元素。
 *
 * @param array - The array to be processed.
 * @param callback - The callback function to determine if an element should be removed.
 *
 * @returns An array of removed elements.
 */
const arrayRemove = <T>(array: Array<T>, callback: (item: T, index: number, array: T[]) => boolean): T[] => {
  let i = -1
  let len = array ? array.length : 0
  const result: Array<T> = []

  /* eslint-disable no-plusplus */
  while (++i < len) {
    const value = array[i]
    if (callback(value, i, array)) {
      result.push(value)

      Array.prototype.splice.call(array, i--, 1)
      len--
    }
  }

  /* eslint-enable no-plusplus */

  return result
}

/**
 * @public
 *
 * Vertex class.
 *
 * 顶点类。
 */
export class Vertice<T> {
  public readonly vertice: T

  public constructor(vertice: T) {
    this.vertice = vertice
  }

  public toString(): string {
    return `${this.vertice}`
  }
}

/**
 * @public
 *
 * Edge class.
 *
 * 边类。
 */
export class Edge<V> {
  public readonly from: V

  public readonly to: V

  public weight: number

  public constructor(from: V, to: V, weight: number) {
    this.from = from
    this.to = to
    this.weight = weight
  }
}

/**
 * @public
 *
 *  Graph class toArray function returns an array item.
 *
 *  Graph 类 toArray 函数返回的数组项。
 */
export interface IGraphToArrayItem<T> {
  vertice: T
  edges: Array<{ vertice: T; weight: number }>
}

/**
 * @public
 *
 * Graph class
 *
 * 图类。(邻接表)
 */
export class Graph<T> implements Base<IGraphToArrayItem<T>> {
  /**
   * Whether the graph is directed.
   *
   * 图是否为有向图。
   */
  public readonly isDirected: boolean

  /**
   * Array of vertices.
   *
   * 顶点数组。
   */
  public readonly vertices: Array<Vertice<T>>

  /**
   * Map of adjacency lists.
   *
   * 邻接表的映射。
   */
  public readonly adjList: Map<Vertice<T>, Array<Edge<Vertice<T>>>>

  /**
   * Function to determine if two values are equal.
   *
   * 判断两个值是否相等的函数。
   */
  protected readonly _equalsFn: (a?: T, b?: T) => boolean

  public constructor(isDirected: boolean = false, equalsFn: EqualsFn<T> = defaultEquals) {
    this.isDirected = isDirected
    this.vertices = []

    /**
     * TODO: It's better to use a dictionary type.
     */
    this.adjList = new Map<Vertice<T>, Array<Edge<Vertice<T>>>>()

    this._equalsFn = equalsFn
  }

  public get size(): number {
    return this.vertices.length
  }

  public get isEmpty(): boolean {
    return this.vertices.length === 0
  }

  /**
   * Add a vertex to the graph.
   *
   * 添加顶点到图中。
   *
   * @param vertex - The vertex to be added.
   *
   * @returns The added vertex.
   */
  public addVertex(vertex: T | Vertice<T>): Vertice<T> {
    const v = vertex instanceof Vertice ? vertex : new Vertice<T>(vertex)

    const has = this.vertices.find((i) => this._equalsFn(i.vertice, v.vertice))
    if (has) return has

    this.vertices.push(v)
    return v
  }

  /**
   * Check if a vertex exists in the graph.
   *
   * 检查顶点是否存在于图中。
   *
   * @param vertex - The vertex to check.
   *
   * @returns Whether the vertex exists.
   */
  public hasVertex(vertex: T | Vertice<T>): boolean {
    return !!this.getVertex(vertex)
  }

  /**
   * Get a vertex object from the graph.
   *
   * 从图中获取顶点对象。
   *
   * @param vertex - The vertex to get.
   *
   * @returns The vertex object if found, otherwise undefined.
   */
  public getVertex(vertex: T | Vertice<T>): Vertice<T> | undefined {
    const v = vertex instanceof Vertice ? vertex : new Vertice<T>(vertex)
    return this.vertices.find((i) => this._equalsFn(i.vertice, v.vertice))
  }

  /**
   * Remove a vertex from the graph.
   *
   * 从图中删除顶点。
   *
   * @param vertex - The vertex to remove.
   *
   * @returns Whether the vertex is successfully removed.
   *  Returns false if the vertex doesn't exist or if it is being used by any edges.
   */
  public removeVertex(vertex: T | Vertice<T>): boolean {
    const v = this.getVertex(vertex)
    if (!v) return false
    if (this.adjList.has(v)) return false

    arrayRemove<Vertice<T>>(this.vertices, (i) => this._equalsFn(i.vertice, v.vertice))
    return true
  }

  /**
   * Add an edge to the graph.
   *
   * 添加边到图中。
   *
   * @param fromVertex - The first vertex of the edge. (If the graph is directed, the order of vertices matters.)
   * @param toVertex - The second vertex of the edge.
   * @param weight - The weight of the edge. Default value is 1.
   */
  public addEdge(fromVertex: T | Vertice<T>, toVertex: T | Vertice<T>, weight: number = 1): void {
    let fromV = this.getVertex(fromVertex)
    let toV = this.getVertex(toVertex)
    if (!fromV) fromV = this.addVertex(fromVertex)
    if (!toV) toV = this.addVertex(toVertex)
    const fromVertice = fromV.vertice
    const toVertice = toV.vertice

    let fromArray = this.adjList.get(fromV)
    if (!fromArray) {
      fromArray = []
      this.adjList.set(fromV, fromArray)
    }

    const hasEdge = fromArray.find((i) => this._equalsFn(i.to.vertice, toVertice))
    if (hasEdge) {
      hasEdge.weight = weight
    } else {
      fromArray.push(new Edge(fromV, toV, weight))
    }

    if (!this.isDirected) {
      // For undirected graphs, add the edge in both directions.
      let toArray = this.adjList.get(toV)
      if (!toArray) {
        toArray = []
        this.adjList.set(toV, toArray)
      }
      const hasToEdge = toArray.find((i) => this._equalsFn(i.to.vertice, fromVertice))
      if (hasToEdge) {
        hasToEdge.weight = weight
      } else {
        toArray.push(new Edge(toV, fromV, weight))
      }
    }
  }

  /**
   * Check if an edge exists in the graph.
   *
   * 检查边是否存在于图中。
   *
   * @param fromVertex - The first vertex of the edge. (If the graph is directed, the order of vertices matters.)
   * @param toVertex - The second vertex of the edge.
   *
   * @returns Whether the edge exists.
   */
  public hasEdge(fromVertex: T | Vertice<T>, toVertex: T | Vertice<T>): boolean {
    const fromV = this.getVertex(fromVertex)
    const toV = this.getVertex(toVertex)
    if (!fromV || !toV) return false

    const adjItem = this.adjList.get(fromV)
    if (!adjItem) return false
    return !!adjItem.find((i) => this._equalsFn(i.to.vertice, toV.vertice))
  }

  /**
   * Remove an edge from the graph.
   *
   *从图中删除边。
   *
   * @param fromVertex - The first vertex of the edge. (If the graph is directed, the order of vertices matters.)
   * @param toVertex - The second vertex of the edge.
   *
   * @returns Whether the edge is successfully removed.
   */
  public removeEdge(fromVertex: T | Vertice<T>, toVertex: T | Vertice<T>): boolean {
    const fromV = this.getVertex(fromVertex)
    const toV = this.getVertex(toVertex)
    if (!fromV || !toV) return false

    const adjItem = this.adjList.get(fromV)
    if (!adjItem) return false
    arrayRemove<Edge<Vertice<T>>>(adjItem, (i) => this._equalsFn(i.to.vertice, toV.vertice))
    if (!adjItem.length) this.adjList.delete(fromV)

    if (!this.isDirected) {
      const toAdjItem = this.adjList.get(toV)
      if (!toAdjItem) return false
      arrayRemove<Edge<Vertice<T>>>(toAdjItem, (i) => this._equalsFn(i.to.vertice, fromV.vertice))
      if (!toAdjItem.length) this.adjList.delete(toV)
    }

    return true
  }

  public clear(): void {
    this.vertices.length = 0
    this.adjList.clear()
  }

  public toString(): string {
    let str = ''
    this.adjList.forEach((value, key) => {
      const s = `${key.vertice} => ${value.map((i) => `${i.to.vertice}(${i.weight})`).join(', ')}`
      str += str === '' ? s : `\n${s}`
    })
    return str
  }

  public toArray(): IGraphToArrayItem<T>[] {
    const array: IGraphToArrayItem<T>[] = []

    this.adjList.forEach((value, key) => {
      array.push({
        vertice: key.vertice,
        edges: value.map((i) => ({ vertice: i.to.vertice, weight: i.weight })),
      })
    })

    return array
  }
}
