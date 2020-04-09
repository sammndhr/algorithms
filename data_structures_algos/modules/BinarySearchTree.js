const { BFS, DFSIterative } = require('./BinaryTreeTraversal')

const BinarySearchTree = (() => {
  let root
  const findMinNode = node => {
    if (node.left === null) return node
    else return findMinNode(node.left)
  }

  class TreeNode {
    constructor(val, left = null, right = null) {
      this.val = val
      this.left = left
      this.right = right
    }
  }

  class BinarySearchTree {
    constructor() {
      root = null
    }

    get root() {
      return root
    }

    insert(val) {
      const recursiveInsertNode = (node, newNode) => {
        if (newNode.val < node.val) {
          if (node.left === null) node.left = newNode
          else recursiveInsertNode(node.left, newNode)
        } else {
          if (node.right === null) node.right = newNode
          else recursiveInsertNode(node.right, newNode)
        }
      }

      const newNode = new TreeNode(val)

      if (root === null) root = newNode
      else recursiveInsertNode(root, newNode)
    }

    remove(val) {
      const removeNode = (node, val) => {
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
          // Deleting node with two children
          // find min node in right subtree. This will be a terminal node
          // traverse down right subtree and change the node.val to the min node val
          // Then call removeNode on the right subtree with the min.node val to delete the terminal node
          const sub = findMinNode(node.right)
          node.val = sub.val
          node.right = removeNode(node.right, sub.val)
          return node
        }
      }
      root = removeNode(root, val)
    }

    // searches tree for specified val and returns the node if found, null otherwise
    search(val) {
      const recursiveSearch = (node, val) => {
        if (node === null) return null
        if (val < node.val) return recursiveSearch(node.left, val)
        if (val > node.val) return recursiveSearch(node.right, val)
        if (val === node.val) return node
      }
      return recursiveSearch(root, val)
    }

    // tree traversals
    // returns array of vals
    printInOrder() {
      const res = DFSIterative.inOrder(root)
      console.log(res)
      return res
    }

    printPreOrder() {
      const res = DFSIterative.preOrder(root)
      console.log(res)
      return res
    }

    printPostOrder() {
      const res = DFSIterative.postOrder(root)
      console.log(res)
      return res
    }

    printLevelOrder() {
      const res = BFS(root)
      console.log(res)
      return res
    }
  }
  return BinarySearchTree
})()

module.exports = BinarySearchTree
