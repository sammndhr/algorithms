/* 
Iterative Find Min
Time Complexity - O(height) or O(log(n))
*/
function iterativeFindMin(root) {
  if (root === null) return null

  let curr = root
  while (curr.left !== null) {
    curr = curr.left
  }
  return curr.key
}

/* 
Recursive Find Min
Time Complexity - O(height) or O(log(n))
Space Complexity - O(height) or O(log(n))
*/
function recursiveFindMin(node) {
  if (node.left === null) return node
  else return findMinNode(node.left)
}

/* 
Iterative Find Max
Time Complexity - O(height) or O(log(n))
*/
function iterativeFindMax(root) {
  if (root === null) return null

  let curr = root
  while (curr.right !== null) {
    curr = curr.right
  }
  return curr.key
}
