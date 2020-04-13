const { BFS, DFSRecursive } = require('./GraphTraversal')

const Graph = (() => {
  let vertices

  class Graph {
    constructor() {
      vertices = new Map()
    }

    addVertex(val) {
      if (vertices.has(val)) throw `vertex with value ${val} already exists.`

      vertices.set(val, new Set())
    }

    addEdge(vVal, eVal) {
      if (!vertices.has(vVal)) throw `vertex with value ${vVal} doesn't exist.`
      if (!vertices.has(eVal)) throw `edge with value ${eVal} doesn't exist.`

      const edges = vertices.get(vVal)
      if (edges.has(eVal)) throw `vertex already has edge ${eVal}.`
      edges.add(eVal)
    }

    getVertexEdges(vVal) {
      if (!vertices.has(vVal)) throw `vertex with value ${vVal} doesn't exist.`

      return Array.from(vertices.get(vVal))
    }

    hasEdge(vVal, eVal) {
      if (!vertices.has(vVal)) return false
      const edges = vertices.get(vVal)
      return edges.has(eVal)
    }

    hasVertex(vVal) {
      return vertices.has(vVal)
    }

    removeEdge(vVal, eVal) {
      if (!vertices.has(vVal)) throw `vertex with value ${vVal} doesn't exist.`

      const edges = vertices.get(vVal)
      edges.delete(eVal)
    }

    removeVertex(vVal) {
      if (!vertices.has(vVal)) throw `vertex with value ${vVal} doesn't exist.`
      vertices.delete(vVal)
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
      for (let [vVal, vertexEdges] of vertices) {
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
  return Graph
})()

module.exports = Graph
