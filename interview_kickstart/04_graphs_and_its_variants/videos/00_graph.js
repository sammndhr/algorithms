const { LinkedList } = require('../../../utils')

class Graph {
  // Using Adjacency list to store graph edge info. It'll be an array of LinkedList of integers.
  #adjList
  // vertices count
  #vCount
  constructor(size = 0) {
    this.#adjList = new Array(size).fill().map(() => new LinkedList())
    this.#vCount = size
  }

  get adjList() {
    return this.#adjList
  }

  addEdge(start, end, biDir = true) {
    this.#adjList[start].appendToTail(end)
    if (biDir) {
      this.#adjList[end].appendToTail(start)
    }
  }

  hasEulerianCycle() {
    let odd = 0
    for (const vertex of this.#adjList) {
      if (vertex.size % 2 === 1) odd++
    }
    if (odd === 0) return true
    else return false
  }

  hasEulerianPath() {
    let odd = 0
    for (const vertex of this.#adjList) {
      if (vertex.size % 2 === 1) odd++
    }
    if (odd === 0 || odd === 2) return true
    else return false
  }
}
