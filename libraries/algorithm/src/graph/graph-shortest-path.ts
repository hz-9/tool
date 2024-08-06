/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-06 22:56:50
 * @LastEditors  : Chen Zhen
 */
import { Edge, Graph, Vertice } from './graph'

/**
 * @public
 */
export interface IGraphBreadthFirstSearchShortestPathReturn<T> {
  distances: Map<Vertice<T>, number>

  prodecessors: Map<Vertice<T>, Vertice<T> | undefined>
}

/**
 * @public
 *
 * Graph shortest path class.
 *
 * 图最短路径类。
 */
export class GraphShortestPath {
  /**
   *
   * Breadth-first search algorithm to obtain shortest path information.
   *
   * 使用广度优先搜索算法获取最短路径信息。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   */
  public static breadthFirstSearchShortestPath<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>
  ): IGraphBreadthFirstSearchShortestPathReturn<T> {
    const startVertexInstance = graph.getVertex(startVertex)

    const visited = new Set()
    const distances = new Map<Vertice<T>, number>()
    const prodecessors = new Map<Vertice<T>, Vertice<T> | undefined>()
    if (!startVertexInstance) return { distances, prodecessors }

    distances.set(startVertexInstance, 0)
    prodecessors.set(startVertexInstance, undefined)

    const todoList: Array<Edge<Vertice<T>>> = [new Edge(startVertexInstance, startVertexInstance, 1)]
    visited.add(startVertexInstance)

    while (todoList.length) {
      const first = todoList.shift()!

      const toList = graph.adjList.get(first.to)
      if (toList) {
        toList.forEach((e) => {
          if (!visited.has(e.to)) {
            distances.set(e.to, distances.get(first.to)! + 1)
            prodecessors.set(e.to, first.to)
            todoList.push(e)
            visited.add(e.to)
          }
        })
      }
    }

    return { distances, prodecessors }
  }

  /**
   *
   * Breadth-first search algorithm to obtain shortest path information.(Return string)
   *
   * 使用广度优先搜索算法获取最短路径信息。(返回字符串)
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param chars - The separator between vertices. Default is ' -> '.
   */
  public static breadthFirstSearchShortestPathString<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    chars: string = ' -> '
  ): string {
    const { distances, prodecessors } = this.breadthFirstSearchShortestPath(graph, startVertex)

    if (!distances.size) return ''

    const startVertexInstance = graph.getVertex(startVertex)!
    const lines: string[] = []
    graph.vertices.forEach((vertex, index) => {
      if (vertex !== startVertexInstance) {
        const stack: Vertice<T>[] = []
        for (let v = vertex; v !== startVertexInstance; v = prodecessors.get(v)!) {
          stack.unshift(v)
        }
        stack.unshift(startVertexInstance)
        lines.push(stack.map((v) => v.vertice).join(chars))
      }
    })
    return lines.join('\n')
  }
}
