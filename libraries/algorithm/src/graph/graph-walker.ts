/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-07 23:57:22
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
    callback: SearchCallback<T, Edge<Vertice<T>>>
  ): void {
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

  /**
   * Depth-first search algorithm (DFS).
   *
   * 深度优先搜索算法（DFS）。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param callback - The callback function to execute for each visited vertex.
   * @param explore - The callback function to execute for each explore vertex.
   */
  public static depthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    callback: SearchCallback<T, Edge<Vertice<T>>>,
    explore: SearchCallback<T, Edge<Vertice<T>>> = () => {}
  ): void {
    const startVertexInstance = graph.getVertex(startVertex)
    if (startVertexInstance) {
      const firstEdge = new Edge<Vertice<T>>(startVertexInstance, startVertexInstance, 1)
      this._depthFirstSearchItem(graph, firstEdge, callback, explore, new Set<T>())
    }
  }

  private static _depthFirstSearchItem<T>(
    graph: Graph<T>,
    edge: Edge<Vertice<T>>,
    callback: SearchCallback<T, Edge<Vertice<T>>>,
    explore: SearchCallback<T, Edge<Vertice<T>>>,
    visited: Set<T>
  ): void {
    const toVertex = edge.to

    if (toVertex && !visited.has(toVertex.vertice)) {
      visited.add(toVertex.vertice)
      callback(toVertex.vertice, edge)

      const toEdgeList = graph.adjList.get(toVertex) ?? []

      if (!toEdgeList.length) {
        // 不会存在此情况
      } else if (toEdgeList.length === 1) {
        explore(toVertex.vertice, toEdgeList[0])
      } else {
        for (let i = 0; i < toEdgeList.length; i += 1) {
          this._depthFirstSearchItem(graph, toEdgeList[i], callback, explore, visited)
        }

        explore(toVertex.vertice, toEdgeList[0])
      }
    }
  }

  /**
   * Depth-first search algorithm (DFS).
   * A variant implementation.
   *
   * 深度优先搜索算法（DFS）。
   * 一个变种实现。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param callback - The callback function to execute for each visited vertex.
   */
  public static depthFirstSearchVariety<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    callback: SearchCallback<T, Edge<Vertice<T>>>
  ): void {
    const startVertexInstance = graph.getVertex(startVertex)

    if (!startVertexInstance) return

    const visited = new Map<Vertice<T>, true>()

    const todoList: Array<Edge<Vertice<T>>> = [new Edge(startVertexInstance, startVertexInstance, 1)]

    while (todoList.length) {
      const first = todoList.pop()!
      if (!visited.has(first.to)) {
        callback(first.to.vertice, first)
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
