class SetOfStacks {
  constructor(capacity = 5) {
    this.capacity = capacity
    this.stacks = []
  }

  getLastStack() {
    if (this.stacks.length == 0) {
      return null
    }
    return this.stacks[this.stacks.length - 1]
  }

  push(value) {
    const lastStack = this.getLastStack()
    if (this.stacks.length === 0 || lastStack.length === this.capacity) {
      var newStack = []
      newStack.push(value)
      this.stacks.push(newStack)
    } else {
      lastStack.push(value)
    }
  }

  pop() {
    if (this.isEmpty()) return null
    const last = this.getLastStack(),
      popped = last.pop()

    if (this.numStack === 0) {
      return undefined
    }

    //make sure to remove the stack if the last item was popped
    if (last.length === 0) {
      this.stacks.pop()
    }

    return popped
  }

  peek() {
    if (this.isEmpty()) return null
    var currStack = this.getLastStack()
    return currStack[currStack.length - 1]
  }

  isEmpty() {
    return this.stacks.length === 0
  }

  // After popping the value from the specified stack,
  // move the items from the subsequent stacks over.
  // There shouldn't be any holes.

  popAt(stackNum) {
    if (stackNum < 1 || stackNum > this.stacks.length) {
      console.log('Invalid stackNum.')
      return
    }

    //Start at the stack from which the item will be popped
    let curr = this.stacks[stackNum - 1],
      // pop the item and save it for now
      popped = curr.pop(),
      temp = [],
      next = []

    // If stack is not the last stack, move over items
    if (stackNum < this.stacks.length) {
      // need to loop over all the stacks that follow
      for (let i = stackNum; i < this.stacks.length; ++i) {
        next = this.stacks[i]
        // reverse stack (without using built in methods like shift)
        // because we need to 'pop' from the front and push to the curr stack.
        while (next.length > 0) {
          temp.push(next.pop())
        }
        // Once stack has been reversed, pop and push one item to fill the hole left behind by popped
        curr.push(temp.pop())

        //next will be empty because be popped all the items.
        //push remaining items.

        while (temp.length > 0) {
          next.push(temp.pop())
        }
        // There will be one hole left, so set curr to next and go through the loop again
        curr = next
      }
    }

    //if the last stack becomes empty, remove it
    if (this.getLastStack().length === 0) {
      this.stacks.pop()
    }

    return popped
  }
}

// Tests

var stack = new SetOfStacks(3)

for (let i = 1; i < 12; i++) {
  stack.push(i)
}

console.log('Stacks: ', stack.stacks)

stack.popAt(4)
stack.popAt(4)

console.log('Stacks: ', stack.stacks)

console.log('Empty? ', stack.isEmpty())

for (let i = 1; i < 11; i++) {
  console.log('Popped: ', stack.pop())
}

console.log('Stacks: ', stack.stacks)
console.log('Peek: ', stack.peek())

console.log('Empty? ', stack.isEmpty())
