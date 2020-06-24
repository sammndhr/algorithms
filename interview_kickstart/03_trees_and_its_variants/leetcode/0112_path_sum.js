/* 
Dfs recursive with global flag
Time, Space Complexity - O(n)
*/
var hasPathSum = function (root, sum) {
  if (!root) return false
  let flag = false

  // recursive dfs
  function recurse(node, target) {
    target -= node.val
    if (!node.left && !node.right) {
      if (target === 0) flag = true
      return
    }
    // if a path sum exists, don't try anymore paths
    // if (flag) return

    if (node.left) recurse(node.left, target)
    if (node.right) recurse(node.right, target)
  }

  recurse(root, sum)
  return flag
}

// ----------------------------------------------------------------------

// Dfs recursive without global flag
var hasPathSum = function (root, sum) {
  if (!root) return false

  // recursive dfs
  function recurse(node, target) {
    target -= node.val
    if (!node.left && !node.right) {
      if (target === 0) return true
      return false
    }

    let left, right

    if (node.left) left = recurse(node.left, target)
    // If left returns true, it will never try the right path
    if (left) return left
    // Try right if left is false
    if (node.right) right = recurse(node.right, target)
    if (right) return right
    // If right is null or right is false return false
    return false
  }
  return recurse(root, sum)
}
