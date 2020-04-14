const { Graph, Queue } = require('../../utils')

const isConnectedBFS = (graph, start, end) => {
  const queue = new Queue(),
    visited = new Set()
  queue.enqueue(start)

  while (!queue.isEmpty()) {
    const curr = queue.dequeue(),
      edges = graph.getVertexEdges(curr)

    for (const edge of edges) {
      if (!visited.has(edge)) {
        if (edge === end) return true
        queue.enqueue(edge)
        visited.add(edge)
      }
    }
  }
  return false
}

/*
n = number of vertices
m = number of edges

Time Complexity - O(m)
Space complexity - O(n) //from queue
*/

/* ---------------------------------------------------------------------------- */

const isConnectedDFS = (graph, start, end) => {
  const visited = new Set()

  const dfs = (curr) => {
    if (curr === end) {
      return true
    }

    visited.add(curr)

    const edges = graph.getVertexEdges(curr)

    for (const edge of edges) {
      if (!visited.has(edge)) {
        if (dfs(edge)) return true
      }
    }
    return false
  }

  return dfs(start)
}

/*
n = number of vertices
m = number of edges

Time Complexity - O(m)
Space complexity - O(n) //from call stack
*/

/* ---------------------------------------------------------------------------- */
// Tests
const g = new Graph()

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
// g.addEdge('E', 'G')
g.addEdge('F', 'A')
g.addEdge('G', 'H')
g.addEdge('G', 'I')
g.addEdge('H', 'C')
g.addEdge('I', 'E')
g.addEdge('I', 'H')
g.addEdge('I', 'J')
g.addEdge('J', 'F')

console.log(isConnectedBFS(g, 'A', 'I'))
console.log(isConnectedDFS(g, 'A', 'I'))

g.addEdge('E', 'G')

console.log(isConnectedBFS(g, 'A', 'I'))
console.log(isConnectedDFS(g, 'A', 'I'))
