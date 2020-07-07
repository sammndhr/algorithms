var validTree = function (n, edges) {
  const adjList = buildGraph(),
    visited = new Array(n).fill(-1),
    parent = new Array(n).fill(-1)

  let components = 0

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1) {
      components++
      if (components > 1) return false //graph isn't connected, not tree
      // if (bfs(v)) return false //cycle found, not tree
      if (dfs(v)) return false //cycle found, not tree
    }
  }
  return true
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
  // -----------------------------------------------
  function bfs(source) {
    const queue = []
    queue.push(source)
    visited[source] = 1

    while (queue.length) {
      const node = queue.shift()
      for (const neighbor of adjList[node]) {
        if (visited[neighbor] === -1) {
          visited[neighbor] = 1 //tree edge
          parent[neighbor] = node
          queue.push(neighbor)
        } else if (parent[node] !== neighbor) return true //cross edge
      }
    }
    return false
  }
  // -----------------------------------------------
  function dfs(source) {
    visited[source] = 1

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === -1) {
        parent[neighbor] = source
        if (dfs(neighbor)) return true
      } else if (parent[source] !== neighbor) return true
    }
    return false
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
/* 
Advanced Graph Theory + DFS
  Graph theory - For the graph to be a valid tree, it must have exactly n - 1 edges. Any less, and it can't possibly be fully connected. Any more, and it has to contain cycles. Additionally, if the graph is fully connected and contains exactly n - 1 edges, it can't possibly contain a cycle, and therefore must be a tree!

  So we need to check two things:
    1. Check whether or not there are n - 1 edges. If there's not, then return false.
    2. Check whether or not the graph is fully connected. Return true if it is, false if otherwise.
*/
var validTree = function (n, edges) {
  if (edges.length !== n - 1) return false

  const adjList = buildGraph(),
    visited = new Array(n).fill(-1)

  let components = 0

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1) {
      components++
      if (components > 1) return false //graph isn't connected, not tree
      dfs(v)
    }
  }
  return true

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

  // -----------------------------------------------
  function dfs(source) {
    visited[source] = 1

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === -1) dfs(neighbor)
    }
  }
}

// Tests
console.log(
  validTree(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4]
  ])
)
console.log(
  validTree(7, [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 4],
    [4, 5],
    [4, 6]
  ])
)
console.log(
  validTree(8, [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [4, 7],
    [4, 5],
    [5, 6]
  ])
)
