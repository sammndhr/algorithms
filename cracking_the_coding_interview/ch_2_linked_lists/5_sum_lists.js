// linked-list, recursion
const { ListNode, compareObjects } = require('../../utils')
const { LinkedList } = require('../../data_structures/modules')

// Using LinkedList
function sumLists(ll1, ll2) {
  const sumList = new LinkedList()

  const recurse = (head1, head2, carryOver = 0) => {
    if (!head1 && !head2 && carryOver === 0) {
      return sumList
    }

    let currSum = carryOver

    if (head1) {
      currSum += head1.val
      head1 = head1.next
    }

    if (head2) {
      currSum += head2.val
      head2 = head2.next
    }

    const sumVal = currSum % 10

    carryOver = currSum > 9 ? 1 : 0

    sumList.appendToTail(sumVal)

    return recurse(head1, head2, carryOver)
  }

  return recurse(ll1, ll2)
}

/*
n = length of first linked list
m = length of second linked list

Time Complexity - O(n + m)
Space complexity - O(n + m)
*/

// Tests
const lists = []

const arrs = [
  [7, 1, 6],
  [5, 9, 2],
  [9, 1, 3],
  [8, 2]
]

for (let i = 0; i < 4; i++) {
  ll = new LinkedList()
  ll.fromArray(arrs[i])
  lists.push(ll)
}

const testCases = [
  [lists[0], lists[1], [2, 1, 9]],
  [lists[2], lists[3], [7, 4, 3]]
]

for (const test of testCases) {
  const res = sumLists(test[0].head, test[1].head).printList()
  compareObjects(res, test[2])
}
