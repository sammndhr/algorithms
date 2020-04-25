const Stack = require('./Stack')
const Queue = require('./Queue')

const BFS = function (root) {
  const res = [],
    queue = new Queue()
  queue.enqueue(root)

  while (!queue.isEmpty()) {
    const node = queue.dequeue()
    res.push(node.val)
    if (node.left) queue.enqueue(node.left)
    if (node.right) queue.enqueue(node.right)
  }
  return res
}

const DFSRecursive = {
  inOrder(root) {
    const res = []
    function recurse(node) {
      if (node !== null) {
        recurse(node.left)
        res.push(node.val)
        recurse(node.right)
      }
    }
    recurse(root)
    return res
  },

  preOrder(root) {
    const res = []
    function recurse(node) {
      if (node !== null) {
        res.push(node.val)
        recurse(node.left)
        recurse(node.right)
      }
    }
    recurse(root)
    return res
  },

  postOrder(root) {
    const res = []
    function recurse(node) {
      if (node !== null) {
        recurse(node.left)
        recurse(node.right)
        res.push(node.val)
      }
    }
    recurse(root)
    return res
  },
}

const DFSIterative = {
  inOrder(root) {
    const res = [],
      stack = new Stack()

    let curr = root

    while (!stack.isEmpty() || curr !== null) {
      if (curr !== null) {
        stack.push(curr)
        curr = curr.left
      } else {
        curr = stack.pop()
        res.push(curr.val)
        curr = curr.right
      }
    }

    return res
  },

  preOrder(root) {
    const res = [],
      stack = new Stack()
    let curr
    stack.push(root)

    while (!stack.isEmpty()) {
      curr = stack.pop()
      res.push(curr.val)
      if (curr.right !== null) stack.push(curr.right)
      if (curr.left !== null) stack.push(curr.left)
    }
    return res
  },

  // Iterative post order using two stacks
  postOrder(root) {
    const res = [],
      stack1 = new Stack(),
      stack2 = new Stack()
    let curr
    stack1.push(root)
    while (!stack1.isEmpty()) {
      curr = stack1.pop()
      stack2.push(curr)
      if (curr.left != null) stack1.push(curr.left)
      if (curr.right != null) stack1.push(curr.right)
    }
    while (!stack2.isEmpty()) {
      curr = stack2.pop()
      res.push(curr.val)
    }
    return res
  },
}

module.exports = { BFS, DFSIterative, DFSRecursive }
