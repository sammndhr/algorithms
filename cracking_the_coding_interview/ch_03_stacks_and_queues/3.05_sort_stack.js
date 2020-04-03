const { Stack } = require('../../data_structures/modules')
const { getRandomInt } = require('../../utils')

function sortStack(stack) {
  let curr
  const second = new Stack()

  while (!stack.isEmpty()) {
    curr = stack.pop()

    while (!second.isEmpty() && curr < second.peek()) {
      stack.push(second.pop())
    }

    second.push(curr)
  }

  while (!second.isEmpty()) {
    stack.push(second.pop())
  }
}

/*
n = 
Time Complexity - O(n^2)
Space complexity - O(n)
*/

// Tests
const stack = new Stack()

for (let i = 0; i < 10; i++) {
  stack.push(getRandomInt(0, 20))
}

console.log(stack.printStack())
sortStack(stack)
console.log(stack.printStack())
