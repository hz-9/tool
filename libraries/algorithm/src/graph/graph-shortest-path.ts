/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-08 18:52:49
 * @LastEditors  : Chen Zhen
 */
import { breadthFirstSearchShortestPath, breadthFirstSearchShortestPathString } from './bfs.shortest-path'
import { depthFirstSearchShortestPath, depthFirstSearchShortestPathString } from './dfs.shortest-path'

/**
 * @public
 *
 * Graph shortest path class.
 *
 * 图最短路径类。
 */
export const GraphShortestPath = {
  breadthFirstSearchShortestPath,
  breadthFirstSearchShortestPathString,
  depthFirstSearchShortestPath,
  depthFirstSearchShortestPathString,
} as const
