const { BFS, DFSIterative, DFSRecursive } = require('../modules').GraphTraversal
const { Graph } = require('../modules')

describe('scoped bst tree', () => {
  let g
  beforeEach(() => {
    g = new Graph()

    for (let i = 65; i < 76; i++) {
      g.addVertex(String.fromCharCode(i))
    }

    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('B', 'D')
    g.addEdge('C', 'F')
    g.addEdge('D', 'C')
    g.addEdge('D', 'E')
    g.addEdge('D', 'F')
    g.addEdge('E', 'C')
    g.addEdge('E', 'G')
    g.addEdge('F', 'A')
    g.addEdge('G', 'H')
    g.addEdge('G', 'I')
    g.addEdge('H', 'C')
    g.addEdge('I', 'E')
    g.addEdge('I', 'H')
    g.addEdge('I', 'J')
    g.addEdge('J', 'F')
  })

  describe('Breadth First Search, Level Order Traversal', () => {
    test('traverses graph in level order', () => {
      const res = [],
        levelOrderArr = ['D', 'C', 'E', 'F', 'G', 'A', 'H', 'I', 'B', 'J']

      function callback(val) {
        res.push(val)
      }

      BFS('D', g, callback)
      expect(res).toEqual(levelOrderArr)
    })
  })

  describe('Recursive Depth First Search', () => {
    test('recursively traverses graph depth first', () => {
      const res = [],
        dfsArr = ['D', 'C', 'F', 'A', 'B', 'E', 'G', 'H', 'I', 'J']

      function callback(val) {
        res.push(val)
      }

      DFSRecursive('D', g, callback)

      expect(res).toEqual(dfsArr)
    })
  })

  describe('Iterative Depth First Search', () => {
    test('iteratively traverses graph depth first', () => {
      const res = [],
        dfsArr = ['D', 'F', 'A', 'B', 'E', 'G', 'I', 'J', 'H', 'C']

      function callback(val) {
        res.push(val)
      }

      DFSIterative('D', g, callback)

      expect(res).toEqual(dfsArr)
    })
  })
})
