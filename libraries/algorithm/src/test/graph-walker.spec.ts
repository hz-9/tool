/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-06 22:56:02
 * @LastEditors  : Chen Zhen
 */
import { Graph, GraphWalker } from '../index'

describe('Graph Walker', () => {
  const graph = new Graph<string>()

  graph.addVertex('A')
  graph.addVertex('B')
  graph.addVertex('C')
  graph.addVertex('D')
  graph.addVertex('E')
  graph.addVertex('F')
  graph.addVertex('G')
  graph.addVertex('H')
  graph.addVertex('I')
  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('B', 'E')
  graph.addEdge('B', 'F')
  graph.addEdge('C', 'D')
  graph.addEdge('C', 'G')
  graph.addEdge('D', 'G')
  graph.addEdge('D', 'H')
  graph.addEdge('E', 'I')

  it('breadthFirstSearch', async () => {
    const list: string[] = []
    GraphWalker.breadthFirstSearch(graph, 'A', (v, vertice) => {
      list.push(v)
    })
    expect(list).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

    const list2: string[] = []
    GraphWalker.breadthFirstSearch(graph, 'X', (v, vertice) => {
      list2.push(v)
    })
    expect(list2).toEqual([])
  })

  it('depthFirstSearch', async () => {
    const list: string[] = []

    GraphWalker.depthFirstSearch(graph, 'A', (v, vertice) => {
      list.push(v)
    })

    expect(list).toEqual(['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H'])

    const list2: string[] = []
    GraphWalker.depthFirstSearch(graph, 'X', (v, vertice) => {
      list2.push(v)
    })
    expect(list2).toEqual([])
  })
})
