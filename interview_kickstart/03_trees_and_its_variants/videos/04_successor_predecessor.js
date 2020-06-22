function successor(tree, root, key) {
  const predecessor = tree.search(key)
  // If root is null or tree doesn't contain key return null
  if (root === null || !predecessor) return null
  // If predecessor has right, go right once then keep going left until null
  if (predecessor.right !== null) {
    let curr = predecessor.right
    while (curr.left !== null) {
      curr = curr.left
    }
    return curr
  }
  /* If predecessor doesn't have right, go down searching for predecessor.
  On each left turn (p.key < curr.key) set the ancestor = curr
  Last ancestor will be successor */
  let ancestor = null,
    curr = root

  while (curr.key !== predecessor.key) {
    if (predecessor.key < curr.key) {
      ancestor = curr
      curr = curr.left
    } else curr = curr.right
    if (ancestor) console.log(ancestor.key)
  }
  return ancestor
}
