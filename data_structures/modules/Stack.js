const Stack = (function() {
  const top = Symbol('top') //To keep top as private in stack

  class StackNode {
    constructor(data, next = null) {
      this.data = data
      this.next = next
    }
  }

  class Stack {
    constructor() {
      this[top] = null
    }

    push(item) {
      const node = new StackNode(item)
      node.next = this[top]
      this[top] = node
    }

    pop() {
      if (this[top] === null) return null
      const item = this[top].data
      this[top] = this[top].next
      return item
    }

    peek() {
      if (this[top] === null) return null
      return this[top].data
    }

    isEmpty() {
      return this[top] === null
    }

    printStack() {
      const result = []
      let curr = this[top]

      while (curr) {
        result.push(curr.data)
        curr = curr.next
      }
      // console.log(result)
      return result
    }
    stackToString() {
      return JSON.stringify(this.printStack())
    }
  }

  return Stack
})()

module.exports = Stack
