/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-08 18:30:26
 * @LastEditors  : Chen Zhen
 */
import { Graph, Vertice } from './graph'
import { GraphWalker } from './graph-walker'

/**
 * @public
 */
export interface IGraphShortestPathReturn<T> {
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
   * Using Breadth-first search algorithm to obtain shortest path information.
   *
   * 使用广度优先搜索算法获取最短路径信息。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   */
  public static breadthFirstSearchShortestPath<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>
  ): IGraphShortestPathReturn<T> {
    const startVertexInstance = graph.getVertex(startVertex)

    const distances = new Map<Vertice<T>, number>()
    const prodecessors = new Map<Vertice<T>, Vertice<T> | undefined>()
    if (!startVertexInstance) return { distances, prodecessors }

    GraphWalker.breadthFirstSearch(graph, startVertexInstance.vertice, (v, edge) => {
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
   *
   * Using Breadth-first search algorithm to obtain shortest path information.(Return string)
   *
   * 使用广度优先搜索算法获取最短路径信息。(返回字符串)
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param chars - The separator between vertices. Default is `' -> '`.
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

  /**
   *
   * Using Depth-first search algorithm to obtain shortest path information.
   * FIXME: The results are not accurate, not recommended for use.
   *
   * 使用深度优先搜索算法获取最短路径信息。
   * ！！！结果不够准确，不建议使用。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   */
  public static depthFirstSearchShortestPath<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>
  ): IGraphShortestPathReturn<T> {
    const startVertexInstance = graph.getVertex(startVertex)

    const distances = new Map<Vertice<T>, number>()
    const prodecessors = new Map<Vertice<T>, Vertice<T> | undefined>()
    if (!startVertexInstance) return { distances, prodecessors }

    GraphWalker.depthFirstSearch(graph, startVertexInstance.vertice, (v, edge) => {
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
   *
   * Using Depth-first search algorithm to obtain shortest path information.(Return string)
   * FIXME: The results are not accurate, not recommended for use.
   *
   * 使用深度优先搜索算法获取最短路径信息。(返回字符串)
   * ！！！结果不够准确，不建议使用。
   *
   * @param graph - The graph to traverse.
   * @param startVertex - The starting vertex for the traversal.
   * @param chars - The separator between vertices. Default is `' -> '`.
   */
  public static depthFirstSearchShortestPathString<T>(
    graph: Graph<T>,
    startVertex: T | Vertice<T>,
    chars: string = ' -> '
  ): string {
    const { distances, prodecessors } = this.depthFirstSearchShortestPath(graph, startVertex)

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
