function outerLoop(n, edges) {
  const visited = new Array(n).fill(-1),
    adjList = buildGraph(n, edges),
    levelOrder = {},
    treeEdges = []
  let components = 0

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1) {
      components++
      bfs(v, visited, adjList)
    }
  }
  console.log('-------------------------------------------------------------')
  console.log('Adjacency List built with given edge list.')
  console.log('adjList', adjList)
  console.log('-------------------------------------------------------------')
  console.log('Tree Edges of BFS tree excluding cross edges.')
  console.log('treeEdges', treeEdges)
  console.log('-------------------------------------------------------------')
  console.log('Level order per component of connected or disconnected graph.')
  console.log('level Order', levelOrder)
  // -----------------------------------------------
  function bfs(source, visited, adjList) {
    const queue = []

    queue.push(source)
    visited[source] = 1
    let node

    while (queue.length) {
      // Time complexity of queue.shift() is NOT O(1). Implement queue with linked list for O(1)
      const len = queue.length,
        temp = []
      for (let i = 0; i < len; i++) {
        node = queue.shift()
        temp.push(node)

        for (const neighbor of adjList[node]) {
          if (visited[neighbor] === -1) {
            treeEdges.push([node, neighbor])
            visited[neighbor] = 1
            queue.push(neighbor)
          }
        }
      }
      levelOrder[components] !== undefined
        ? levelOrder[components].push(temp)
        : (levelOrder[components] = [temp])
    }
  }
  // -----------------------------------------------
  function buildGraph() {
    let adjList = new Array(n).fill().map(() => [])

    for (const edge of edges) {
      const src = edge[0],
        dest = edge[1]
      adjList[src].push(dest)
      adjList[dest].push(src)
    }

    return adjList
  }
}

// tests
outerLoop(6, [
  [1, 0],
  [2, 1],
  [3, 1],
  [4, 3],
  [3, 0],
  [0, 2],
  [2, 4],
  [3, 5],
  [0, 5]
])
