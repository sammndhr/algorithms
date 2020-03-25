const head = Symbol('head') //To keep head as private in linked list
const size = Symbol('size') //To keep head as private in linked list

class Node {
  constructor(value, next = null) {
    this.value = value
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
    for (const value of array) {
      this.appendToTail(value)
    }
  }

  // T — O(1)
  prependToHead(value) {
    const node = new Node(value)

    if (this[head] == null) this[head] = node
    else {
      const prevHead = this[head]
      this[head] = node
      this[head].next = prevHead
    }

    this[size]++
  }

  // T — O(n)
  appendToTail(value) {
    const node = new Node(value)

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
    return currHead.value
  }

  // T — O(n)
  deleteFromTail() {
    let curr = this[head]

    if (!curr) return null

    //Handle case of single node in linked list
    if (!curr.next) {
      this[head] = null
      return curr.value
    }

    let prev = null

    while (curr.next) {
      prev = curr
      curr = curr.next
    }

    prev.next = null

    this[size]--
    return curr.value
  }

  // T — O(n). Non recursive version of deleteNodeRecursive
  deleteNode(value, deleteMultiple = false) {
    let deleteCount = 0

    let curr = this[head],
      prev = null

    while (curr) {
      if (curr.value === value) {
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

  /*
  // T — O(n)
  // S — O(n). Recursive deleteNode call for cases like 1 --> 1 --> 1 --> 1 --> null would result in O(n) space.
  deleteNode(value, deleteMultiple = false) {
    let deleteCount = 0

    const recursiveDelete = () => {
      let head = this[head]

      if (!head) return false

      //Using this.deleteFromHead() to delete from head
      if (head.value === value) {
        this.deleteFromHead()
        deleteCount++

        if (!deleteMultiple) return
        else {
          // Call recursiveDelete recursively for cases like deleting multiple 1's from 1 --> 1 --> 1 --> 3 --> null
          recursiveDelete()
        }
      }

      let curr = this[head],
        prev = null

      while (curr) {
        if (curr.value === value) {
          //this won't throw error even though first call runs with prev = null cause we've already handled case of head.value === value
          prev.next = curr.next
          curr.next = null
          curr = prev.next

          this[size]--
          deleteCount++

          if (!deleteMultiple) return
        } else {
          prev = curr
          curr = curr.next
        }
      }
    }

    recursiveDelete()

    //only return true if anything was actually deleted
    return !!deleteCount
  }
  */

  search(value) {
    let curr = this[head]

    while (curr) {
      if (curr.value === value) return true
      curr = curr.next
    }

    return false
  }

  printList() {
    const result = []
    let curr = this[head]

    while (curr) {
      result.push(curr.value)
      curr = curr.next
    }

    return result
  }
}

module.exports = LinkedList
