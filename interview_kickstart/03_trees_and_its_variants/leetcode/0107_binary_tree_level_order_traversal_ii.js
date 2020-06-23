// Same as level order traversal (Leetcode 102) but reverse the res array at end

var levelOrderBottom = function (root) {
  const res = []
  if (!root) return res
  let q = [root]

  while (q.length) {
    const numNodes = q.length,
      temp = []

    for (let i = 0; i < numNodes; i++) {
      const node = q.shift()
      temp.push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }

    res.push(temp)
  }

  return res.reverse()
}
