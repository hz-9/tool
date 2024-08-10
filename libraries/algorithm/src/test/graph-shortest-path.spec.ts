/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-09 16:35:47
 * @LastEditors  : Chen Zhen
 */
import {
  Graph,
  Vertice,
  breadthFirstSearchShortestPath,
  breadthFirstSearchShortestPathString,
  depthFirstSearchShortestPath,
  depthFirstSearchShortestPathString,
} from '../index'

describe('Graph shortest path', () => {
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

  const distancesResult = new Map<Vertice<string>, number>()
  const prodecessorsResult = new Map<Vertice<string>, Vertice<string> | undefined>()
  distancesResult.set(new Vertice<string>('A'), 0)
  distancesResult.set(new Vertice<string>('B'), 1)
  distancesResult.set(new Vertice<string>('C'), 1)
  distancesResult.set(new Vertice<string>('D'), 1)
  distancesResult.set(new Vertice<string>('E'), 2)
  distancesResult.set(new Vertice<string>('F'), 2)
  distancesResult.set(new Vertice<string>('G'), 2)
  distancesResult.set(new Vertice<string>('H'), 2)
  distancesResult.set(new Vertice<string>('I'), 3)

  prodecessorsResult.set(new Vertice<string>('A'), undefined)
  prodecessorsResult.set(new Vertice<string>('B'), new Vertice<string>('A'))
  prodecessorsResult.set(new Vertice<string>('C'), new Vertice<string>('A'))
  prodecessorsResult.set(new Vertice<string>('D'), new Vertice<string>('A'))
  prodecessorsResult.set(new Vertice<string>('E'), new Vertice<string>('B'))
  prodecessorsResult.set(new Vertice<string>('F'), new Vertice<string>('B'))
  prodecessorsResult.set(new Vertice<string>('G'), new Vertice<string>('C'))
  prodecessorsResult.set(new Vertice<string>('H'), new Vertice<string>('D'))
  prodecessorsResult.set(new Vertice<string>('I'), new Vertice<string>('E'))

  const linesResult: string = [
    'A -> B',
    'A -> C',
    'A -> D',
    'A -> B -> E',
    'A -> B -> F',
    'A -> C -> G',
    'A -> D -> H',
    'A -> B -> E -> I',
  ].join('\n')

  it('breadthFirstSearchShortestPath', async () => {
    const result = breadthFirstSearchShortestPath(graph, 'A')

    expect(result.distances).toEqual(distancesResult)
    expect(result.prodecessors).toEqual(prodecessorsResult)
  })

  it('breadthFirstSearchShortestPathString', async () => {
    const result = breadthFirstSearchShortestPathString(graph, 'A')
    expect(result).toEqual(linesResult)
  })

  it('depthFirstSearchShortestPath', async () => {
    depthFirstSearchShortestPath(graph, 'A')
  })

  it('depthFirstSearchShortestPathString', async () => {
    depthFirstSearchShortestPathString(graph, 'A')
  })
})
