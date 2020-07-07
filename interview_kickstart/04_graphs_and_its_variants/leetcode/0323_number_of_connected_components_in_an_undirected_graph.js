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

function dfs(node, visited, adjList) {
  visited[node] = 1

  for (const neighbor of adjList[node]) {
    if (visited[neighbor] === -1) dfs(neighbor, visited, adjList)
  }
}

function bfs(source, visited, adjList) {
  const queue = []
  queue.push(source)
  visited[source] = 1

  while (queue.length) {
    // Time complexity of queue.shift() is NOT O(1). Implement queue with linked list for O(1)
    const node = queue.shift()
    for (const neighbor of adjList[node]) {
      if (visited[neighbor] === -1) {
        visited[neighbor] = 1
        queue.push(neighbor)
      }
    }
  }
}

var countComponents = function (n, edges) {
  const visited = new Array(n).fill(-1),
    adjList = buildGraph(n, edges)
  let components = 0

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1) {
      components++
      // either bfs or dfs works
      // dfs(v, visited, adjList)
      bfs(v, visited, adjList)
    }
  }
  return components
}

// Tests
console.log(countComponents(2, [[1, 0]]))
console.log(
  countComponents(5, [
    [0, 1],
    [1, 2],
    [3, 4]
  ])
)
