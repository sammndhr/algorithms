/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */

class Node {
  constructor(val, next = null, random = null) {
    this.val = val
    this.next = next
    this.random = random
  }
}

//Iterative
// Time - O(n)
//Space - O(n)

var copyRandomList = function(head) {
  if (!head) return null
  let node = head,
    i = 0,
    copiedHead = null,
    copiedNode = null,
    map = {}
  while (node) {
    const n = new Node(node.val)
    if (!copiedNode) {
      copiedHead = n
      copiedNode = n
    } else {
      copiedNode.next = n
      copiedNode = n
    }
    map[node.val] = n
    node = node.next
  }
  node = head
  copiedNode = copiedHead
  while (node && copiedNode) {
    if (node.random) copiedNode.random = map[node.random.val]
    node = node.next
    copiedNode = copiedNode.next
  }
  return copiedHead
}

//Recursive Using Map so node objects can be used as object keys
var copyRandomList = function(root) {
  const visited = new Map()
  const recurse = head => {
    if (!head) return null
    if (visited.get(head)) return visited.get(head)
    const node = new Node(head.val)
    visited.set(head, node)
    node.next = recurse(head.next)
    node.random = recurse(head.random)
    return node
  }

  return recurse(root)
}

//Mapping the head vals to nodes assuming vals are unique
var copyRandomList = function(root) {
  const visited = {}
  const recurse = head => {
    if (!head) return null
    if (visited[head.val]) return visited[head.val]
    const node = new Node(head.val)
    visited[head.val] = node
    node.next = recurse(head.next)
    node.random = recurse(head.random)
    return node
  }
  return recurse(root)
}

node1 = new Node(1)
node2 = new Node(2)
node3 = new Node(3)
node4 = new Node(4)
node5 = new Node(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

node1.random = node5
node2.random = node1
node4.random = node2
node3.random = node5
