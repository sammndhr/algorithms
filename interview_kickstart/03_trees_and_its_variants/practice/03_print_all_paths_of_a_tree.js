function printAllPaths(root) {
  if (!root) return []
  //   const res = []
  dfs(root, [])
  //   return res

  function dfs(node, slate) {
    slate.push(node.val)

    if (!node.left_ptr && !node.right_ptr) {
      //   res.push(slate.slice(0))
      console.log(slate.slice(0).join(' '))
      slate.pop()
      return
    }

    if (node.left_ptr) dfs(node.left_ptr, slate)
    if (node.right_ptr) dfs(node.right_ptr, slate)

    slate.pop()
  }
}
