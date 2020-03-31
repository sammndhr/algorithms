const Queue = (function() {
  const first = Symbol('first') //To keep frist as private in queue
  const last = Symbol('last')

  class QueueNode {
    constructor(data, next = null) {
      this.data = data
      this.next = next
    }
  }

  class Queue {
    constructor() {
      this[first] = null
      this[last] = null
    }

    add(item) {
      const node = new QueueNode(item)
      if (this[last]) {
        this[last].next = node
      }
      this[last] = node

      if (!this[first]) this[first] = this[last]
    }

    remove() {
      if (!this[first]) return null
      const data = this[first].data
      this[first] = this[first].next
      if (!this[first]) last = null
      return data
    }

    peek() {
      if (!this[first]) return null
      return this[first].data
    }

    isEmpty() {
      return this[first] === null
    }

    printQueue() {
      const result = []
      let curr = this[first]

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
