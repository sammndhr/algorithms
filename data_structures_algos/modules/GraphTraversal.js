const Queue = require('./Queue')
const Stack = require('./Stack')

// breadth first search with queue
const BFS = (start, graph, callback) => {
  // will keep track of new vertices with queue and visited nodes with a set
  const queue = new Queue(),
    visited = new Set()

  queue.enqueue(start)
  //vertex is visited if it gets pushed into queue.
  visited.add(start)

  while (!queue.isEmpty()) {
    const curr = queue.dequeue(),
      edges = graph.getVertexEdges(curr)
    // call callback on each vertex that gets dequeued
    callback(curr)

    //iterate over all edges and add the unvisited ones to queue
    for (const eVal of edges) {
      if (!visited.has(eVal)) {
        queue.enqueue(eVal)
        visited.add(eVal)
      }
    }
  }
}

//iterative depth first search. Almost same as BFS. Only difference is the stack vs queue
const DFSIterative = (start, graph, callback) => {
  const stack = new Stack(),
    visited = new Set()

  stack.push(start)
  visited.add(start)

  while (!stack.isEmpty()) {
    const curr = stack.pop()
    edges = graph.getVertexEdges(curr)

    callback(curr)

    for (const eVal of edges) {
      if (!visited.has(eVal)) {
        stack.push(eVal)
        visited.add(eVal)
      }
    }
  }
}

// Recursive depth first search
const DFSRecursive = (start, graph, callback) => {
  const visited = new Set()

  const recursiveDFS = (curr) => {
    if (visited.has(curr)) return

    callback(curr)
    visited.add(curr)

    const edges = graph.getVertexEdges(curr)

    for (const eVal of edges) {
      if (!visited.has(eVal)) {
        recursiveDFS(eVal)
      }
    }
  }
  recursiveDFS(start)
}

module.exports = { BFS, DFSRecursive, DFSIterative }
