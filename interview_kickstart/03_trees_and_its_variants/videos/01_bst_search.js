/* 
Iterative Implementation of Search
Time Complexity - O(height) or O(log(n))
*/
function iterativeSearch(root, key) {
  let curr = root
  while (curr !== null) {
    if (key === curr.key) return curr
    else if (key < curr.key) curr = curr.left
    else curr = curr.right
  }
  return null
}

/*
Recursive Implementation of Search
Time Complexity - O(height) or O(log(n))
Space Complexity - O(height) or O(log(n)) from call stack
*/
function recursiveSearch(root, key) {
  function recurse(node, val) {
    if (node === null) return null
    else if (key < node.key) return recursiveSearch(node.left, key)
    else if (key > node.key) return recursiveSearch(node.right, key)
    if (key === node.key) return node
  }
  return recurse(root, key)
}
