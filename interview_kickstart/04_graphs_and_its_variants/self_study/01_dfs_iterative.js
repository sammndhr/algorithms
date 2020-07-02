function dfsIterative(source, visited, adjList) {
  let stack = []
  stack.push(source)

  while (stack.length) {
    const node = stack.pop()
    visited[node] = 1

    console.log(node)

    for (let i = adjList[node] - 1; i > -1; i--) {
      const neighbor = adjList[node][i]

      if (visited[neighbor] === -1) {
        visited[neighbor] = 1
        stack.push(neighbor)
      }
    }
  }
}
