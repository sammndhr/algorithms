class TreeNode {
  constructor(val) {
    this.val = val
    this.left_ptr = null
    this.right_ptr = null
  }
}

function isBST(root) {
  if (!root) return true
  const recurse = (node, min, max) => {
    if (!node) return true
    if (min != null && node.val < min) return false
    if (max != null && node.val > max) return false

    const left = recurse(node.left_ptr, min, node.val)
    if (!left) return false

    const right = recurse(node.right_ptr, node.val, max)
    if (!right) return false

    return left && right
  }
  return recurse(root, null, null)
}
