/* 
Iterative Delete
Time Complexity - O(n)
*/
function deleteNode(key, root) {
  let curr = root,
    prev = null
  // Search for key to delete
  while (curr !== null) {
    if (key === curr.key) break
    else if (key < curr.key) {
      prev = curr
      curr = curr.left
    } else {
      prev = curr
      curr = curr.right
    }
  }
  // key doesn't exist
  if (curr === null) return root
  // Deletion case 1. If node to delete is leaf node, if tree is one node tree, if tree is null
  // one node tree. Set root to null and return
  if (curr.left === null && curr.right === null) {
    if (prev === null) return null
    if (curr.key === prev.left.key) prev.left = null
    else prev.right = null
  }
  // Deletion case 2. Node has one child
  let child = null
  if (curr.left === null && curr.right !== null) child = curr.right
  if (curr.right === null && curr.left !== null) child = curr.left
  if (child !== null) {
    if (prev === null) return child
    if (curr.key === prev.left.key) prev.left = child
    else prev.right = child
  }
  // Deletion case 3. Node has two children. Find successor, set node key to successor key, then delete
  if (curr.left !== null && curr.right !== null) {
    // To find successor of node with right child, go right once, then keep traversing left until you hit null
    let succ = curr.right
    prev = curr
    while (succ.left !== null) {
      prev = succ
      succ = succ.left
    }
    curr.key = succ.key
    if (succ === prev.left) prev.left = succ.right
    else prev.right = succ.right
  }
  return root
}
/* 
Recursive Delete using min instead of successor
Time Complexity - O(n)
Space Complexity - O(n)
*/
function recursiveDelete(node, val) {
  if (node === null) return null
  if (val < node.val) {
    node.left = removeNode(node.left, val)
    return node
  }

  if (val > node.val) {
    node.right = removeNode(node.right, val)
    return node
  }
  // If val matches node.val
  if (val === node.val) {
    // if node to delete doesn't have any children
    if (node.left === null && node.right === null) {
      node = null
      return node
    }
    // if node to delete has one right child
    if (node.left === null) {
      node = node.right
      return node
    }
    // if node to delete has one left child
    if (node.right === null) {
      node = node.left
      return node
    }
    /*
      Deleting node with two children
      - find min node in right subtree. This will be a terminal node
      - traverse down right subtree and change the node.val to the min node val
      - Then call removeNode on the right subtree with the min.node val to delete the terminal node
      */
    const sub = findMinNode(node.right)
    node.val = sub.val
    node.right = removeNode(node.right, sub.val)
    return node
  }
}
