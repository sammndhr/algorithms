/*
class TreeNode {
  constructor(val) {
    this.val = val
    this.left_ptr = null
    this.right_ptr = null
  }
}
*/

function flipUpsideDown(root) {
  if (!root) return null

  function dfs(node) {
    if (!node.left_ptr) return node

    const flipped = dfs(node.left_ptr)

    node.left_ptr.right_ptr = node
    node.left_ptr.left_ptr = node.right_ptr

    node.left_ptr = null
    node.right_ptr = null

    return flipped
  }

  return dfs(root)
}
