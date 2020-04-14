const { LinkedList } = require('../../utils')

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function (head) {
  let curr = head

  while (curr != null && curr.next != null) {
    if (curr.next.val == curr.val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }

  return head
}

// Tests
const ll = new LinkedList()
ll.fromArray([1, 2, 3, 1, 2, 5])

const ll2 = new LinkedList()
ll2.fromArray([1, 1, 2])

console.log(deleteDuplicates(ll.head))
console.log(ll.printList())

console.log(deleteDuplicates(ll2.head))
console.log(ll2.printList())
