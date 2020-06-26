// First attempt
// - traverse inorder dfs while populating inorder array
// - if inorder arr length is >= k, return from recursion
// - return [k-1]th inorder item

// To optimize
// Don't need array to keep track of 0 to k-1 elements.
function kth_smallest_elementz(root, k) {
  let inorder = []

  function inorderDFS(node) {
    if (!node) return

    if (node.left_ptr) inorderDFS(node.left_ptr)

    if (inorder.length >= k) return
    inorder.push(node.val)

    if (node.right_ptr) inorderDFS(node.right_ptr)
  }

  inorderDFS(root)
  return inorder[k - 1]
}

// space optimized
function kth_smallest_element(root, k) {
  let current = 0

  function kthSmallest(node) {
    if (!node) return

    const left = kthSmallest(node.left_ptr)

    if (left) return left

    current++

    if (current === k) return node.val

    return kthSmallest(node.right_ptr)
  }

  return kthSmallest(root)
}

// Tests
const tree = {
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

console.log(kth_smallest_element(tree, 2))
