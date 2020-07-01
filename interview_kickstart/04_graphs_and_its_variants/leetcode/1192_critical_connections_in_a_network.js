var criticalConnections = function (n, connections) {
  const adjList = buildGraph(n, connections),
    visited = new Array(n).fill(-1),
    arrival = new Array(n).fill(-1),
    oldestArrival = new Array(n).fill(-1),
    parent = new Array(n).fill(-1),
    departure = new Array(n).fill(-1),
    result = []

  let timestamp = 0

  dfs(0)
  return result

  // -----------------------------------------------
  function dfs(source) {
    arrival[source] = timestamp
    timestamp++
    oldestArrival[source] = arrival[source]
    visited[source] = 1

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === -1) {
        parent[neighbor] = source
        oldestArrival[source] = Math.min(oldestArrival[source], dfs(neighbor))
      } else {
        // This is a back edge, hence a cycle
        if (neighbor !== parent[source]) {
          oldestArrival[source] = Math.min(
            oldestArrival[source],
            arrival[neighbor]
          )
        }
      }
    }

    if (oldestArrival[source] === arrival[source] && source !== 0)
      result.push([source, parent[source]])

    departure[source] = timestamp
    timestamp++

    return oldestArrival[source]
  }

  // -----------------------------------------------
  function buildGraph(n, edges) {
    const adjList = new Array(n).fill().map(() => [])

    for (const [src, dest] of edges) {
      adjList[src].push(dest)
      adjList[dest].push(src)
    }

    return adjList
  }
}

// tests
console.log(
  criticalConnections(4, [
    [0, 1],
    [1, 2],
    [2, 0],
    [1, 3]
  ])
)
