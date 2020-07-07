// First attempt
function find_order(words) {
  if (words.length === 1) return words[0][0]
  const n = 26,
    letters = new Set(),
    [lettersToNum, numToLetters] = mapNumToLetters(),
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
  function mapNumToLetters() {
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

const first = ['baa', 'abcd', 'abca', 'cab', 'cad']

console.log(find_order(first))
console.log(find_order(['a']))
