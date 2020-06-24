// Boundary Walk
var treeToDoublyList = function (root) {
  function dfs(node) {
    if (node.left) dfs(node.left)
    pred.right = node
    node.left = pred
    pred = node
    if (node.right) dfs(node.right)
  }

  if (!root) return root

  let fake = new TreeNode('sentinel'),
    pred = fake

  dfs(root)

  const head = fake.right
  pred.right = head
  head.left = pred

  return head
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
