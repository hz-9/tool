/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-08 18:51:31
 * @LastEditors  : Chen Zhen
 */
import { SearchCallback } from '../types/index'
import { Edge, Graph, Vertice } from './graph'

/**
 * @public
 *
 * Depth-first search algorithm (DFS).
 *
 * 深度优先搜索算法（DFS）。
 *
 * @param graph - The graph to traverse.
 * @param startVertex - The starting vertex for the traversal.
 * @param callback - The callback function to execute for each visited vertex.
 * @param explore - The callback function to execute for each explore vertex.
 */
export const depthFirstSearch = <T>(
  graph: Graph<T>,
  startVertex: T | Vertice<T>,
  callback: SearchCallback<T, Edge<Vertice<T>>>,
  explore: SearchCallback<T, Edge<Vertice<T>>> = () => {}
): void => {
  const visited = new Set<T>()

  const _depthFirstSearchItem = (edgeItem: Edge<Vertice<T>>): void => {
    const toVertex = edgeItem.to

    if (toVertex && !visited.has(toVertex.vertice)) {
      visited.add(toVertex.vertice)
      callback(toVertex.vertice, edgeItem)

      const toEdgeList = graph.adjList.get(toVertex) ?? []

      if (!toEdgeList.length) {
        // 不会存在此情况
      } else if (toEdgeList.length === 1) {
        explore(toVertex.vertice, toEdgeList[0])
      } else {
        for (let i = 0; i < toEdgeList.length; i += 1) {
          _depthFirstSearchItem(toEdgeList[i])
        }
        explore(toVertex.vertice, toEdgeList[0])
      }
    }
  }

  const startVertexInstance = graph.getVertex(startVertex)
  if (startVertexInstance) {
    const firstEdge = new Edge<Vertice<T>>(startVertexInstance, startVertexInstance, 1)
    _depthFirstSearchItem(firstEdge)
  }
}

/**
 * @public
 *
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
export const depthFirstSearchVariety = <T>(
  graph: Graph<T>,
  startVertex: T | Vertice<T>,
  callback: SearchCallback<T, Edge<Vertice<T>>>
): void => {
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
