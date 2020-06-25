function lca(root, node_a, node_b) {
  if (!root) return null

  function helper(node, p, q) {
    // return found node or null if not found
    if (!node || node.data === p.data || node.data === q.data) return node

    const ancestorInLeft = helper(node.left, p, q),
      ancestorInRight = helper(node.right, p, q)

    // Ancestors were found in different subtrees so node is LCA
    if (ancestorInLeft && ancestorInRight) return node
    //if an ancestor was found, return it. Else, return null.
    return ancestorInLeft ? ancestorInLeft : ancestorInRight
  }

  return helper(root, node_a, node_b).data
}
