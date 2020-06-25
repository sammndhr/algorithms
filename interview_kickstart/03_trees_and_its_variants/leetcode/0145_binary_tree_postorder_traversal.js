// // Omkar's solution
var postorderTraversal = function (root) {
  if (!root) return []
  const res = [],
    stack = [[root, 'none']]
  while (stack.length) {
    const [node, zone] = stack[stack.length - 1]

    if (zone === 'none') {
      stack[stack.length - 1] = [node, 'arrival']
      if (node.left) stack.push([node.left, 'none'])
    } else if (zone === 'arrival') {
      stack[stack.length - 1] = [node, 'interim']
      if (node.right) stack.push([node.right, 'none'])
    } else if (zone === 'interim') {
      // stack[stack.length - 1] = [node, 'departure']
      res.push(node.val)
      stack.pop()
    }
  }
}

// Simpler solution. Push in reverse then reverse the array
function postorderTraversal(root) {
  if (!root) return []
  const res = [],
    stack = [root]

  let curr

  while (stack.length) {
    curr = stack.pop()
    res.push(curr.val)

    if (curr.left) stack.push(curr.left)
    if (curr.right) stack.push(curr.right)
  }

  //   Reverse
  return res.reverse()
}

// tests
const tree = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
}

console.log(postorderTraversal(tree))
