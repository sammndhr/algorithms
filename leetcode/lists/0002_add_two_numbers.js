/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(node1, node2) {
  let addedLL = { val: 0, next: null },
    carryOver = 0,
    dummyHead = addedLL

  while (node1 || node2) {
    let currSum, currNode
    const node1Val = node1 ? node1.val : 0
    const node2Val = node2 ? node2.val : 0
    currSum = node1Val + node2Val + carryOver

    if (currSum < 10) {
      currNode = { val: currSum, next: null }
      carryOver = 0
    } else if (currSum > 9) {
      currNode = { val: currSum % 10, next: null }

      carryOver = Math.floor(currSum / 10)
    }

    addedLL.next = currNode
    addedLL = addedLL.next

    if (node1) {
      node1 = node1.next
    }
    if (node2) {
      node2 = node2.next
    }
  }

  if (carryOver > 0) {
    addedLL.next = { val: carryOver, next: null }
  }

  return dummyHead.next
}

node1 = {
  val: 2,
  next: { val: 4, next: { val: 3, next: { val: 9, next: null } } }
}
node1 = { val: 2, next: { val: 4, next: { val: 3, next: null } } }
node2 = { val: 5, next: { val: 6, next: { val: 4, next: null } } }
// node1 = { val: 9, next: null }
// node2 = { val: 9, next: null }

console.log(JSON.stringify(addTwoNumbers(node1, node2)))
