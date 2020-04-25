const Queue = (function () {
  class QueueNode {
    constructor(data, next = null) {
      this.data = data
      this.next = next
    }
  }

  class Queue {
    #first
    #last
    //Look in ./LinkedList.js to see other ways of declaring private static fields https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Private_fields
    constructor() {
      this.#first = null
      this.#last = null
    }

    enqueue(item) {
      const node = new QueueNode(item)
      if (this.#last) {
        this.#last.next = node
      }
      this.#last = node

      if (!this.#first) this.#first = this.#last
    }

    dequeue() {
      if (!this.#first) return null
      const data = this.#first.data
      this.#first = this.#first.next
      if (!this.#first) this.#last = null
      return data
    }

    peek() {
      if (!this.#first) return null
      return this.#first.data
    }

    isEmpty() {
      return this.#first === null
    }

    printQueue() {
      const result = []
      let curr = this.#first

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
