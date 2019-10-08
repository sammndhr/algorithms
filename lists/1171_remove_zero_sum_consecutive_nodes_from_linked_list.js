/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const { ListNode } = require('./utils.js')
// https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/discuss/366350/C%2B%2B-O(n)-(explained-with-pictures)
var removeZeroSumSublists = function(head) {
  const root = new ListNode(0),
    map = { 0: root }
  let accumulative = 0
  root.next = head

  while (head !== null) {
    accumulative += head.val

    if (map[accumulative]) {
      let prev = map[accumulative],
        start = prev,
        aux = accumulative

      while (prev !== head) {
        prev = prev.next
        aux += prev.val
        if (prev !== head) delete map[aux]
      }

      start.next = head.next
    } else {
      map[accumulative] = head
    }
    head = head.next
  }

  return root.next
}
