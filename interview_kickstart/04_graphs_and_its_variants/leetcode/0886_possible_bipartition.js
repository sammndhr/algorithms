// Same as "785. Is Graph Bipartite" but we have to build the graph from the given edge list. Also it's not clear from the prompt, if it is even a graph problem.

// With bfs
var possibleBipartition = function (N, dislikes) {
  // Since N will be 1...N
  const n = N + 1,
    adjList = buildGraph(n, dislikes),
    visited = new Array(n).fill(-1),
    parent = new Array(n).fill(-1),
    distance = new Array(n).fill(-1)

  for (let v = 1; v < n; v++) {
    if (visited[v] === -1) {
      if (!bfs(v)) return false
    }
  }

  return true

  // -----------------------------------------------
  function bfs(source) {
    const queue = []
    queue.push(source)

    visited[source] = 1
    distance[source] = 0

    while (queue.length) {
      const node = queue.shift()
      for (const neighbor of adjList[node]) {
        if (visited[neighbor] == -1) {
          visited[neighbor] = 1
          parent[neighbor] = node
          distance[neighbor] = distance[node] + 1
          queue.push(neighbor)
        } else {
          // cycle
          if (parent[node] !== neighbor) {
            // not bipartite (odd length cycle found)
            if (distance[node] == distance[neighbor]) return false
          }
        }
      }
    }
    return true
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// with dfs
var possibleBipartition = function (N, dislikes) {
  // Since N will be 1...N
  const n = N + 1,
    adjList = buildGraph(n, dislikes),
    visited = new Array(n).fill(-1),
    parent = new Array(n).fill(-1),
    color = new Array(n).fill(-1)

  for (let v = 1; v < n; v++) {
    if (visited[v] === -1) {
      if (!dfs(v)) return false
    }
  }

  return true

  // -----------------------------------------------
  function dfs(source) {
    visited[source] = 1

    if (parent[source] === -1) color[source] = 0
    else color[source] = 1 - color[parent[source]]

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === -1) {
        parent[neighbor] = source
        if (!dfs(neighbor)) return false
      } else {
        if (color[source] === color[neighbor]) return false
      }
    }
    return true
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// Common: Build graph(adjacent list) from number of vertices and edge list
function buildGraph(n, edges) {
  let adjList = new Array(n).fill().map(() => [])

  for (const edge of edges) {
    const src = edge[0],
      dest = edge[1]

    adjList[src].push(dest)
    adjList[dest].push(src)
  }
  return adjList
}
