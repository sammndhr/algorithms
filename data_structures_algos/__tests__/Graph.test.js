const { Graph } = require('../modules')

test('creates a new instance of Graph', () => {
  const g = new Graph()
  expect(g instanceof Graph).toBe(true)
})

describe('scoped graph', () => {
  let g
  beforeEach(() => {
    g = new Graph()

    for (let i = 0; i < 6; i++) {
      g.addVertex(i)
    }

    g.addEdge(0, 1)
    g.addEdge(0, 3)
    g.addEdge(1, 2)
    g.addEdge(1, 4)
    g.addEdge(2, 3)
    g.addEdge(2, 0)
    g.addEdge(3, 4)
    g.addEdge(3, 1)
    g.addEdge(3, 5)
    g.addEdge(4, 5)
    g.addEdge(5, 0)
    g.addEdge(5, 2)
  })

  describe('printGraph', () => {
    test('prints all vertices and edges of graph and returns object with vertices as the keys and array of edges as the value', () => {
      const res = {
        0: [1, 3],
        1: [2, 4],
        2: [3, 0],
        3: [4, 1, 5],
        4: [5],
        5: [0, 2],
      }
      expect(g.printGraph()).toEqual(res)
    })
  })
})

describe('addVertex', () => {
  test('adds vertex to graph with specified value', () => {
    g = new Graph()
    g.addVertex(1)
    const res = { 1: [] }
    expect(g.printGraph()).toEqual(res)
  })

  test('throws error if vertex already exists in graph', () => {
    const g = new Graph()
    g.addVertex(1)

    expect(() => {
      g.addVertex(1)
    }).toThrow(`vertex with value 1 already exists.`)
  })
})

describe('addEdge', () => {
  test('adds edge to vertex if the edge does not already exist', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)
    const res = { 1: [2], 2: [] }
    expect(g.printGraph()).toEqual(res)
  })

  test('throws error if vertex does not exist in graph', () => {
    g = new Graph()
    g.addVertex(1)

    expect(() => {
      g.addEdge(2, 1)
    }).toThrow(`vertex with value 2 doesn't exist.`)
  })

  test('throws error if edge does not exist in graph', () => {
    g = new Graph()
    g.addVertex(1)

    expect(() => {
      g.addEdge(1, 2)
    }).toThrow(`edge with value 2 doesn't exist.`)
  })

  test('throws error if vertex already has the specified edge', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)

    expect(() => {
      g.addEdge(1, 2)
    }).toThrow(`vertex already has edge 2.`)
  })
})

describe('getVertexEdges', () => {
  test('returns array of edges if vertex exists in graph', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addVertex(3)
    g.addEdge(1, 2)
    g.addEdge(1, 3)
    const res = [2, 3]

    expect(g.getVertexEdges(1)).toEqual(res)
  })

  test('throws error if vertex does not exist in graph', () => {
    g = new Graph()

    expect(() => {
      g.getVertexEdges(1)
    }).toThrow(`vertex with value 1 doesn't exist.`)
  })
})

describe('hasEdge', () => {
  test('returns true if vertex has specified edge', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)

    expect(g.hasEdge(1, 2)).toBe(true)
  })

  test('returns false if vertex does not have specified edge', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)

    expect(g.hasEdge(2, 1)).toBe(false)
  })

  test('returns false if vertex does not exist in graph', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)

    expect(g.hasEdge(3, 1)).toBe(false)
  })
})

describe('hasVertex', () => {
  test('returns true if vertex exists in graph', () => {
    g = new Graph()
    g.addVertex(1)

    expect(g.hasVertex(1)).toBe(true)
  })
  test('returns false if vertex does not exist in graph', () => {
    g = new Graph()
    g.addVertex(1)

    expect(g.hasVertex(2)).toBe(false)
  })
})

describe('removeEdge', () => {
  test('successfully removes edge from vertex.', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)
    g.addEdge(1, 2)

    const beforeRemoval = { 1: [2], 2: [] }
    expect(g.printGraph()).toEqual(beforeRemoval)

    g.removeEdge(1, 2)
    const res = { 1: [], 2: [] }
    expect(g.printGraph()).toEqual(res)
  })
  test('throws error if vertex does not exist in graph', () => {
    g = new Graph()

    expect(() => {
      g.removeEdge(1, 2)
    }).toThrow(`vertex with value 1 doesn't exist.`)
  })
})

describe('removeVertex', () => {
  test('successfully removes vertex from graph.', () => {
    g = new Graph()
    g.addVertex(1)
    g.addVertex(2)

    expect(g.hasVertex(2)).toBe(true)
    g.removeVertex(2)
    expect(g.hasVertex(2)).toBe(false)
  })

  test('throws error if vertex does not exist in graph', () => {
    g = new Graph()

    expect(() => {
      g.removeVertex(1)
    }).toThrow(`vertex with value 1 doesn't exist.`)
  })
})
