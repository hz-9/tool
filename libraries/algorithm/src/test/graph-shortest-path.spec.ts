/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-06 22:57:35
 * @LastEditors  : Chen Zhen
 */
import { Graph, GraphShortestPath, Vertice } from '../index'

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

  it('breadthFirstSearchShortestPath', async () => {
    const result = GraphShortestPath.breadthFirstSearchShortestPath(graph, 'A')

    const distances = new Map<Vertice<string>, number>()
    const prodecessors = new Map<Vertice<string>, Vertice<string> | undefined>()
    distances.set(new Vertice<string>('A'), 0)
    distances.set(new Vertice<string>('B'), 1)
    distances.set(new Vertice<string>('C'), 1)
    distances.set(new Vertice<string>('D'), 1)
    distances.set(new Vertice<string>('E'), 2)
    distances.set(new Vertice<string>('F'), 2)
    distances.set(new Vertice<string>('G'), 2)
    distances.set(new Vertice<string>('H'), 2)
    distances.set(new Vertice<string>('I'), 3)

    prodecessors.set(new Vertice<string>('A'), undefined)
    prodecessors.set(new Vertice<string>('B'), new Vertice<string>('A'))
    prodecessors.set(new Vertice<string>('C'), new Vertice<string>('A'))
    prodecessors.set(new Vertice<string>('D'), new Vertice<string>('A'))
    prodecessors.set(new Vertice<string>('E'), new Vertice<string>('B'))
    prodecessors.set(new Vertice<string>('F'), new Vertice<string>('B'))
    prodecessors.set(new Vertice<string>('G'), new Vertice<string>('C'))
    prodecessors.set(new Vertice<string>('H'), new Vertice<string>('D'))
    prodecessors.set(new Vertice<string>('I'), new Vertice<string>('E'))

    expect(result.distances).toEqual(distances)
    expect(result.prodecessors).toEqual(prodecessors)
  })

  it('breadthFirstSearchShortestPathString', async () => {
    const result = GraphShortestPath.breadthFirstSearchShortestPathString(graph, 'A')

    const lines: string[] = [
      'A -> B',
      'A -> C',
      'A -> D',
      'A -> B -> E',
      'A -> B -> F',
      'A -> C -> G',
      'A -> D -> H',
      'A -> B -> E -> I',
    ]
    expect(result).toEqual(lines.join('\n'))
  })
})
