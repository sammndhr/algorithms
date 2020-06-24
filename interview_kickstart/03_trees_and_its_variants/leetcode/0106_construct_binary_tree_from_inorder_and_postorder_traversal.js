var buildTree = function (inorder, postorder) {
  // Store the index of every number in inorder traversal in a hashMap
  const inOMap = {}
  for (let i = 0; i < inorder.length; i++) {
    inOMap[inorder[i]] = i
  }

  // Recursive helper
  function recurse(postO, start1, end1, inO, start2, end2) {
    if (start1 > end1) return null
    if (start1 === end1) return new TreeNode(postO[start1])

    const rootVal = postO[end1],
      rootIndex = inOMap[rootVal]

    const numLeft = rootIndex - start2,
      // numRight = end2 - rootIndex,
      subtreeRoot = new TreeNode(rootVal)
    subtreeRoot.left = recurse(
      postO,
      start1,
      start1 + numLeft - 1,
      inO,
      start2,
      start2 + numLeft - 1
    )
    subtreeRoot.right = recurse(
      postO,
      start1 + numLeft,
      end1 - 1,
      inO,
      rootIndex + 1,
      end2 //rootIndex + numRight
    )
    return subtreeRoot
  }

  return recurse(
    postorder,
    0,
    postorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  )
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// Tests
const res = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])
console.log(JSON.stringify(res))
