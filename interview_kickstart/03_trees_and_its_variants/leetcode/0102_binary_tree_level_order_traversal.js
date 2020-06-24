// https://www.notion.so/Trees-Leetcode-Omkar-s-screenshots-0b5cf6ce6f384c24bf3dd6945b0cfba6#77fd9f3dcd8f4e5b8cdb70dc6c36195d

/* 
Time, Space - O(n) with a linked list queue
- same as bfs with while loop and queue
- but create another loop that will go from 0 to queue.length
  and initialize temp arr
- pop or shift from queue here and push val into temp arr.
  push left & right nodes
- end of first loop, push temp arr to res arr
*/

var levelOrder = function (root) {
  const res = []
  if (!root) return res
  let q = new Queue()
  q.enqueue(root)

  while (!q.isEmpty()) {
    const numNodes = q.size,
      temp = []

    for (let i = 0; i < numNodes; i++) {
      const node = q.dequeue()
      temp.push(node.val)
      if (node.left) q.enqueue(node.left)
      if (node.right) q.enqueue(node.right)
    }

    res.push(temp)
  }

  return res
}

// Practicing implementing Queue. But can use array too.
class QueueNode {
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }

  enqueue(item) {
    const node = new QueueNode(item)
    if (this.last) {
      this.last.next = node
    }
    this.last = node

    if (!this.first) this.first = this.last
    this.size++
  }

  dequeue() {
    if (!this.first) return null
    const data = this.first.data
    this.first = this.first.next
    if (!this.first) this.last = null
    this.size--
    return data
  }

  isEmpty() {
    return this.first === null
  }
}

// Tests
const node1 = {
  val: 10,
  right: {
    val: 15,
    right: { val: 20, right: null, left: null },
    left: { val: 6, right: null, left: null }
  },
  left: {
    val: 5,
    right: { val: 7, right: null, left: null },
    left: { val: 1, right: null, left: null }
  }
}

console.log(levelOrder(node1))
