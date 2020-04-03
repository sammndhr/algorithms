/* 

Fixed Multi Stack:

const stack = new FixedMultiStack(4)

Will create an array that is 3 * 4 in size and will partition the stack into three fixed stacks. 

|   stack 0    |       stack 1         |     stack 2          |
[ 0a, 0b, 0c, 0d, null, null, null, null, 2a, null, null, null ]
               ^                          ^
          top of 0                     top of 2

| Stack No  |  Size  | Capacity   |
-----------------------------------
|     0     |   4    |     4      |
|     1     |   0    |     4      |
|     2     |   1    |     4      |

*/
// converted to js from book.
const FixedMultiStack = (function() {
  const numberOfStacks = 3
  let stackCapacity, values, sizes

  // checks if provided stackNum is valid.
  const isStackNumValid = stackNum => {
    if (!(stackNum < numberOfStacks) && !stackNum >= 0) {
      console.log('Invalid stackNum.')
      return false
    }
    return true
  }

  class FixedMultiStack {
    constructor(stackSize) {
      stackCapacity = stackSize
      //The array's size will be stackSize * numberOfStacks and initially be filled with null.
      values = new Array(stackSize * numberOfStacks).fill(null)
      // Array to keep track of the number of items in each stack.
      sizes = new Array(numberOfStacks).fill(0)
    }

    get values() {
      return values
    }

    push(stackNum, value) {
      if (!isStackNumValid(stackNum)) return

      if (this.isFull(stackNum)) {
        console.log('Stack is full.')
        return
      }

      sizes[stackNum]++
      values[this.indexOfTop(stackNum)] = value
    }

    pop(stackNum) {
      if (!isStackNumValid(stackNum)) return
      if (this.isEmpty(stackNum)) {
        console.log('Stack is empty.')
        return
      }
      const topIndex = this.indexOfTop(stackNum),
        value = values[topIndex]
      values[topIndex] = null
      sizes[stackNum]--
      return value
    }

    peek(stackNum) {
      if (!isStackNumValid(stackNum)) return
      if (this.isEmpty(stackNum)) return 'Stack is empty.'

      return values[this.indexOfTop(stackNum)]
    }

    isEmpty(stackNum) {
      if (!isStackNumValid(stackNum)) return
      return sizes[stackNum] === 0
    }

    isFull(stackNum) {
      if (!isStackNumValid(stackNum)) return
      return sizes[stackNum] === stackCapacity
    }

    indexOfTop(stackNum) {
      if (!isStackNumValid(stackNum)) return
      const offset = stackNum * stackCapacity,
        size = sizes[stackNum]

      return offset + size - 1
    }

    getStackValues(stackNum) {
      if (!isStackNumValid(stackNum)) return
      const items = new Array(sizes[stackNum])
      for (let i = 0; i < items.length; i++) {
        items[i] = values[stackNum * stackCapacity + i]
      }
      return items
    }
  }
  return FixedMultiStack
})()

// Tests

const stack = new FixedMultiStack(4)
console.log('-------FixedMultiStack-------')
stack.push(0, '0 0')
stack.push(1, '1 0')
stack.push(1, '1 1')
stack.push(1, { 1: { 2: 'testo' } })
stack.push(1, '1 3')
console.log(stack.peek(2))
stack.push(2, '2 0')
console.log(stack.isFull(0))
console.log(stack.isFull(1))
console.log(stack.indexOfTop(0))
stack.push(1, 'fail')
stack.push('fail')
console.log(stack.peek(0))
console.log(stack.peek(0))
console.log(stack.values)
console.log(stack.getStackValues(1))
