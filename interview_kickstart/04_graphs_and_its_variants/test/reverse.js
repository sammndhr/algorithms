// First attempt
function Node(val = 0) {
  this.val = val
  this.neighbours = []
}

/* 
First intuition:
1. Use a stack to iterate through all neighbors of all nodes while
   creating and saving new nodes from old node into a hash map (key --> new Node(key))
2. Save old nodes into another hash map. (key --> old node)
3. Create another hash - visited.
4. Use a stack to iterate through all neighbors of all nodes and reverse the connections
  (access new and old nodes with hashMap and hashMap1).
*/

function build_other_graph(node) {
  let head
  const hashMap = {},
    hashMap1 = {},
    stack = [node]

  while (stack.length) {
    const curr = stack.pop(),
      currNode = new Node(curr.val)
    hashMap[curr.val] = currNode
    hashMap1[curr.val] = curr

    if (!head) head = currNode

    for (const neighbour of curr.neighbours) {
      if (!hashMap[neighbour.val]) stack.push(neighbour)
    }
  }

  stack.push(node)
  const visited = {}

  while (stack.length) {
    const curr = stack.pop()

    if (!visited[curr.val]) {
      visited[curr.val] = 1
      for (const neighbour of hashMap1[curr.val].neighbours) {
        hashMap[neighbour.val].neighbours.push(hashMap[curr.val])
        stack.push(neighbour)
      }
    }
  }

  return head
}

// Tests
const node0 = new Node(0)
const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)

node1.neighbours.push(node2)
node2.neighbours.push(node3)
node3.neighbours.push(node4)
node4.neighbours.push(node1)

const res = build_other_graph(node1)

const stack = [res]
const visited = {}
while (stack.length) {
  const curr = stack.pop()
  if (!visited[curr.val]) {
    visited[curr.val] = new Node(curr.val)
    for (const neighbour of curr.neighbours) {
      visited[curr.val].neighbours.push(neighbour.val)
      if (!visited[neighbour.val]) stack.push(neighbour)
    }
  }
}

console.log(visited)
