function build_balanced_bst(a) {
  function recurse(start, end) {
    if (start === end) return new TreeNode(a[start])
    if (start > end) return null

    const mid = start + Math.floor((end - start) / 2),
      node = new TreeNode(a[mid])

    node.left_ptr = recurse(start, mid - 1)
    node.right_ptr = recurse(mid + 1, end)

    return node
  }
  return recurse(0, a.length - 1)
}

function TreeNode(node_value) {
  this.val = node_value
  this.left_ptr = null
  this.right_ptr = null
}

// tests
console.log(JSON.stringify(build_balanced_bst([1, 2, 3, 4, 5])))

tree = {
  val: 3,
  left_ptr: {
    val: 1,
    left_ptr: null,
    right_ptr: { val: 2, left_ptr: null, right_ptr: null }
  },
  right_ptr: {
    val: 4,
    left_ptr: null,
    right_ptr: { val: 5, left_ptr: null, right_ptr: null }
  }
}
