// linked-list, two-pointer
const { LinkedList } = require('../../data_structures/modules')

/* 
1. Two linked lists are intersecting if they merge at some node. 

  3 --> 1 --> 5 --> 9 
                      --> 7 --> 2 -->  1
              4 --> 6

2. Traverse both lists and get the tail and size. 
3. Check if the tails point to the same node. 
4. If they don't, return null
5. If they do, get the longer and shorter lists
6. Move the longer pointer until it matches the length of the shorter pointer
7. Traverse both lists until both pointers are the same. 

*/

function findIntersection(ll1, ll2) {
  if (!ll1 || !ll2) return null

  const res1 = getTailAndSize(ll1)
  const res2 = getTailAndSize(ll2)

  if (res1.tail !== res2.tail) return null

  let shorter = res1.size < res2.size ? ll1 : ll2
  let longer = res2.size < res2.size ? ll2 : ll1

  let k = Math.abs(res2.size - res1.size)

  while (k > 0 && longer) {
    longer = longer.next
    k--
  }

  while (shorter !== longer) {
    shorter = shorter.next
    longer = longer.next
  }

  return longer

  function getTailAndSize(node) {
    res = { tail: null, size: 0 }
    if (!node) return res

    let len = 1,
      curr = node

    while (curr.next) {
      curr = curr.next
      len++
    }
    return { tail: curr, size: len }
  }
}

/*
n = length of first linked list
m = length of second linked list

Time Complexity - O(n + m)
Space complexity - O(1)
*/

// Tests

const ll1 = new LinkedList()
ll1.fromArray([3, 1, 5, 9, 7, 2, 1])

const ll2 = new LinkedList()
ll2.fromArray([4, 6])

const intersection = ll1.head.next.next.next.next

ll2.head.next.next = intersection

const testCases = [[ll1, ll2, intersection]]

for (const test of testCases) {
  console.log(findIntersection(test[0].head, test[1].head) === test[2])
}
