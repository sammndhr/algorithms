const { arrToBinaryTree } = require('../../utils')

function validateBST(root) {
  const recurse = (n, min, max) => {
    if (!n) return true

    if ((min !== null && n.val <= min) || (max !== null && n.val > max)) {
      return false
    }

    if (!recurse(n.left, min, n.val) || !recurse(n.right, n.val, max)) {
      return false
    }

    return true
  }
  return recurse(root, null, null)
}

/*
n = number of nodes
Time Complexity - O(n)
Space complexity - O(log n)
*/
// Tests

const testCases = [
  [3, 1, 5, 0, 2, 4, 6], //true
  [3, 5, 1, 0, 2, 4, 6], //false
  [3, 1, 5, 0, 2, null, null, 0], //false
  [0, 1, 2, 3, 4], //true
  [3, 3, 5, 1, null, 4, 6, 0, 2] //false
]

for (const test of testCases) {
  console.log(validateBST(arrToBinaryTree(test))) //true
}
