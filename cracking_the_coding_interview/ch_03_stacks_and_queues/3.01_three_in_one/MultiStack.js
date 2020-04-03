/* 

Multi Stack: Stack is instanciated with given initial size but resized based on available capacity of other stacks. 

const stack = new MultiStack(3,4) //partition into three stacks of defaultSize 4

Will create an array that is 3 * 4 in size and will partition the stack into three stacks. 

We start out with the following numbers,

|   stack 0     |      stack 1         |     stack 2           |
[ 0a, 0b, 0c, 0d, null, null, null, null, 2a, null, null, null ]

stack 0 is full

| Stack No  |  Size  | Capacity   |
-----------------------------------
|     0     |   4    |     4      |
|     1     |   0    |     4      |
|     2     |   1    |     4      |


After pushing another item into stack 0,

|      stack 0      |      stack 1   |     stack 2           |
[ 0a, 0b, 0c, 0d, 0e, null, null, null, 2a, null, null, null ]

stack 0 is full, but capacity has increased

     
| Stack No  |  Size  | Capacity   |
-----------------------------------
|     0     |   5    |     5      |
|     1     |   0    |     3      |
|     2     |   1    |     4      |
     
*/

const MultiStack = (function() {
  let values = [],
    info

  // Adjust index so it is within bounds (wrap if need to)
  const adjustIndex = index => {
    const max = values.length
    return ((index % max) + max) % max
  }

  const nextIndex = index => {
    return adjustIndex(index + 1)
  }

  const previousIndex = index => {
    return adjustIndex(index - 1)
  }

  const shift = stackNum => {
    const stack = info[stackNum]

    // if stack is >= capacity, shift the next stack over.
    if (stack.size >= stack.capacity) {
      const nextStack = (stackNum + 1) % info.length
      shift(nextStack)
      stack.capacity++
    }

    // Shift all items in stack over by one.
    let index = stack.lastCapacityIndex()
    while (stack.isWithinStackCapacity(index)) {
      values[index] = values[previousIndex(index)]
      index = previousIndex(index)
    }

    //Adjust stack data
    values[stack.start] = null
    stack.start = nextIndex(stack.start)
    stack.capacity--
  }

  // Expand stack by shifting over other stacks
  const expand = stackNum => {
    shift((stackNum + 1) % info.length)
    info[stackNum].capacity++
  }

  class StackInfo {
    constructor(start, capacity) {
      this.start = start
      this.capacity = capacity
      this.size = 0
    }

    isWithinStackCapacity(index) {
      if (index < 0 || index >= values.length) return false

      // If index wraps around, adjust it.
      const contiguousIndex = index < this.start ? index + values.length : index
      const end = this.start + this.capacity
      return this.start <= contiguousIndex && contiguousIndex < end
    }

    lastCapacityIndex() {
      return adjustIndex(this.start + this.capacity - 1)
    }

    lastElementIndex() {
      return adjustIndex(this.start + this.size - 1)
    }

    isFull() {
      return this.size == this.capacity
    }

    isEmpty() {
      return this.size == 0
    }
  }

  class MultiStack {
    constructor(numberOfStacks, defaultSize) {
      //Will use the info array and keep track of size, capacity and the start of each stack.
      info = new Array(numberOfStacks)

      for (let i = 0; i < numberOfStacks; i++) {
        info[i] = new StackInfo(defaultSize * i, defaultSize)
      }
      // each stack can be dynamically resized but numberOfStacks * defaultSize will determine the maximum length of the size of the main array.
      values = new Array(numberOfStacks * defaultSize).fill(null)
    }

    get values() {
      return values
    }

    get sizesAndCapacity() {
      const res = {}
      info.forEach((stack, i) => {
        res[i] = { size: stack.size, capacity: stack.capacity }
      })
      return res
    }

    //return total number of elements in values array.
    numberOfElements() {
      let size = 0
      for (const sd of info) {
        size += sd.size
      }
      return size
    }

    allStacksAreFull() {
      return this.numberOfElements() == values.length
    }

    push(stackNum, value) {
      if (this.allStacksAreFull()) {
        console.log('All stacks are full.')
        return
      }

      const stack = info[stackNum]
      if (stack.isFull()) expand(stackNum)
      stack.size++
      values[stack.lastElementIndex()] = value
    }

    pop(stackNum) {
      const stack = info[stackNum]
      if (stack.isEmpty()) {
        console.log('Stack is empty.')
        return
      }
      const value = values[stack.lastElementIndex()]
      values[stack.lastElementIndex()] = null
      stack.size--
      return value
    }

    peek(stackNum) {
      const stack = info[stackNum]
      return values[stack.lastElementIndex()]
    }

    getStackValues(stackNum) {
      const stack = info[stackNum]
      const items = new Array(stack.size)
      for (let i = 0; i < items.length; i++) {
        items[i] = values[adjustIndex(stack.start + i)]
      }
      return items
    }
  }
  return MultiStack
})()

const stack = new MultiStack(3, 4)
stack.push(0, '0a')
stack.push(0, '0b')
stack.push(0, '0c')
// stack.push(1, '1a')
// stack.push(1, '1b')
// stack.push(1, '1c')
// stack.push(1, '1d')
// stack.push(1, '1e')
// stack.push(1, '1f')
// stack.push(1, '1g')
// stack.push(1, '1h')
// stack.push(1, '1i')
// stack.push(1, '1j')
stack.push(0, '0d')
stack.push(2, '2a')
stack.push(0, '0e')
// stack.push(0, '0f')
// stack.push(0, '0e')
console.log(stack.allStacksAreFull())
console.log(stack.numberOfElements())
console.log(stack.values)
console.log(stack.peek(0))
console.log(stack.getStackValues(0))
console.log(stack.getStackValues(1))
console.log(stack.sizesAndCapacity)
