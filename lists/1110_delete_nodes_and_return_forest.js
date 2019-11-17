/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
  if (!root) return []
  const remaining = [],
    queue = [root]

  while (queue.length) {
    const curr = queue.shift(),
      delLen = to_delete.length,
      left = curr.left,
      right = curr.right
    let delI = null

    for (let i = 0; i < delLen; i++) {
      if (to_delete[i] === curr.val) {
        delI = i
        break
      }
    }

    if (delI === null) {
      if (!curr.parentL && !curr.parentR) remaining.push(curr)
      if (left) curr.left.parentL = curr
      if (right) curr.right.parentR = curr
    } else {
      if (left) curr.left = null
      if (right) curr.right = null
      if (curr.parentR) curr.parentR.right = null
      if (curr.parentL) curr.parentL.left = null
    }
    if (left) queue.push(left)
    if (right) queue.push(right)
  }
  return remaining
}
// https://leetcode.com/problems/delete-nodes-and-return-forest/discuss/328924/Javascript-Solution
var delNodes = function(root, to_delete) {
  if (!root) return []
  const res = [],
    dfs = (node, isRoot) => {
      if (!node) return
      let isNodeDeleted = to_delete.includes(node.val)
      if (node.left) node.left = dfs(node.left, isNodeDeleted)
      if (node.right) node.right = dfs(node.right, isNodeDeleted)
      if (isRoot && !isNodeDeleted) res.push(node)
      return isNodeDeleted ? null : node
    }
  dfs(root, true)
  return res
}
console.log(
  delNodes(
    {
      val: 1,
      right: { val: 3, right: { val: 7, right: null, left: null }, left: { val: 6, right: null, left: null } },
      left: { val: 2, right: { val: 5, right: null, left: null }, left: { val: 4, right: null, left: null } }
    },
    [3, 5]
  )
)
console.log('----------')
console.log(
  delNodes(
    {
      val: 1,
      right: null,
      left: { val: 2, right: { val: 3, right: null, left: null }, left: { val: 4, right: null, left: null } }
    },
    [2, 3]
  )
)
// [1,2,3,4,5,6,7]
// [3,5]

// [1,2,null,4,3]
// [2,3]
