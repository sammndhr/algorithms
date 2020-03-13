/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const TreeNode = require('./utils.js')

//recursive
//Time Complexity - O(H) height of tree, so O(N) worst case and Olog(N) best case
// Space Complexity - Same as time complexity

var insertIntoBSTRecursive = function(root, val) {
  const nodeToReturn = root
  const recurseAndFind = node => {
    if (val < node.val) {
      if (!node.left) {
        node.left = new TreeNode(val)
        return
      } else {
        return recurseAndFind(node.left)
      }
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new TreeNode(val)
        return
      } else {
        return recurseAndFind(node.right)
      }
    }
  }
  recurseAndFind(root)
  return nodeToReturn
}

//Iterative
//Time Complexity - O(H) height of tree, so O(N) worst case and Olog(N) best case
// Space Complexity - O(1)

var insertIntoBST = function(root, val) {
  const nodeToReturn = root
  while (root) {
    if (val < root.val) {
      if (!root.left) {
        root.left = new TreeNode(val)
        break
      }
      root = root.left
    } else if (val > root.val) {
      if (!root.right) {
        root.right = new TreeNode(val)
        break
      }
      root = root.right
    }
  }
  return nodeToReturn
}

const node1 = {
  val: 4,
  right: { val: 7, right: null, left: null },
  left: {
    val: 2,
    right: { val: 3, right: null, left: null },
    left: { val: 1, right: null, left: null }
  }
}

const node2 = {
  val: 40,
  right: {
    val: 60,
    right: { val: 70, right: null, left: null },
    left: { val: 50, right: null, left: null }
  },
  left: {
    val: 20,
    right: { val: 30, right: null, left: null },
    left: { val: 10, right: null, left: null }
  }
}

const node3 = {
  val: 40,
  right: {
    val: 60,
    right: { val: 70, right: null, left: null },
    left: { val: 50, right: null, left: null }
  },
  left: {
    val: 20,
    right: { val: 30, right: null, left: null },
    left: { val: 10, right: null, left: null }
  }
}
console.log(JSON.stringify(insertIntoBST(node1, 5)))
console.log(JSON.stringify(insertIntoBSTRecursive(node2, 25)))
console.log(JSON.stringify(insertIntoBST(node3, 25)))
