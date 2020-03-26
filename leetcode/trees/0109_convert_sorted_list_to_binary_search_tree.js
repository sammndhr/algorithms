/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = this.right = null
  }
}

//Recursive - Time Complexity - O(NlogN)
//Space Complexity - O(logN)
var sortedListToBST = function(head) {
  const findMiddle = head => {
    let slow = head,
      fast = head,
      prev = null
    while (fast !== null && fast.next !== null) {
      prev = slow
      slow = slow.next
      fast = fast.next.next
    }
    if (prev) prev.next = null
    return slow
  }

  const recurse = head => {
    if (!head) return null
    const mid = findMiddle(head)
    const node = new TreeNode(mid.val)

    if (head == mid) return node

    node.left = recurse(head)
    node.right = recurse(mid.next)
    return node
  }
  return recurse(head)
}

//Converting sorted Linked List to Array then recursing
// Time complexity - O(N)
// Space Complexity - O(N)
var sortedListToBST = function(head) {
  const LLToArr = node => {
    const arr = []
    while (node) {
      arr.push(node.val)
      node = node.next
    }
    return arr
  }

  const recurse = (left, right) => {
    if (left > right) return null

    const mid = Math.floor((left + right) / 2),
      node = new TreeNode(sortedArr[mid])

    if (left === right) return node
    node.left = recurse(left, mid - 1)
    node.right = recurse(mid + 1, right)

    return node
  }
  const sortedArr = LLToArr(head)

  return recurse(0, sortedArr.length - 1)
}

var sortedListToBST = function(head) {
  const findSize = head => {
    let size = 0,
      pointer = head
    while (pointer) {
      pointer = pointer.next
      size++
    }
    return size
  }

  const recurse = (left, right) => {
    if (left > right) return null
    const mid = Math.floor((left + right) / 2)
    leftNode = recurse(left, mid - 1)
    const node = new TreeNode(root.val)
    node.left = leftNode
    root = root.next
    node.right = recurse(mid + 1, right)
    return node
  }

  const size = findSize(head)
  let root = head
  return recurse(0, size - 1)
}

const node1 = {
  val: -10,
  next: {
    val: -3,
    next: { val: 0, next: { val: 5, next: { val: 9, next: null } } }
  }
}

console.log(JSON.stringify(sortedListToBST(node1)))

// const no = {
//   val: 0,
//   right: { val: 5, right: { val: 9, right: null, left: null }, left: null },
//   left: { val: -10, right: null, left: null }
// }
// const node = {
//   val: 0,
//   right: { val: 5, right: { val: 9, right: null, left: null }, left: null },
//   left: { val: -10, right: { val: -3, right: null, left: null }, left: null }
// }

// const node1 = {
//   val: 0,
//   right: { val: 5, right: { val: 9, right: null, left: null }, left: null },
//   left: { val: -10, right: { val: -3, right: null, left: null }, left: null }
// }
