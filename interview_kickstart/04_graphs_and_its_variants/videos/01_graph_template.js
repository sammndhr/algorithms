/*
1. Build the graph:
Most of the time you'll be given the number of vertices of the graph and the edge list.
First thing you need to do is build a graph from that information.
*/
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

/*
2. Graph Traversal
You'll then have to traverse the graph updating a 'visited' array for nodes that's been seen.
dfs and bfs are two graph traversals that can be used.
*/
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

/* 
3. Outer Loop
Because a graph might not be connected, you'll need an outer loop function.
This function will iterate through the visited array and call dfs/bfs on each node that hasn't been visited.
*/
function outerLoop(n, edges) {
  const visited = new Array(n).fill(-1),
    adjList = buildGraph(n, edges)

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1) {
      // traverse graph with either bfs or dfs
      // dfs(v, visited, adjList)
      bfs(v, visited, adjList)
    }
  }
}
