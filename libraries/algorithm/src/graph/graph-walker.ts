/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-06 22:55:20
 * @LastEditors  : Chen Zhen
 */
import { SearchCallback } from '../types/index'
import { Edge, Graph, Vertice } from './graph'

/**
 * @public
 *
 * Graph walker class.
 *
 * 图遍历类。
 */
export class GraphWalker {
  /**
   * Breadth-first search algorithm (BFS).
   *
   * 广度优先搜索算法（BFS）。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param callback - The callback function to execute for each visited vertex.
   */
  public static breadthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    callback: SearchCallback<T, Vertice<T>>
  ): void {
    const startVertexInstance = graph.getVertex(startVertex)

    if (!startVertexInstance) return

    const visited = new Map<Vertice<T>, true>()

    const todoList: Array<Edge<Vertice<T>>> = [new Edge(startVertexInstance, startVertexInstance, 1)]

    while (todoList.length) {
      const first = todoList.shift()!
      if (!visited.has(first.to)) {
        callback(first.to.vertice, first.to)
        visited.set(first.to, true)
        const toList = graph.adjList.get(first.to)
        if (toList) {
          toList.forEach((e) => {
            todoList.push(e)
          })
        }
      }
    }
  }

  /**
   * Depth-first search algorithm (DFS).
   *
   * 深度优先搜索算法（DFS）。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param callback - The callback function to execute for each visited vertex.
   */
  public static depthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    callback: SearchCallback<T, Vertice<T>>
  ): void {
    const startVertexInstance = graph.getVertex(startVertex)

    if (!startVertexInstance) return

    const visited = new Map<Vertice<T>, true>()

    const todoList: Array<Edge<Vertice<T>>> = [new Edge(startVertexInstance, startVertexInstance, 1)]

    while (todoList.length) {
      const first = todoList.pop()!
      if (!visited.has(first.to)) {
        callback(first.to.vertice, first.to)
        visited.set(first.to, true)
        const toList = graph.adjList.get(first.to)
        if (toList) {
          const reversedToList = [...toList].reverse()
          reversedToList.forEach((e) => {
            todoList.push(e)
          })
        }
      }
    }
  }
}
