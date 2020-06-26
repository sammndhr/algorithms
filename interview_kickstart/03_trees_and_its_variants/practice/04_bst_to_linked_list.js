function BTtoLL(root) {
  if (!root) return null
  const fake = new TreeNode('fake')
  let pred = fake

  function recurse(node) {
    if (node.left_ptr) recurse(node.left_ptr)
    pred.right_ptr = node
    node.left_ptr = pred
    pred = node
    if (node.right_ptr) recurse(node.right_ptr)
  }

  recurse(root)

  const head = fake.right_ptr
  pred.right_ptr = head
  head.left_ptr = pred

  return head
}
