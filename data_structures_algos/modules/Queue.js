const Queue = (function() {
  let first, last //Look in ./LinkedList.js to see other ways of declaring private static fields https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Private_fields

  class QueueNode {
    constructor(data, next = null) {
      this.data = data
      this.next = next
    }
  }

  class Queue {
    constructor() {
      first = null
      last = null
    }

    enqueue(item) {
      const node = new QueueNode(item)
      if (last) {
        last.next = node
      }
      last = node

      if (!first) first = last
    }

    dequeue() {
      if (!first) return null
      const data = first.data
      first = first.next
      if (!first) last = null
      return data
    }

    peek() {
      if (!first) return null
      return first.data
    }

    isEmpty() {
      return first === null
    }

    printQueue() {
      const result = []
      let curr = first

      while (curr) {
        result.push(curr.data)
        curr = curr.next
      }
      console.log(result)
      return result
    }
  }
  return Queue
})()

module.exports = Queue
