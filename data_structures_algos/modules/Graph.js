const { BFS, DFSRecursive } = require('./GraphTraversal')

class Graph {
  #vertices
  constructor() {
    this.#vertices = new Map()
  }

  addVertex(val) {
    if (this.#vertices.has(val))
      throw `vertex with value ${val} already exists.`

    this.#vertices.set(val, new Set())
  }

  addEdge(vVal, eVal) {
    if (!this.#vertices.has(vVal))
      throw `vertex with value ${vVal} doesn't exist.`
    if (!this.#vertices.has(eVal))
      throw `edge with value ${eVal} doesn't exist.`

    const edges = this.#vertices.get(vVal)
    if (edges.has(eVal)) throw `vertex already has edge ${eVal}.`
    edges.add(eVal)
  }

  getVertexEdges(vVal) {
    if (!this.#vertices.has(vVal))
      throw `vertex with value ${vVal} doesn't exist.`

    return Array.from(this.#vertices.get(vVal))
  }

  hasEdge(vVal, eVal) {
    if (!this.#vertices.has(vVal)) return false
    const edges = this.#vertices.get(vVal)
    return edges.has(eVal)
  }

  hasVertex(vVal) {
    return this.#vertices.has(vVal)
  }

  removeEdge(vVal, eVal) {
    if (!this.#vertices.has(vVal))
      throw `vertex with value ${vVal} doesn't exist.`

    const edges = this.#vertices.get(vVal)
    edges.delete(eVal)
  }

  removeVertex(vVal) {
    if (!this.#vertices.has(vVal))
      throw `vertex with value ${vVal} doesn't exist.`
    this.#vertices.delete(vVal)
  }

  BFS(start, callback) {
    const graph = this
    BFS(start, graph, callback)
  }

  DFS(start, callback) {
    const graph = this
    DFSRecursive(start, graph, callback)
  }

  printGraph() {
    const graph = {}
    for (let [vVal, vertexEdges] of this.#vertices) {
      graph[vVal] = []
      let edges = ''
      for (const edge of vertexEdges) {
        edges += `${edge} `
        graph[vVal].push(edge)
      }

      console.log(`${vVal} -> ${edges}`)
    }
    return graph
  }
}

module.exports = Graph
