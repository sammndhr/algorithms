/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

//mine - iterative
var levelOrder = function(root) {
  if (!root) return []
  const resArr = [],
    queue = [root]
  root.level = 0
  while (queue.length) {
    node = queue.shift()
    l = node.level
    !resArr[l] ? resArr.push([node.val]) : resArr[l].push(node.val)
    left = node.left
    right = node.right
    if (left) {
      left.level = l + 1
      queue.push(left)
    }
    if (right) {
      right.level = l + 1
      queue.push(right)
    }
  }
  return resArr
}

//leetcode - iterative
var levelOrder = function(root) {
  if (!root) return []
  const levels = [],
    queue = [root]
  let level = 0,
    levelsLen

  while (queue.length) {
    levels.push([])
    levelsLen = queue.length

    for (let i = 0; i < levelsLen; i++) {
      const node = queue.shift()
      levels[level].push(node.val)
      left = node.left
      right = node.right
      if (left) queue.push(left)
      if (right) queue.push(right)
    }
    level++
  }
  return levels
}

//recursive
var levelOrderRecursive = root => {
  if (!root) return []
  const levels = []
  const recurse = (node, level) => {
    if (!levels[level]) levels.push([])
    levels[level].push(node.val)
    if (node.left) recurse(node.left, level + 1)
    if (node.right) recurse(node.right, level + 1)
  }
  recurse(root, 0)
  return levels
}

/* ALGORITHMS AND NOTES RELATED TO BSF */

//BFS traversal - log node values in breadth first order
const breathFirst = root => {
  const breadthFirstRecursive = queue => {
    if (queue.length === 0) {
      return
    }
    const node = queue.shift()
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
    breadthFirstRecursive(queue)
  }
  breadthFirstRecursive([root])
}

//Return array of node values in BSF array that return true for a filter function that is passed as a callback
//Iterative
var BFSelect = (root, callback) => {
  const queue = [root],
    results = []
  root.depth = 0

  while (queue.length) {
    let len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      if (callback(node.value, node.depth)) {
        results.push(node.value)
      }
      for (let j = 0; j < node.children.length; j++) {
        const element = node.children[j]
        element.depth = node.depth + 1
        queue.push(element)
      }
    }
  }
  return results
}

//Recursive
var BFSelect = (root, callback) => {
  const queue = [root],
    results = []
  root.depth = 0
  const recurse = queue => {
    const node = queue.shift()
    if (!node) return
    if (callback(node.value, node.depth)) {
      results.push(node.value)
    }
    for (let j = 0; j < node.children.length; j++) {
      const element = node.children[j]
      element.depth = node.depth + 1
      queue.push(element)
    }
    recurse(queue)
  }
  recurse(queue)
  return results
}
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

// breathFirst(node1)
node2 = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [], depth: 2 },
        { value: 5, children: [], depth: 2 }
      ],
      depth: 1
    },
    {
      value: 3,
      children: [
        { value: 6, children: [], depth: 2 },
        { value: 7, children: [], depth: 2 }
      ],
      depth: 1
    }
  ],
  depth: 0
}

console.log(
  BFSelect(node2, (val, depth) => {
    return val % 2
  })
)
// console.log(levelOrderRecursive(node1))
// console.log(levelOrderRecursive(node1))
