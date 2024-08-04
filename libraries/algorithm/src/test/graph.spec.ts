/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-30 19:31:44
 * @LastEditTime : 2024-08-04 20:42:06
 * @LastEditors  : Chen Zhen
 */
import { Graph, IGraphToArrayItem, Vertice } from '../index'

interface IGraphInfo {
  size: number
  isEmpty: boolean
  vertices: string[]
  toString: string
  toArray: IGraphToArrayItem<string>[]
}

const getGraphInfo = (graph: Graph<string>): IGraphInfo => ({
  size: graph.size,
  isEmpty: graph.isEmpty,
  vertices: graph.vertices.map((v) => v.vertice),
  toString: graph.toString(),
  toArray: graph.toArray(),
})

describe('Graph', () => {
  const graph = new Graph<string>()

  it('Graph - addVertex', async () => {
    graph.addVertex('A')
    graph.addVertex('B')

    expect(graph.addVertex('A')).toBe(graph.addVertex('A'))

    expect(getGraphInfo(graph)).toEqual({
      size: 2,
      isEmpty: false,
      vertices: ['A', 'B'],
      toString: '',
      toArray: [],
    })

    const verticeC = new Vertice('C')
    const verticeD = new Vertice('D')

    expect(graph.addVertex(verticeC)).toBe(verticeC)
    expect(graph.addVertex(verticeD)).toBe(verticeD)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - hasVertex', async () => {
    expect(graph.hasVertex('A')).toBe(true)
    expect(graph.hasVertex('A2')).toBe(false)

    expect(graph.hasVertex(new Vertice('A'))).toBe(true)
    expect(graph.hasVertex(new Vertice('A2'))).toBe(false)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - getVertex', async () => {
    expect(graph.getVertex('A')).toEqual(new Vertice('A'))
    expect(graph.getVertex('A2')).toBeUndefined()

    expect(graph.getVertex(new Vertice('A'))).toEqual(new Vertice('A'))
    expect(graph.getVertex(new Vertice('A2'))).toBeUndefined()

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - removeVertex', async () => {
    expect(graph.removeVertex('A')).toBe(true)
    expect(graph.removeVertex('A2')).toBe(false)

    expect(graph.removeVertex(new Vertice('B'))).toBe(true)
    expect(graph.removeVertex(new Vertice('B2'))).toBe(false)

    expect(getGraphInfo(graph)).toEqual({
      size: 2,
      isEmpty: false,
      vertices: ['C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - reAddVertex', async () => {
    graph.clear()

    expect(getGraphInfo(graph)).toEqual({
      size: 0,
      isEmpty: true,
      vertices: [],
      toString: '',
      toArray: [],
    })

    expect(graph.addVertex('A')).toEqual(new Vertice('A'))
    expect(graph.addVertex('B')).toEqual(new Vertice('B'))
    expect(graph.addVertex('C')).toEqual(new Vertice('C'))
    expect(graph.addVertex('D')).toEqual(new Vertice('D'))

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - addEdge', async () => {
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C', 2)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => B(1), C(2)', 'B => A(1)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 1 },
            { vertice: 'C', weight: 2 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 1 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })

    graph.addEdge('A', 'B', 1)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => B(1), C(2)', 'B => A(1)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 1 },
            { vertice: 'C', weight: 2 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 1 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })

    graph.addEdge('A', 'B', 3)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => B(3), C(2)', 'B => A(3)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 3 },
            { vertice: 'C', weight: 2 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 3 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })

    graph.addEdge('B', 'A', 1.5)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => B(1.5), C(2)', 'B => A(1.5)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 1.5 },
            { vertice: 'C', weight: 2 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 1.5 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })
  })

  it('Graph - hasEdge', async () => {
    expect(graph.hasEdge('A', 'B')).toBe(true)
    expect(graph.hasEdge('B', 'A')).toBe(true)

    expect(graph.hasEdge(new Vertice('A'), 'B')).toBe(true)
    expect(graph.hasEdge(new Vertice('B'), 'A')).toBe(true)

    expect(graph.hasEdge('C', 'B')).toBe(false)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => B(1.5), C(2)', 'B => A(1.5)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 1.5 },
            { vertice: 'C', weight: 2 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 1.5 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })
  })

  it('Graph - removeEdge', async () => {
    expect(graph.removeEdge('A', 'B')).toBe(true)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: ['A => C(2)', 'C => A(2)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [{ vertice: 'C', weight: 2 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 2 }],
        },
      ],
    })

    expect(graph.removeEdge('A', 'B')).toBe(false)
    expect(graph.removeEdge('A', new Vertice('C'))).toBe(true)

    expect(getGraphInfo(graph)).toEqual({
      size: 4,
      isEmpty: false,
      vertices: ['A', 'B', 'C', 'D'],
      toString: '',
      toArray: [],
    })
  })

  it('Graph - removeVertex 2', async () => {
    graph.clear()

    graph.addVertex('A')
    graph.addVertex('B')
    graph.addEdge('A', 'B')

    expect(graph.removeVertex('A')).toBe(false)

    graph.addEdge('A', 'C')

    expect(getGraphInfo(graph)).toEqual({
      size: 3,
      isEmpty: false,
      vertices: ['A', 'B', 'C'],
      toString: ['A => B(1), C(1)', 'B => A(1)', 'C => A(1)'].join('\n'),
      toArray: [
        {
          vertice: 'A',
          edges: [
            { vertice: 'B', weight: 1 },
            { vertice: 'C', weight: 1 },
          ],
        },
        {
          vertice: 'B',
          edges: [{ vertice: 'A', weight: 1 }],
        },
        {
          vertice: 'C',
          edges: [{ vertice: 'A', weight: 1 }],
        },
      ],
    })
  })
})
