// linked-list, two-pointer
const { LinkedList } = require('../../utils')

/* 
Floyd's Cycle Detection
https://www.youtube.com/watch?v=zbozWoMgKW0
https://www.youtube.com/watch?v=LUm2ABqAs1w&feature=emb_logo
*/

function loopDetection(head) {
  let slow = head,
    fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      break
    }
  }

  if (!fast || !fast.next) return null

  slow = head

  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return fast
}

// Tests

const ll1 = new LinkedList()
ll1.fromArray([1, 2, 3, 1, 2, 5])

const loopStart = ll1.head.next.next
const tail = ll1.getTail()
tail.next = loopStart

const testCases = [[ll1, loopStart]]

for (const test of testCases) {
  console.log(loopDetection(test[0].head) === test[1])
}
