const { Stack } = require('../../data_structures/modules')

const MyQueue = (function() {
  let stackNewest, stackOldest
  const shiftStacks = () => {
    if (stackOldest.isEmpty()) {
      while (!stackNewest.isEmpty()) {
        stackOldest.push(stackNewest.pop())
      }
    }
  }
  class MyQueue {
    constructor() {
      stackNewest = new Stack()
      stackOldest = new Stack()
    }
    add(value) {
      stackNewest.push(value)
    }
    peek() {
      shiftStacks()
      return stackOldest.peek()
    }
    remove() {
      shiftStacks()
      return stackOldest.pop() // pop the oldest item.
    }
  }
  return MyQueue
})()

// Tests

const q = new MyQueue()
q.add(1)
q.add(2)
q.add(3)
console.log(q.remove())
console.log(q)
console.log(q.peek())
