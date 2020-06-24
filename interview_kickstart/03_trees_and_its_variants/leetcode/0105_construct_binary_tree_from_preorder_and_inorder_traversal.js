var buildTree = function (preorder, inorder) {
  // Store the index of every number in inorder traversal in a hashMap
  const inOMap = {}
  for (let i = 0; i < inorder.length; i++) {
    inOMap[inorder[i]] = i
  }

  function recurse(preO, start1, end1, inO, start2, end2) {
    // return the subtree root of the binary tree constructed from the preorder subarray
    // preorder subarray - preO[start1...end1] and inorder subarray - inO[start2...end2]

    // Base case
    if (start1 > end1) return null
    if (start1 === end1) return new TreeNode(preO[start1])

    // At this point, we know that preorder arr is more than 1 long

    // Recursive case
    // The first value is the root of the subtree.
    const rootVal = preO[start1],
      rootIndex = inOMap[rootVal] //get rootIndex from inOMap. It is guaranteed to be present

    // Everything to its left is the left subtree and everything to right is right subtree
    const numLeft = rootIndex - start2,
      numRight = end2 - rootIndex,
      subtreeRoot = new TreeNode(rootVal)
    subtreeRoot.left = recurse(
      preO,
      start1 + 1,
      start1 + numLeft,
      inO,
      start2,
      start2 + numLeft - 1
    )
    subtreeRoot.right = recurse(
      preO,
      start1 + numLeft + 1,
      start1 + numLeft + numRight,
      inO,
      rootIndex + 1,
      end2 //rootIndex + numRight
    )
    return subtreeRoot
  }

  return recurse(
    preorder,
    0,
    preorder.length - 1,
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
