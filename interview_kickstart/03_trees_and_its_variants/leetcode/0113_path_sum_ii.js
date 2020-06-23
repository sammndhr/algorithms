/* 
Dfs recursive with mutable slate
*/
var pathSum = function (root, sum) {
  if (!root) return []
  // recursive dfs
  const res = []
  function recurse(node, slate, target) {
    target -= node.val

    if (!node.left && !node.right) {
      if (target === 0) {
        slate.push(node.val)
        res.push(slate.slice(0))
        slate.pop()
      }
      return
    }

    slate.push(node.val)

    if (node.left) recurse(node.left, slate, target)
    if (node.right) recurse(node.right, slate, target)

    slate.pop()
  }

  recurse(root, [], sum)
  return res
}
