var preorderTraversal = function (root) {
  if (!root) return []

  const res = [],
    stack = [root]
  let curr

  while (stack.length) {
    curr = stack.pop()
    res.push(curr.val)
    if (curr.right) stack.push(curr.right)
    if (curr.left) stack.push(curr.left)
  }
  return res
}
