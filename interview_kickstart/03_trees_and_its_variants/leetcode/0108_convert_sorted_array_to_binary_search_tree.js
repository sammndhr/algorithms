/* 
Time Complexity - O(n)
Space Complexity - O(log(n)) from stack space + O(n) output

Like merge sort but just the division part. 
*/
var sortedArrayToBST = function (nums) {
  // Recursive helper
  function recurse(arr, start, end) {
    if (start > end) return null
    if (start === end) return new TreeNode(arr[start])

    const mid = Math.floor((start + end) / 2),
      subtreeRoot = new TreeNode(arr[mid])

    subtreeRoot.left = recurse(arr, start, mid - 1)
    subtreeRoot.right = recurse(arr, mid + 1, end)

    return subtreeRoot
  }

  return recurse(nums, 0, nums.length - 1)
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
