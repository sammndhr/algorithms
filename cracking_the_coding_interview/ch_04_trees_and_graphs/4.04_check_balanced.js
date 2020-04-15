const { TreeNode, arrToBinaryTree, getLowestRightNode } = require('../../utils')

/* 
do a recursive (post order) dfs passing the node and return either:
1. the height from the bottom up if the height difference is <= 1
2. false if the height diff is > 1
*/

function checkBalanced(root) {
  const checkHeight = (node) => {
    // recurse to the bottom returning -1 for null nodes
    if (!node) return -1

    // since we're going to check the height bottom up, post order so recursive calls before checking height
    const leftH = checkHeight(node.left),
      rightH = checkHeight(node.right)

    // if either one returns false pass false up
    if (leftH === false || rightH === false) return false

    // Otherwise, calc the height diff
    const heightDiff = Math.abs(leftH - rightH)

    //and pass up false if > 1
    if (heightDiff > 1) return false

    // otherwise pass the max height of the subtree + 1
    return Math.max(leftH, rightH) + 1
  }
  return checkHeight(root) === false ? false : true
}

/*
n = number of nodes in tree,
h = height of tree

Time Complexity - O(n) 
Space complexity - O(h)
*/

// Tests

const tree = arrToBinaryTree([0, 1, 2, 3, 4]),
  node5 = new TreeNode(5),
  node6 = new TreeNode(6)

console.log(checkBalanced(tree)) //true

const lowest = getLowestRightNode(tree)
lowest.right = node5
lowest.right.right = node6

console.log(checkBalanced(tree)) //false
