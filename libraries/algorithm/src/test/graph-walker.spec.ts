/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-09 16:35:21
 * @LastEditors  : Chen Zhen
 */
import { Graph, breadthFirstSearch, depthFirstSearch, depthFirstSearchVariety } from '../index'

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
    breadthFirstSearch(graph, 'A', (v, edge) => {
      list.push(v)
    })
    expect(list).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

    const list2: string[] = []
    breadthFirstSearch(graph, 'X', (v, edge) => {
      list2.push(v)
    })
    expect(list2).toEqual([])
  })

  it('depthFirstSearch', async () => {
    const list: string[] = []

    depthFirstSearch(graph, 'A', (v, edge) => {
      list.push(v)
    })

    expect(list).toEqual(['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H'])

    const list2: string[] = []
    depthFirstSearch(graph, 'X', (v, edge) => {
      list2.push(v)
    })
    expect(list2).toEqual([])
  })

  it('depthFirstSearchVariety', async () => {
    const list: string[] = []

    depthFirstSearchVariety(graph, 'A', (v, vertice) => {
      list.push(v)
    })

    expect(list).toEqual(['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H'])

    const list2: string[] = []
    depthFirstSearchVariety(graph, 'X', (v, vertice) => {
      list2.push(v)
    })
    expect(list2).toEqual([])
  })
})
