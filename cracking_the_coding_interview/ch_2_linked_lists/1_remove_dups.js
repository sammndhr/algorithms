// linked-list
const { LinkedList } = require('../../data_structures/modules')

function removeDups(head) {
  const set = new Set()
  let curr = head,
    prev = null

  while (curr) {
    if (set.has(curr.val)) {
      prev.next = curr.next
      curr.next = null
      curr = prev.next
    } else {
      set.add(curr.val)
      prev = curr
      curr = curr.next
    }
  }
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

function removeDupsNoBuffer(head) {
  let curr = head
  while (curr) {
    let runner = curr
    while (runner.next) {
      if (runner.next.val === curr.val) runner.next = runner.next.next
      else runner = runner.next
    }
    curr = curr.next
  }
}

/*
n = length of linked list
Time Complexity - O(n^2)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

// Tests

function test(cb) {
  const ll = new LinkedList()
  ll.fromArray([1, 2, 3, 1, 2, 5])

  const ll2 = new LinkedList()
  ll2.fromArray([1, 1, 2])

  const testCases = [
    [ll, [1, 2, 3, 5]],
    [ll2, [1, 2]]
  ]

  cb(testCases)
}

test(testCases => {
  console.log('removeDups')
  for (const c of testCases) {
    const before = c[0].printList()
    removeDups(c[0].head)
    const after = c[0].printList()
    console.log(JSON.stringify(c[1]) === JSON.stringify(after), before, after)
  }
})

test(testCases => {
  console.log('removeDupsNoBuffer')
  for (const c of testCases) {
    const before = c[0].printList()
    removeDupsNoBuffer(c[0].head)
    const after = c[0].printList()
    console.log(JSON.stringify(c[1]) === JSON.stringify(after), before, after)
  }
})
