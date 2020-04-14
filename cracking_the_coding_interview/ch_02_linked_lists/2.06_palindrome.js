// linked-list, two-pointer, recursion
const { LinkedList, ListNode } = require('../../utils')

/* 
 #1: Reverse and Compare
 1. Reverse linked list
 2. Compare each node of reversed and unreversed linked list. 
 */

function reverseList(head) {
  let curr = head,
    newHead
  while (curr) {
    const node = new ListNode(curr.val)
    node.next = newHead
    newHead = node
    curr = curr.next
  }

  return newHead
}

function isEqual(ll1, ll2) {
  let list1 = ll1,
    list2 = ll2

  while (list1 && list2) {
    if (list1.val !== list2.val) return false
    list1 = list1.next
    list2 = list2.next
  }

  return !list1 && !list2
}

function isPalindromeReverse(head) {
  const reversed = reverseList(head)
  return isEqual(head, reversed)
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

/* 
#2: Iterative: Two-pointer (runner)

1. Use the runner technique. Start with two pointers -->  slow and fast.
2. slow moves one node at a time. fast moves twice as slow. 
3. Push slow values into stack as the pointer advance. 
4. When fast reaches the end, slow will be halfway. 

Step 1:
slow          
1 --> 2 --> 3 --> 2 --> 1 --> null
fast
stack = []

Step 2:
      slow
1 --> 2 --> 3 --> 2 --> 1 --> null
            fast
stack = [1]

Step 3:
            slow          
1 --> 2 --> 3 --> 2 --> 1 --> null
                        fast
stack = [1,2]


5. if (fast.next === null) slow = slow.next (length is odd, so skip the middle node).

Step 4:
                  slow          
1 --> 2 --> 3 --> 2 --> 1 --> null
                        fast
stack = [1,2]

6. Iterate through the rest of the list with slow,
popping from stack and comparing the popped value and slow.val


Step 5:
                  slow          
1 --> 2 --> 3 --> 2 --> 1 --> null

stack = [1]
popped = 2
slow.val === popped

7. If (slow.val !== popped) return false

8. return true at end. 

 */
function isPalindrome(head) {
  let slow = head,
    fast = head,
    popped
  const stack = []

  while (fast && fast.next) {
    stack.push(slow.val)
    slow = slow.next
    fast = fast.next.next
  }

  if (fast) {
    slow = slow.next
  }

  while (slow) {
    popped = stack.pop()
    if (popped !== slow.val) return false
    slow = slow.next
  }
  return true
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n). Comes from the stack. It's n/2 because you only push half of the linked list into the stack. 
*/

/* ---------------------------------------------------------------------------- */

/* 
#2: Recursive - Basically a combination of the above two. 

1. Get length of linked list. 
2. Recurse with head, length.
3. Call recursive func while passing length - 2 and head.next until length === 1 for odd and length === 0 for even
4. This is the halfway point of the list. 
5. Rewind and return head.next as node (head if it's even). return { result: true, node: head.next } 
6. if result === false, return {result: false, node}. Don't need to keep walking down the list to check.
7. Compare: result = node.val === head.val and keep rewinding and returning


linked list: 1 --> 2 --> 3 --> 2 --> 1 --> null

Call stack:

head: 3 --> 2 --> 1 --> null, length: 1             | returns {node: 2 --> 1 --> null, result: true}
head: 2 --> 3 --> 2 --> 1 --> null, length: 3       | returns {node: 1 --> null, result: true}
head: 1 --> 2 --> 3 --> 2 --> 1 --> null, length: 5 | returns {node: null, result: true}

*/

function isPalindromeRecurse(head) {
  function getLength(node) {
    let len = 0,
      curr = node

    while (curr) {
      curr = curr.next
      len++
    }
    return len
  }

  function recurse(head, length) {
    if (!head || length <= 0) return { result: true, node: head }
    if (length === 1) return { result: true, node: head.next }

    const res = recurse(head.next, length - 2)

    if (!res.result || res.node === null) return res

    res.result = head.val === res.node.val
    res.node = res.node.next

    return res
  }

  return recurse(head, getLength(head)).result
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

// Tests

function test(cb) {
  const ll1 = new LinkedList()
  ll1.fromArray([1, 2, 3, 3, 2, 1])
  const ll2 = new LinkedList()
  ll2.fromArray([1, 2, 1])
  const ll3 = new LinkedList()
  ll3.fromArray([1, 2, 3])
  const ll4 = new LinkedList()
  ll4.fromArray([])
  const ll5 = new LinkedList()
  ll5.fromArray([1])

  const testCases = [
    [ll1, true],
    [ll2, true],
    [ll3, false],
    [ll4, true],
    [ll5, true],
  ]
  cb(testCases)
}

test((testCases) => {
  console.log('isPalindromeReverse')
  for (const test of testCases) {
    console.log(isPalindromeReverse(test[0].head) === test[1])
  }
})

test((testCases) => {
  console.log('isPalindrome')
  for (const test of testCases) {
    console.log(isPalindrome(test[0].head) === test[1])
  }
})

test((testCases) => {
  console.log('isPalindromeRecurse')
  for (const test of testCases) {
    console.log(isPalindromeRecurse(test[0].head) === test[1])
  }
})
