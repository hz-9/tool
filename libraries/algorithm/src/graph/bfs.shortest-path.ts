/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:46:38
 * @LastEditTime : 2024-08-09 16:37:00
 * @LastEditors  : Chen Zhen
 */
import { IGraphShortestPathReturn } from './_.shortest-path'
import { breadthFirstSearch } from './bfs.graph-walker'
import { Graph, Vertice } from './graph'

/**
 * @public
 *
 * Using Breadth-first search algorithm to obtain shortest path information.
 *
 * 使用广度优先搜索算法获取最短路径信息。
 *
 * @param graph - The graph to traverse.
 * @param startVertex - The starting vertex for the traversal.
 */
export const breadthFirstSearchShortestPath = <T>(
  graph: Graph<T>,
  startVertex: T | Vertice<T>
): IGraphShortestPathReturn<T> => {
  const startVertexInstance = graph.getVertex(startVertex)

  const distances = new Map<Vertice<T>, number>()
  const prodecessors = new Map<Vertice<T>, Vertice<T> | undefined>()
  if (!startVertexInstance) return { distances, prodecessors }

  breadthFirstSearch(graph, startVertexInstance.vertice, (v, edge) => {
    if (distances.size === 0) {
      distances.set(edge.to, 0)
      prodecessors.set(edge.to, undefined)
    } else {
      distances.set(edge.to, distances.get(edge.from)! + 1)
      prodecessors.set(edge.to, edge.from)
    }
  })

  return { distances, prodecessors }
}

/**
 * @public
 *
 * Using Breadth-first search algorithm to obtain shortest path information.(Return string)
 *
 * 使用广度优先搜索算法获取最短路径信息。(返回字符串)
 *
 * @param graph - The graph to traverse.
 * @param startVertex - The starting vertex for the traversal.
 * @param chars - The separator between vertices. Default is `' -> '`.
 */
export const breadthFirstSearchShortestPathString = <T>(
  graph: Graph<T>,
  startVertex: T | Vertice<T>,
  chars: string = ' -> '
): string => {
  const { distances, prodecessors } = breadthFirstSearchShortestPath(graph, startVertex)

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
