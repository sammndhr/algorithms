// linked-list

/* 

You don't have access to the head of the linked list.
Only the node that needs to be deleted.
You can't delete it if it's the last node in the linked list.

Because you don't have access to the prev node,
copy over the data of the next node and delete that node. 

*/
const { LinkedList } = require('../../utils')

function deleteMiddleNode(node) {
  if (!node || !node.next) return false

  const next = node.next

  node.val = next.val
  node.next = next.next

  return true
}

/*
n = length of linked list
Time Complexity - O(1)
Space complexity - O(1)
*/

// Tests

const ll = new LinkedList()
ll.fromArray([1, 2, 3, 4, 5])

const ll2 = new LinkedList()
ll2.fromArray([1, 2, 3])

const ll3 = new LinkedList()
ll3.fromArray([1, 2])

const testCases = [
  [ll, ll.head.next.next, [1, 2, 4, 5]],
  [ll2, ll2.head.next, [1, 3]],
  [ll3, ll3.head.next, false],
]

for (const test of testCases) {
  const deleted = deleteMiddleNode(test[1])

  if (deleted)
    console.log(JSON.stringify(test[0].printList()) === JSON.stringify(test[2]))
  else console.log(deleted === test[2])
}
