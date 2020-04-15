class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const arrToBinaryTree = (arr) => {
  const len = arr.length
  const recurse = (root, i) => {
    if (i < len) {
      const val = arr[i],
        temp = val === null ? null : new TreeNode(val)

      root = temp
      if (root !== null) {
        root.left = recurse(root.left, 2 * i + 1)
        root.right = recurse(root.right, 2 * i + 2)
      }
    }
    return root
  }

  return recurse(null, 0)
}

const getLowestRightNode = (root) => {
  if (!root) return null

  const recursiveDFS = (node, level) => {
    const left = node.left,
      right = node.right
    if (!left && !right) return { node, level }

    let maxL, maxR
    if (left) {
      maxL = recursiveDFS(left, level + 1)
    }

    if (right) {
      maxR = recursiveDFS(right, level + 1)
    }

    if (maxL.level > maxR.level) return maxL
    return maxR
  }

  return recursiveDFS(root, 0).node
}

module.exports = { TreeNode, arrToBinaryTree, getLowestRightNode }
