var diameterOfBinaryTree = function (root) {
  if (!root) return 0

  let treeDiameter = 0
  // Returns height of the subtree rooted at node
  function dfsHeight(node) {
    // Base case: leaf node
    if (!node.left && !node.right) return 0

    let myDiameter = 0,
      myHeight = 0,
      leftH = 0,
      rightH = 0

    // Recursive case: internal node
    if (node.left) {
      leftH = dfsHeight(node.left)
      myHeight = 1 + leftH
      myDiameter = 1 + leftH
    }

    if (node.right) {
      rightH = dfsHeight(node.right)
      // Height will be whichever side's height is greater. We need to pass this up
      myHeight = Math.max(1 + rightH, myHeight)
      // diameter will be (1 + left height + 1 + right height)
      myDiameter += 1 + rightH
    }

    // Update global treeDiameter if myDiameter is greater than the global
    if (myDiameter > treeDiameter) treeDiameter = myDiameter

    return myHeight
  }

  dfsHeight(root)

  return treeDiameter
}
