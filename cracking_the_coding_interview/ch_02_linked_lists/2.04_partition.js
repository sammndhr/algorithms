//linked-list

const { LinkedList, printList } = require('../../utils')

/* 
First intuition:
1. Create two new linked lists. 
2. Add nodes with vaules < partition to first one. 
3. Add notes with vaules >= partition to second one. 
4. Merge the two lists in the order: first -> second
*/

function partition(node, partitionVal) {
  let head, tailStart, next, headEnd, tail

  while (node) {
    next = node.next
    node.next = null
    if (node.val < partitionVal) {
      if (!head) {
        head = node
        headEnd = head
      } else {
        headEnd.next = node
        headEnd = node
      }
    } else {
      if (!tailStart) {
        tailStart = node
        tail = tailStart
      } else {
        tail.next = node
        tail = node
      }
    }
    node = next
  }

  if (head == null) return tailStart

  headEnd.next = tailStart
  return head
}

/* 
Start with a single node and append less than nodes to the right and greater than nodes to the left.
*/
function partition2(node, partitionVal) {
  let head = node,
    tail = node,
    next

  while (node) {
    next = node.next
    if (node.val < partitionVal) {
      //Attach head to node
      node.next = head
      head = node
    } else {
      //Attach node to tail
      tail.next = node
      tail = node
    }

    node = next
  }
  tail.next = null
  return head
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n) //New linked lists
*/

// Tests

function test(cb) {
  const ll = new LinkedList()
  ll.fromArray([3, 5, 8, 5, 10, 2, 1])

  const ll2 = new LinkedList()
  ll2.fromArray([1, 3, 6, 8, 4, 10, 1, 2])

  const testCases = [
    [ll2, 4],
    [ll, 5],
  ]
  cb(testCases)
}

test((testCases) => {
  for (const test of testCases) {
    printList(partition(test[0].head, test[1]))
  }
})

test((testCases) => {
  for (const test of testCases) {
    printList(partition2(test[0].head, test[1]))
  }
})
