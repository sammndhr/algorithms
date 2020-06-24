var bstFromPreorder = function (preorder) {
  // First sort preorder array to get inorder. Rest is same as 105.
  const inorder = preorder.slice(0).sort((a, b) => a - b)

  const inOMap = {}
  for (let i = 0; i < inorder.length; i++) {
    inOMap[inorder[i]] = i
  }

  function recurse(preO, start1, end1, inO, start2, end2) {
    // Base case
    if (start1 > end1) return null
    if (start1 === end1) return new TreeNode(preO[start1])

    // Recursive case
    const rootVal = preO[start1],
      rootIndex = inOMap[rootVal]

    const numLeft = rootIndex - start2,
      numRight = end2 - rootIndex

    const subtreeRoot = new TreeNode(rootVal)

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

const t = bstFromPreorder([8, 5, 1, 7, 10, 12])
console.log(JSON.stringify(t))
