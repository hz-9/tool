/**
 * @Author       : Chen Zhen
 * @Date         : 2024-08-08 18:48:18
 * @LastEditTime : 2024-08-08 18:49:47
 * @LastEditors  : Chen Zhen
 */
import { Vertice } from './graph'

/**
 * @public
 */
export interface IGraphShortestPathReturn<T> {
  distances: Map<Vertice<T>, number>

  prodecessors: Map<Vertice<T>, Vertice<T> | undefined>
}
