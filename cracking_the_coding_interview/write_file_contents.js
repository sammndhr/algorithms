const writeFileContents = functionName => {
  const fileContents = `const { LinkedList } = require('../../data_structures/modules')
  const { ListNode, compareObjects, LLToArr } = require('../../utils')

function ${functionName}(head) {
  let curr = head
}

/*
n = length of linked list
Time Complexity - O(n)
Space complexity - O(n)
*/

// Tests

const ll1 = new LinkedList()
ll1.fromArray([1, 2, 3, 1, 2, 5])

const ll2 = new LinkedList()
ll2.fromArray([1, 1, 2])

const testCases = [
  [ll1, []],
  [ll2, []]
]

for (const test of testCases) {
  console.log(${functionName}(test[0].head) === test[1])
}
  `
  return fileContents
}

const functionName = process.argv[2]

console.log(writeFileContents(functionName))
