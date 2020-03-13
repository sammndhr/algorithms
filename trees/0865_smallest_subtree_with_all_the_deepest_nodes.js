/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

const TreeNode = require('./utils.js')

var subtreeWithAllDeepest = function(root) {
  let deepest = 0,
    subtree,
    parents = {},
    deepestNodes = [0]
  const queue = [root]
  root.depth = 0
  root.parent = null
  while (queue.length) {
    const curr = queue.shift(),
      depth = curr.depth
    left = curr.left
    right = curr.right
    if (!(right && left)) {
      if (deepestNodes[0] < depth) {
        deepestNodes = [depth]
      }
      deepestNodes.push(curr)
    }
    if (right) {
      right.depth = depth + 1
      queue.push(right)
      right.parent = curr
      if (deepest < right.depth) {
        deepest = right.depth
      }
    }
    if (left) {
      left.depth = depth + 1
      queue.push(left)
      left.parent = curr
      if (deepest < left.depth) {
        deepest = left.depth
      }
    }
  }

  const recurse = () => {}

  let parent,
    test = deepestNodes.slice(1)
  while (test.length) {
    const curr = test.pop()
    if (!curr.parent) {
      continue
    }
    parent = curr.parent

    if (!parents[curr.parent.val]) {
      parents[curr.parent.val] = [parent]
    }
    if (test.length === 0) {
      test
    }
  }
  console.log(parents)
  // return parent
  // return subtree
}

const node = {
  val: 3,
  right: {
    val: 1,
    right: { val: 8, right: null, left: null },
    left: { val: 0, right: null, left: null }
  },
  left: {
    val: 5,
    right: {
      val: 2,
      right: { val: 4, right: null, left: null },
      left: { val: 7, right: null, left: null }
    },
    left: {
      val: 6,
      left: { val: 10, right: null, left: null },
      right: { val: 9, right: null, left: null }
    }
  }
}
const node1 = {
  val: 3,
  right: {
    val: 1,
    right: { val: 8, right: null, left: null },
    left: { val: 0, right: null, left: null }
  },
  left: {
    val: 5,
    right: {
      val: 2,
      right: { val: 4, right: null, left: null },
      left: { val: 7, right: null, left: null }
    },
    left: { val: 6, right: null, left: null }
  }
}
console.log(subtreeWithAllDeepest(node))
console.log('--------------------------')
console.log(subtreeWithAllDeepest(node1))
