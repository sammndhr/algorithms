var levelOrder = function (root) {
  const res = []
  if (!root) return res
  let q = [root]

  while (q.length) {
    const numNodes = q.length,
      temp = []

    for (let i = 0; i < numNodes; i++) {
      const node = q.shift()
      temp.push(node.val)
      for (const child of node.children) {
        q.push(child)
      }
    }

    res.push(temp)
  }
  return res
}
