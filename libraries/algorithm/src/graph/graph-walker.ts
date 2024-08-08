/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-06 11:26:46
 * @LastEditTime : 2024-08-08 18:45:03
 * @LastEditors  : Chen Zhen
 */
import { breadthFirstSearch } from './bfs.graph-walker'
import { depthFirstSearch, depthFirstSearchVariety } from './dfs.graph-walker'

/**
 * @public
 *
 * Graph walker class.
 *
 * 图遍历类。
 */
export const GraphWalker = {
  breadthFirstSearch,
  depthFirstSearch,
  depthFirstSearchVariety,
} as const
