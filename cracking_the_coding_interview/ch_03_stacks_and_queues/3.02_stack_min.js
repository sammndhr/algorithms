const { Stack } = require('../../utils')

const StackWithMin = (function () {
  let minStack = new Stack()

  class StackWithMin extends Stack {
    constructor() {
      super()
    }

    min() {
      return minStack.peek()
    }

    push(item) {
      super.push(item)
      //Set item as new min if min is null or if item <= min
      if (minStack.peek() === null || item <= minStack.peek()) {
        minStack.push(item)
      }
    }

    pop() {
      const item = super.pop()

      // pop item from min stack if min === item
      if (minStack.peek() === item) minStack.pop()

      return item
    }
  }

  return StackWithMin
})()

// Tests

const stack = new StackWithMin()
stack.push(3)
stack.push(1)

console.log('min: ', stack.min(), stack.stackToString())
stack.push(0)
stack.push(4)
console.log('min: ', stack.min(), stack.stackToString())
stack.push(-1)
console.log('min: ', stack.min(), stack.stackToString())
stack.push(0)
stack.push(-1)
console.log('min: ', stack.min(), stack.stackToString())
stack.pop()
stack.pop()
console.log('min: ', stack.min(), stack.stackToString())
stack.pop()
console.log('min: ', stack.min(), stack.stackToString())
console.log(stack.printStack())
