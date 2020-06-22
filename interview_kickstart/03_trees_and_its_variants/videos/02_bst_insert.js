const { TreeNode } = require('./tree_node')

/* 
Iterative Insert
Time Complexity - O(height) or O(log(n))
*/
function iterativeInsert(root, key) {
  const newNode = new TreeNode(key)

  if (root === null) return newNode

  let prev = null,
    curr = root

  while (curr !== null) {
    if (key === curr.key) return 'Key Already Exists!'
    else if (key < curr.key) {
      prev = curr
      curr = curr.left
    } else {
      prev = curr
      curr = curr.right
    }
  }

  if (k < prev.key) prev.left = newNode
  if (k > prev.key) prev.right = newNode
  return root
}

/* 
Recursive Insert
Time Complexity - O(height) or O(log(n))
Space Complexity - O(height) or O(log(n)) from call stack
*/
function recursiveInsert(root, key) {
  const recurse = (node, newNode) => {
    if (key === curr.key) return 'Key Already Exists!'
    else if (key < node.key) {
      if (node.left === null) node.left = newNode
      else recurse(node.left, newNode)
    } else {
      if (node.right === null) node.right = newNode
      else recurse(node.right, newNode)
    }
  }

  const newNode = new TreeNode(key)

  if (root === null) root = newNode
  else recurse(root, newNode)
}
