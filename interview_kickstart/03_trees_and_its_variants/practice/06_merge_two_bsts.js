// First Intuition
/* 
Time Complexity - O(m + n)
Space Complexity - O(m + n)
1. create two sorted arrays by traversing each bst inorder 
2. merge the two arrays to create one sorted array
3. create bst from merged array
*/
function mergeTwoBSTs(root1, root2) {
  const arr1 = getInorderArr(root1),
    arr2 = getInorderArr(root2)

  const merged = mergeSorted(arr1, arr2)

  return buildBST(merged, 0, merged.length - 1)
}

// inorder dfs returns inorder array
function getInorderArr(root) {
  const res = []
  function recurse(node) {
    if (!node) return
    recurse(node.left)
    res.push(node.key)
    recurse(node.right)
  }
  recurse(root)
  return res
}

// Recursive func - Builds BST from sorted array
function buildBST(arr, start, end) {
  if (start > end) return null

  const mid = Math.floor((start + end) / 2)
  const node = new Node(arr[mid])

  node.left = buildBST(arr, start, mid - 1)
  node.right = buildBST(arr, mid + 1, end)
  return node
}

// Merges two sorted arrays
function mergeSorted(arr1, arr2) {
  const merged = []
  let i = 0,
    j = 0
  while (i < arr1.length && j < arr2.length) {
    arr1[i] < arr2[j] ? merged.push(arr1[i++]) : merged.push(arr2[j++])
  }

  while (i < arr1.length) merged.push(arr1[i++])
  while (j < arr2.length) merged.push(arr2[j++])
  return merged
}

function Node(key, left = null, right = null) {
  this.key = key
  this.left = left
  this.right = right
}

// Tests
const tree1 = {
  key: 1,
  left: null,
  right: {
    key: 3,
    left: null,
    right: { key: 5, left: null, right: { key: 7, left: null, right: null } }
  }
}

const tree2 = {
  key: 2,
  left: null,
  right: {
    key: 4,
    left: null,
    right: { key: 6, left: null, right: { key: 8, left: null, right: null } }
  }
}

console.log(JSON.stringify(mergeTwoBSTs(tree1, tree2)))
