/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const { ListNode, arrToLL, printList } = require('./../../utils')
var swapPairs = function(head) {
  if (!head || !head.next) return head
  let node1 = head,
    node2 = head.next,
    newHead = node2,
    prev,
    rest

  while (node2) {
    rest = node2.next
    node2.next = node1
    node1.next = rest

    if (prev) prev.next = node2
    prev = node1
    node1 = rest
    if (!node1) return newHead
    node2 = node1.next
  }
  return newHead
}

printList(swapPairs(arrToLL([1, 2, 3, 4, 5])))
printList(swapPairs(arrToLL([1, 2, 3, 4])))
printList(swapPairs(arrToLL([1, 2, 3])))
printList(swapPairs(arrToLL([1, 2])))
printList(swapPairs(arrToLL([1])))
printList(swapPairs(arrToLL([])))
