/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function(root) {
  const recurse = (node, min, max) => {
    if (!node) return true
    if (min != null && node.val <= min) return false
    if (max != null && node.val >= max) return false

    left = recurse(node.left, min, node.val)
    if (!left) return false
    right = recurse(node.right, node.val, max)
    if (!right) return false

    return left && right
  }
  return recurse(root, null, null)
}

//iterative
var isValidBSTIter = function(root) {
  let minStack = [null],
    maxStack = [null],
    nodeStack = [root]

  const updateStack = (node, min, max) => {
    nodeStack.push(node)
    minStack.push(min)
    maxStack.push(max)
  }

  while (nodeStack.length) {
    root = nodeStack.pop()
    min = minStack.pop()
    max = maxStack.pop()

    if (root === null) {
      continue
    }

    if (max != null && root.val >= max) return false
    if (min != null && root.val <= min) return false
    updateStack(root.left, min, root.val)
    updateStack(root.right, root.val, max)
  }
  return true
}

node1 = { val: 2, right: { val: 3, right: null, left: null }, left: { val: 1, right: null, left: null } }
node2 = {
  val: 5,
  right: { val: 4, right: { val: 6, right: null, left: null }, left: { val: 3, right: null, left: null } },
  left: { val: 1, right: null, left: null }
}

node3 = {
  val: 5,
  right: { val: 8, right: { val: 6, right: null, left: null }, left: { val: 4, right: null, left: null } },
  left: { val: 1, right: null, left: null }
}

node4 = {
  val: 10,
  right: { val: 15, right: { val: 20, right: null, left: null }, left: { val: 6, right: null, left: null } },
  left: { val: 5, right: null, left: null }
}

node5 = {
  val: 10,
  right: { val: 15, right: { val: 20, right: null, left: null }, left: { val: 6, right: null, left: null } },
  left: { val: 5, right: { val: 7, right: null, left: null }, left: { val: 1, right: null, left: null } }
}

console.log(isValidBST(node1)) //true
console.log(isValidBST(node2)) //false
console.log(isValidBST(node3)) //false
console.log(isValidBST(node4)) //false
console.log(isValidBST(node5)) //false

console.log(isValidBSTIter(node1)) //true
console.log(isValidBSTIter(node2)) //false
console.log(isValidBSTIter(node3)) //false
console.log(isValidBSTIter(node4)) //false
console.log(isValidBSTIter(node5)) //false
