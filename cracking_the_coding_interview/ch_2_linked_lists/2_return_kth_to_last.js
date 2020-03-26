// recursion, linked-list, two-pointer

const { LinkedList } = require('../../data_structures/modules')

// Recursive solutions

/* 
Recurse and go to the end passing the head and subsequent nodes as the new head on each call.

After each call, increment i and check if i === k.

If i === k, return the head. 
*/

function printKthToLast(head, k) {
  if (!head) return 0
  const index = printKthToLast(head.next, k) + 1

  if (index === k) console.log(k + 'th to last node is ' + head.val)
  return index
}

function kthToLast(head, k) {
  let i = 0

  function inner(head, k) {
    if (!head) return null

    let node = inner(head.next, k)
    i = i + 1
    if (i === k) return head

    return node
  }
  return inner(head, k)
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n). From recursion stack
*/

/* ---------------------------------------------------------------------------- */

// Iterative

/* 

Use the runner technique. Start with two pointers -->  p1 and p2.

Move one pointer (p2) k nodes ahead. 

Then, move both pointers one node at a time, until p2 hits null.
p1 will be kth node from the end. 

For k = 3

Step 1:
p1          p2
1 --> 2 --> 3 --> 4 --> null

Step 2:
      p1          p2
1 --> 2 --> 3 --> 4 --> null

Step 3:
            p1          p2
1 --> 2 --> 3 --> 4 --> null
            ^ 
*/

function kthToLastIterative(head, k) {
  let p1 = head,
    p2 = head

  for (let i = 0; i < k; i++) {
    if (!p2) return null //k > size of linked list
    p2 = p2.next
  }

  while (p2) {
    p1 = p1.next
    p2 = p2.next
  }

  return p1
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

// Tests

function test(cb) {
  const ll = new LinkedList()
  ll.fromArray([1, 2, 3, 5, 1, 2])

  const ll2 = new LinkedList()
  ll2.fromArray([1, 2, 3, 4])

  const testCases = [
    [ll, 3, 5],
    [ll2, 3, 2],
    [ll2, 5, null]
  ]
  cb(testCases)
}

test(testCases => {
  for (const test of testCases) {
    printKthToLast(test[0].head, test[1])
  }
})

test(testCases => {
  for (const test of testCases) {
    const res = kthToLast(test[0].head, test[1])
    res ? console.log(res.val === test[2]) : console.log(res === test[2])
  }
})

test(testCases => {
  for (const test of testCases) {
    const res = kthToLastIterative(test[0].head, test[1])
    res ? console.log(res.val === test[2]) : console.log(res === test[2])
  }
})
