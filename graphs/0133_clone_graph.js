/**
 * // Definition for a Node.
 * function Node(val,neighbors) {
 *    this.val = val;
 *    this.neighbors = neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */

function Node(val, neighbors) {
  this.val = val
  this.neighbors = neighbors
}

//DFS
var cloneGraph = function(nodeToClone) {
  const seen = {}
  const clone = node => {
    if (node === null) return null
    if (seen[node.val]) {
      return seen[node.val]
    }
    const newNode = new Node(node.val, [])
    seen[newNode.val] = newNode
    node.neighbors.forEach(neighbor => {
      newNode.neighbors.push(clone(neighbor))
    })
    return newNode
  }
  return clone(nodeToClone)
}

//BFS with while loop
var cloneGraph = function(nodeToClone) {
  const seen = {}
  const queue = [nodeToClone]
  let newHead, cloneNode, node
  while (queue.length) {
    node = queue.shift()
    cloneNode = seen[node.val]
    if (!newHead) {
      cloneNode = new Node(node.val, [])
      newHead = cloneNode
      seen[node.val] = cloneNode
    }
    node.neighbors.forEach(neighbor => {
      let cloneChild = seen[neighbor.val]
      if (!cloneChild) {
        cloneChild = new Node(neighbor.val, [])
        seen[neighbor.val] = cloneChild
        queue.push(neighbor)
      }
      cloneNode.neighbors.push(cloneChild)
    })
  }
  return newHead
}

const node1 = new Node(1, [])
const node2 = new Node(2, [])
const node3 = new Node(3, [])
const node4 = new Node(4, [])
node1.neighbors = [node2, node4]
node2.neighbors = [node1, node3]
node3.neighbors = [node2, node4]
node4.neighbors = [node3, node1]

console.log(cloneGraph(node1))
