const { TreeNode } = require('../../utils')

function createMinimalBST(arr) {
  const recurse = (start, end) => {
    if (end < start) return null

    const mid = Math.floor((end + start) / 2)

    const node = new TreeNode(arr[mid])
    node.left = recurse(start, mid - 1)
    node.right = recurse(mid + 1, end)

    return node
  }
  return recurse(0, arr.length - 1)
}

/*
n = size of array
Time Complexity - O(n)
Space complexity - O(n)
*/
// Tests

const arr = [0, 1, 2, 3, 4, 5]
console.log(createMinimalBST(arr))
