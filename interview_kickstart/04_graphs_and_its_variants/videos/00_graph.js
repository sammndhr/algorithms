const { LinkedList } = require('../../../utils')

class Graph {
  // Using Adjacency list to store graph edge info. It'll be an array of LinkedList of integers.
  #adjList
  // vertices count
  #vCount
  constructor(size = 0) {
    this.#adjList = []
    this.#vCount = size
    this._fillAdjList(size)
  }

  get adjList() {
    return this.#adjList
  }

  // Can't do new Array(size).fill(new LinkedList()) cause fill only works with static values
  _fillAdjList(size) {
    for (let i = 0; i < size; i++) {
      this.#adjList.push(new LinkedList())
    }
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
