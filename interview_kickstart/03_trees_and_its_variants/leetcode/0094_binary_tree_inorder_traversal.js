var inorderTraversal = function (root) {
  if (!root) return []
  const res = [],
    stack = []

  let curr = root

  while (stack.length || curr) {
    if (curr) {
      stack.push(curr)
      curr = curr.left
    } else {
      curr = stack.pop()
      res.push(curr.val)
      curr = curr.right
    }
  }

  return res
}
