/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-08 18:51:09
 * @LastEditors  : Chen Zhen
 */
import { SearchCallback } from '../types/index'
import { Edge, Graph, Vertice } from './graph'

/**
 * @public
 *
 * Breadth-first search algorithm (BFS).
 *
 * 广度优先搜索算法（BFS）。
 *
 * @param graph - The graph to traverse.
 * @param startVertex - The starting vertex for the traversal.
 * @param callback - The callback function to execute for each visited vertex.
 */
export const breadthFirstSearch = <T>(
  graph: Graph<T>,
  startVertex: T | Vertice<T>,
  callback: SearchCallback<T, Edge<Vertice<T>>>
): void => {
  const startVertexInstance = graph.getVertex(startVertex)

  if (!startVertexInstance) return

  const visited = new Map<Vertice<T>, true>()

  const firstEdge = new Edge(startVertexInstance, startVertexInstance, 1)
  const todoList: Array<Edge<Vertice<T>>> = [firstEdge]
  visited.set(startVertexInstance, true)
  callback(startVertexInstance.vertice, firstEdge)

  while (todoList.length) {
    const first = todoList.shift()!

    const toList = graph.adjList.get(first.to)
    if (toList && toList?.length > 1) {
      toList.forEach((e) => {
        if (!visited.has(e.to)) {
          callback(e.to.vertice, e)
          todoList.push(e)
          visited.set(e.to, true)
        }
      })
    }
  }
}
