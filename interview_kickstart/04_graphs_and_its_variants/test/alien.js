/* Second refactored attempt - Using hashes for visited, arrival, departure, adjList */
function find_order(words) {
  if (words.length === 1) return words[0][0]
  // Array of letter pairs. Eg. [ ['a', 'b'], ['a', 'c'], ['b', 'c'] ]
  const edgeList = buildEdgeList()
  // Hash that maps letters to their neighbors. Eg. { a: ['b', 'c'], b: ['c'] }
  const adjList = buildGraph(edgeList),
    visited = {},
    arrival = {},
    departure = {},
    topSort = []

  let timestamp = 0

  /* Iterate through each letter in adjList. */
  for (const letter in adjList) {
    if (visited[letter] === undefined) {
      /* If dfs returns true, a cycle or back edge was found. 
        Order cannot be determined with given info. */
      if (dfs(letter)) return []
    }
  }

  return topSort.reverse().join('')

  // -----------------------------------------------
  /* This is regular dfs top sort. Watch Omkar's class video on Course Schedule II. */
  function dfs(source) {
    arrival[source] = timestamp
    timestamp++
    visited[source] = 1

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === undefined) {
        if (dfs(neighbor)) return true
      } else {
        if (departure[neighbor] === undefined) return true
      }
    }

    departure[source] = timestamp
    timestamp++
    topSort.push(source)

    return false
  }

  // -----------------------------------------------
  function buildEdgeList() {
    const edgeList = [],
      len = words.length - 1

    for (let i = 0; i < len; i++) {
      const word = words[i],
        nextWord = words[i + 1]

      let j = 0
      /*
      Walk through chars of two consecutive words until the chars
      don't match. THIS IS KEY — THE WHOLE PROBLEM IS BASED ON THIS!
      Two chars at the same position in each word that don't match
      will form a pair in the edge list.
      Eg. 'abb', 'cbb' means ['a', 'c'] form an edgeList pair 
           or 'a' comes before 'c'. 
      */
      while (word[j] && nextWord[j]) {
        if (word[j] !== nextWord[j]) {
          edgeList.push([nextWord[j], word[j]])
          break
        }
        j++
      }
    }

    return edgeList
  }

  // -----------------------------------------------
  function buildGraph(edges) {
    const adjList = {}
    for (const [src, dest] of edges) {
      /* 
      Make sure to add leaf nodes without neighbors to the adjList too!
      Otherwise some letters might be skipped since adjList keys will be
      used to iterate through all the letters. It might also throw error
      when you call dfs(neighbor) and adjList[neighbor] doesn't exist. 
      */
      if (!adjList[src]) adjList[src] = []
      // adjList[src].push(dest) // directed graph so don't need this
      if (!adjList[dest]) adjList[dest] = []
      adjList[dest].push(src)
    }
    return adjList
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
/*
First attempt with arrays of length 26 for visited, arrival, departure, adjList.
Code is verbose and redundant.

*/
function find_order(words) {
  if (words.length === 1) return words[0][0]
  const n = 26,
    letters = new Set(),
    [lettersToNum, numToLetters] = mapLetters(),
    edgeList = buildEdgeList(),
    adjList = buildGraph(n, edgeList),
    visited = new Array(n).fill(-1),
    arrival = new Array(n).fill(-1),
    departure = new Array(n).fill(-1),
    topSort = []

  let timestamp = 0

  for (let v = 0; v < n; v++) {
    if (visited[v] === -1 && letters.has(numToLetters[v])) {
      if (dfs(v)) return []
    }
  }

  const sorted = topSort
  let res = []
  for (const num of sorted) {
    res.push(numToLetters[num])
  }

  return res.join('')

  // -----------------------------------------------
  function dfs(source) {
    arrival[source] = timestamp
    timestamp++
    visited[source] = 1

    for (const neighbor of adjList[source]) {
      if (visited[neighbor] === -1) {
        if (dfs(neighbor)) return true
      } else {
        if (departure[neighbor] === -1) return true
      }
    }

    departure[source] = timestamp
    timestamp++
    topSort.push(source)

    return false
  }

  // -----------------------------------------------
  function buildEdgeList() {
    const edgeList = []

    for (let i = 0; i < words.length - 1; i++) {
      const word = words[i],
        nextWord = words[i + 1]

      if (word[0] !== nextWord[0]) {
        if (!letters.has(word[0])) letters.add(word[0])
        if (!letters.has(nextWord[0])) letters.add(nextWord[0])
        edgeList.push([word[0], nextWord[0]])
      } else {
        let x = 0
        while (word[x] === nextWord[x]) {
          x++
        }
        if (word[x] !== nextWord[x]) edgeList.push([word[x], nextWord[x]])
        if (!letters.has(word[x])) letters.add(word[x])
        if (!letters.has(nextWord[x])) letters.add(nextWord[x])
      }
    }

    return edgeList
  }
  // -----------------------------------------------
  function buildGraph(n, edges) {
    const adjList = new Array(n).fill().map(() => [])
    for (const [src, dest] of edges) {
      adjList[lettersToNum[dest]].push(lettersToNum[src])
    }

    return adjList
  }
  // -----------------------------------------------
  function mapLetters() {
    const letters = {},
      nums = {}
    let charCode = 97
    for (let i = 0; i < 26; i++) {
      letters[String.fromCharCode(charCode)] = i
      nums[i] = String.fromCharCode(charCode)
      charCode++
    }
    return [letters, nums]
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// Top attempt solution 2
/*
 * Complete the function below.
 */
function find_order_not_mine(words) {
  class Vertex {
    constructor(data) {
      this.data = data
      this.neighbors = []
    }
  }

  if (words.length === 1) return words[0][0]

  const adjacencyList = {}
  adjacencyList[words[0][0]] = new Vertex(words[0][0])

  for (let i = 0; i < words.length - 1; i++) {
    let j = 0

    while (words[i][j] && words[i + 1][j]) {
      if (words[i][j] !== words[i + 1][j]) {
        const ch1 = words[i][j]
        const ch2 = words[i + 1][j]

        if (!adjacencyList[ch1]) {
          adjacencyList[ch1] = new Vertex(ch1)
        }
        if (!adjacencyList[ch2]) {
          adjacencyList[ch2] = new Vertex(ch2)
        }

        adjacencyList[ch1].neighbors.push(adjacencyList[ch2])
        break
      }

      j++
    }
  }
  const vertices = Object.values(adjacencyList)

  // console.log(adjacencyList)
  // console.log(vertices)
  // for (const [key, val] of Object.entries(adjacencyList)) {
  //   const neighbors = []
  //   for (const neigh of val.neighbors) {
  //     neighbors.push(neigh.data)
  //   }
  //   console.log(key, ': ', neighbors)
  // }
  const path = topologicalSort(vertices)

  return path.join('')

  function topologicalSort(vertexList) {
    function explore(vertex, visited, path) {
      if (visited[vertex.data]) return

      for (let i = 0; i < vertex.neighbors.length; i++) {
        explore(vertex.neighbors[i], visited, path)
      }

      path.push(vertex.data)
      visited[vertex.data] = true

      return
    }
    const visited = {}
    const path = []

    for (let i = 0; i < vertexList.length; i++) {
      const vertex = vertexList[i]
      explore(vertex, visited, path)
    }

    return path.reverse()
  }
}

// tests
const first = ['baa', 'abcd', 'abca', 'cab', 'cad']

console.log(find_order(first))
console.log(find_order_not_mine(first))
console.log(find_order(['a']))
console.log(find_order(['aaaa']))
