/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const { ListNode, arrToLL, LLToArr } = require('./utils.js')

//iterative mine
var mergeTwoLists = function(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  const root = l1.val <= l2.val ? l1 : l2

  while (l1 && l2) {
    if (l1.next && l1.next.val <= l2.val) {
      l1 = l1.next
    } else if (l2.next && l2.next.val < l1.val) {
      l2 = l2.next
    } else if (l1.val <= l2.val) {
      const temp = l1.next
      l1.next = l2
      l1 = temp
    } else {
      const temp = l2.next
      l2.next = l1
      l2 = temp
    }
  }
  return root
}

// iterative leetcode solution
var mergeTwoLists = function(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1

  const preHead = new ListNode(-1)
  let prev = preHead

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }
  prev.next = l2 ? l2 : l1
  return preHead.next
}

//recursive
var mergeTwoListsRecurse = function(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoListsRecurse(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoListsRecurse(l1, l2.next)
    return l2
  }
}

const l1 = arrToLL([5])
const l2 = arrToLL([1, 2, 4])
console.log(LLToArr(mergeTwoLists(l1, l2)))

arr1 = [-9, -7, -3, -3, -1, 2, 3]
arr2 = [-7, -7, -6, -6, -5, -3, 2, 4]
sortedList = mergeTwoLists(arrToLL(arr1), arrToLL(arr2))
console.log(LLToArr(sortedList))
