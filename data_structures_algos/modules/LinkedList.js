const LinkedList = (function() {
  const head = Symbol('head') //To keep head as private in linked list
  const size = Symbol('size')

  class ListNode {
    constructor(val, next = null) {
      this.val = val
      this.next = next
    }
  }

  class LinkedList {
    // Private static fields
    // #head
    // #size

    constructor() {
      // The head and size property shouldn't be modifiable outside the class. So there should only be a getter. Class fields aren't supported by a lot of browsers. Use symbol instead to create private class variables.
      // this.#head = null
      // this.#size = 0
      this[head] = null
      this[size] = 0
    }

    //getters
    get head() {
      return this[head]
    }

    get size() {
      return this[size]
    }

    fromArray(array) {
      for (const val of array) {
        this.appendToTail(val)
      }
    }

    // T — O(1)
    prependToHead(val) {
      const node = new ListNode(val)

      if (this[head] == null) this[head] = node
      else {
        const prevHead = this[head]
        this[head] = node
        this[head].next = prevHead
      }

      this[size]++
    }

    // T — O(n)
    appendToTail(val) {
      const node = new ListNode(val)

      if (this[head] == null) this[head] = node
      else {
        let curr = this[head]
        while (curr.next) {
          curr = curr.next
        }
        curr.next = node
      }

      this[size]++
    }

    // T — O(1)
    deleteFromHead() {
      const currHead = this[head]
      if (!currHead) return null

      this[head] = currHead.next
      this[size]--
      return currHead.val
    }

    // T — O(n)
    deleteFromTail() {
      let curr = this[head]

      if (!curr) return null

      //Handle case of single node in linked list
      if (!curr.next) {
        this[head] = null
        return curr.val
      }

      let prev = null

      while (curr.next) {
        prev = curr
        curr = curr.next
      }

      prev.next = null

      this[size]--
      return curr.val
    }

    // T — O(n). Non recursive version of deleteNodeRecursive
    deleteNode(val, deleteMultiple = false) {
      let deleteCount = 0

      let curr = this[head],
        prev = null

      while (curr) {
        if (curr.val === val) {
          if (!prev) {
            //Don't need to garbage collect. This is Javascript, not C++
            // const temp = curr
            curr = curr.next
            // temp.next = null
            this[head] = curr
          } else {
            prev.next = curr.next
            // curr.next = null
            curr = prev.next
          }

          this[size]--
          deleteCount++

          if (!deleteMultiple) return true
        } else {
          prev = curr
          curr = curr.next
        }
      }

      return !!deleteCount
    }

    search(val) {
      let curr = this[head]

      while (curr) {
        if (curr.val === val) return true
        curr = curr.next
      }

      return false
    }

    printList() {
      const result = []
      let curr = this[head]

      while (curr) {
        result.push(curr.val)
        curr = curr.next
      }
      console.log(result)
      return result
    }

    getTail() {
      let curr = this[head]
      if (!curr) return null
      while (curr.next) {
        curr = curr.next
      }
      return curr
    }
  }
  return LinkedList
})()

module.exports = LinkedList
