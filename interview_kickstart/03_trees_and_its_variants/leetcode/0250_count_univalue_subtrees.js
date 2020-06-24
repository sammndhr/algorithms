var countUnivalSubtrees = function (root) {
  if (!root) return 0

  let globalCount = 0

  function dfs(node) {
    // Base Case
    if (!node.left && !node.right) {
      globalCount++
      return true
    }
    // Recursive Case
    let amIUnival = true

    if (node.left) {
      const left = dfs(node.left)
      if (!left || node.val !== node.left.val) amIUnival = false
    }
    if (node.right) {
      const right = dfs(node.right)
      if (!right || node.val !== node.right.val) amIUnival = false
    }
    // Increase global count if me + both subtrees are unival
    if (amIUnival) globalCount++
    return amIUnival
  }

  dfs(root)
  return globalCount
}
