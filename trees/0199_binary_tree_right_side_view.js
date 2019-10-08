/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  const res = []
  let maxDepth = 0

  const recurse = (node, depth) => {
    if (!node) return
    if (depth > maxDepth || depth === 0) {
      res.push(node.val)
    }
    maxDepth = Math.max(maxDepth, depth)

    if (!node.right && node.left) {
      recurse(node.left, depth + 1)
    } else {
      recurse(node.right, depth + 1)
    }
    recurse(node.left, depth + 1)
  }
  recurse(root, 0)

  return res
}

//leetcode input [1,2,3,null,5,null,4,7,null ]
var node1 = {
  val: 1,
  right: { val: 3, right: null, left: { val: 4, right: null, left: null } },
  left: { val: 2, right: { val: 5, right: null, left: { val: 7, right: null, left: null } }, left: null }
}

var node2 = {
  val: 1,
  right: { val: 3, right: { val: 4, right: { val: 7, right: null, left: null }, left: null }, left: null },
  left: { val: 2, right: { val: 5, right: null, left: { val: 6, right: null, left: null } }, left: null }
}

//[1,2,3,4]
var node3 = {
  val: 1,
  right: { val: 3, right: null, left: null },
  left: { val: 2, right: null, left: { val: 4, right: null, left: null } }
}

const inputArr = [node1, node2, node3]
inputArr.forEach(node => {
  console.log(rightSideView(node))
})
