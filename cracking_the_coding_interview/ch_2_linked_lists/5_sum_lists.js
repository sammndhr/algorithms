// linked-list, recursion
const { ListNode, compareObjects, LLToArr } = require('../../utils')
const { LinkedList } = require('../../data_structures/modules')

// Using LinkedList
function sumLists(ll1, ll2) {
  const sumList = new LinkedList()

  const recurse = (head1, head2, carryOver = 0) => {
    if (!head1 && !head2 && carryOver === 0) {
      return sumList
    }

    let currSum = carryOver

    if (head1) {
      currSum += head1.val
      head1 = head1.next
    }

    if (head2) {
      currSum += head2.val
      head2 = head2.next
    }

    const sumVal = currSum % 10

    carryOver = currSum > 9 ? 1 : 0

    sumList.appendToTail(sumVal)

    return recurse(head1, head2, carryOver)
  }

  return recurse(ll1, ll2)
}

/*
n = length of first linked list
m = length of second linked list

Time Complexity - O(n + m)
Space complexity - O(n + m)
*/

/* ---------------------------------------------------------------------------- */

// Using ListNode
function sumListsForward(ll1, ll2) {
  let sum = { sum: null, carry: 0 }

  const len1 = getLength(ll1),
    len2 = getLength(ll2)

  let list1 = ll1,
    list2 = ll2

  if (len1 < len2) {
    list1 = padList(ll1, len2 - len1)
  }

  if (len2 < len1) {
    list2 = padList(ll2, len1 - len2)
  }

  const fullSum = partialSum(list1, list2)

  if (fullSum.carry === 0) return fullSum.sum
  else {
    return insertBefore(fullSum.sum, sum.carry)
  }

  // Helpers
  function partialSum(ll1, ll2) {
    if (!ll1 && !ll2) return sum

    sum = partialSum(ll1.next, ll2.next)

    const val = ll1.val + ll2.val + sum.carry,
      sumList = insertBefore(sum.sum, val % 10)

    sum.sum = sumList
    sum.carry = val > 9 ? 1 : 0
    return sum
  }

  function getLength(node) {
    let len = 0,
      curr = node

    while (curr) {
      curr = curr.next
      len++
    }
    return len
  }

  function padList(head, padding) {
    let newHead = head
    for (let i = 0; i < padding; i++) {
      newHead = insertBefore(newHead, 0)
    }
    return newHead
  }

  function insertBefore(head, val) {
    const node = new ListNode(val)
    if (head) {
      node.next = head
    }
    return node
  }
}

/*
n = length of first linked list
m = length of second linked list

Time Complexity - O(n + m)
Space complexity - O(n + m)
*/

/* ---------------------------------------------------------------------------- */

// Tests

function testSumLists() {
  const lists = []

  const arrs = [
    [7, 1, 6],
    [5, 9, 2],
    [9, 1, 3],
    [8, 2]
  ]

  for (let i = 0; i < 4; i++) {
    ll = new LinkedList()
    ll.fromArray(arrs[i])
    lists.push(ll)
  }

  const testCases = [
    [lists[0], lists[1], [2, 1, 9]],
    [lists[2], lists[3], [7, 4, 3]]
  ]
  console.log('Sum Lists')
  for (const test of testCases) {
    const res = sumLists(test[0].head, test[1].head).printList()
    compareObjects(res, test[2])
  }
}
function testSumListsForward() {
  const lists = []

  const arrs = [
    [6, 1, 7],
    [2, 9, 5],
    [9, 1, 3],
    [9, 2]
  ]

  for (let i = 0; i < 4; i++) {
    ll = new LinkedList()
    ll.fromArray(arrs[i])
    lists.push(ll)
  }

  const testCases = [
    [lists[0], lists[1], [9, 1, 2]],
    [lists[2], lists[3], [1, 0, 0, 5]]
  ]
  console.log('Sum Lists Forward')
  for (const test of testCases) {
    const res = sumListsForward(test[0].head, test[1].head)
    console.log(LLToArr(res))
    compareObjects(LLToArr(res), test[2])
  }
}

testSumLists()
testSumListsForward()
