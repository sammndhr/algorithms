const { BinarySearchTree, LinkedList, LLToArr } = require('../../utils')

// With breath first traversal
function listOfDepthsBFS(root) {
  // We'll track the linked lists for each level with current and the track the prev level will parents
  let parents,
    current = new LinkedList()
  const lists = []

  // if root exists, add node to current
  if (root) current.appendToTail(root)

  while (current.size > 0) {
    // push current at the start of next level
    lists.push(current)
    // set the prev level list to parents
    parents = current

    // reset list
    current = new LinkedList()

    // we'll iterate through each parent's child nodes and append those to the current list
    let parent = parents.head

    while (parent) {
      const currNode = parent.val

      if (currNode.left) current.appendToTail(currNode.left)
      if (currNode.right) current.appendToTail(currNode.right)

      parent = parent.next
    }
  }

  return lists
}
/*
n = number of nodes in bst
Time Complexity - O(n)
Space complexity - O(n). From linked list (plus space taken by the lists array but O(n) will be greater so ignore)
*/

/* ---------------------------------------------------------------------------- */

// With depth first traversal
function listOfDepthsDFS(root) {
  const lists = []
  // recurse on child nodes and pass level
  const recurse = (root, level) => {
    if (!root) return

    //declare the list initially
    let list

    // Since we start at 0 for level, if length == level,
    // list for that level doesn't exist so create one.
    // otherwise just use the one that exits (lists[level])
    if (lists.length === level) {
      list = new LinkedList()
      lists.push(list)
    } else {
      list = lists[level]
    }

    // append the node to the list and recurse over the children
    list.appendToTail(root)
    recurse(root.left, level + 1)
    recurse(root.right, level + 1)
  }
  recurse(root, 0)
  return lists
}

/*
n = number of nodes in bst
Time Complexity - O(n)
Space complexity - O(n). Call stack of recursion will be O(log n) but linked list will be O(n) so ignore O(log n)
*/

/* ---------------------------------------------------------------------------- */

// Tests
bst = new BinarySearchTree()

bst.insert(3)
bst.insert(1)
bst.insert(5)
bst.insert(0)
bst.insert(2)
bst.insert(4)
bst.insert(6)

console.log('-----BFS-----')
for (const node of listOfDepthsBFS(bst.root)) {
  const curr = LLToArr(node.head),
    currLevel = []

  for (const treeNode of curr) {
    currLevel.push(treeNode.val)
  }
  console.log(currLevel)
}

console.log('-----DFS-----')
for (const node of listOfDepthsDFS(bst.root)) {
  const curr = LLToArr(node.head),
    currLevel = []

  for (const treeNode of curr) {
    currLevel.push(treeNode.val)
  }
  console.log(currLevel)
}
