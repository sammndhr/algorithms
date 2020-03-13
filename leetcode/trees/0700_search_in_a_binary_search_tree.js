//Recursive
const searchBST = (root, val) => {
  if (!root) return null
  if (root.val == val) return root
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val)
}
// Time Complexity - O(N) in worst case and Olog(N) in average case
// Space Complexity - O(N) in worst case and Olog(N) in average case (to keep track of the recursion stack)

// Iterative
const searchBSTIterative = (root, val) => {
  while (root) {
    if (root.val == val) return root
    root = val < root.val ? root.left : root.right
  }
  return null
}

// Time Complexity - O(N) in worst case and Olog(N) in average case
// Space Complexity - O(1) (constant)

var node3 = {
  val: 2,
  right: { val: 3, right: null, left: null },
  left: { val: 1, right: null, left: { val: -1, right: null, left: null } }
}

console.log(searchBST(node3, -1))
console.log(searchBSTIterative(node3, 12))
