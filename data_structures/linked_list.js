// const head = Symbol('head') //To keep head as private in linked list

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  // Private static fields
  #head
  #size

  constructor() {
    // The head and size property shouldn't be accessible outside the class
    this.#head = null //Class fields aren't supported by a lot of browsers. Use symbol instead to create private class variables.
    this.#size = 0
    // this[head] = null
  }

  getSize() {
    return this.#size
  }
  // T — O(1)
  prependToHead(value) {
    const node = new Node(value)

    if (this.#head == null) this.#head = node
    else {
      const prevHead = this.#head
      this.#head = node
      this.#head.next = prevHead
    }

    this.#size++
  }

  // T — O(n)
  appendToTail(value) {
    const node = new Node(value)

    if (this.#head == null) this.#head = node
    else {
      let curr = this.#head
      while (curr.next) {
        curr = curr.next
      }
      curr.next = node
    }

    this.#size++
  }

  // T — O(1)
  deleteFromHead() {
    const currHead = this.#head
    if (!currHead) return null

    this.#head = currHead.next
    currHead.next = null

    this.#size--
    return currHead.value
  }

  // T — O(n)
  deleteFromTail() {
    let curr = this.#head

    if (!curr) return null

    //Handle case of single node in linked list
    if (!curr.next) {
      this.#head = null
      return curr.value
    }

    let prev = null

    while (curr.next) {
      prev = curr
      curr = curr.next
    }

    prev.next = null

    this.#size--
    return curr.value
  }

  // T — O(n)
  // S — O(n). Recursive deleteNode call for cases like 1 --> 1 --> 1 --> 1 --> null would result in O(n) space.
  // TODO: Use while loop instead of recursion.
  deleteNode(value, deleteMultiple = false) {
    let deleteCount = 0

    const recursiveDelete = () => {
      let head = this.#head

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

      let curr = this.#head,
        prev = null

      while (curr) {
        if (curr.value === value) {
          //this won't throw error even though first call runs with prev = null cause we've already handled case of head.value === value
          prev.next = curr.next
          curr.next = null
          curr = prev.next

          this.#size--
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

  search(value) {
    let curr = this.#head

    while (curr) {
      if (curr.value === value) return true
      curr = curr.next
    }

    return false
  }

  printList() {
    const result = []
    let curr = this.#head

    while (curr) {
      result.push(curr.value)
      curr = curr.next
    }

    return result
  }
}

//Tests

const ll = new LinkedList()
ll.appendToTail(5)
ll.appendToTail(3)
ll.appendToTail(1)
ll.appendToTail(4)
ll.prependToHead(1)
ll.prependToHead(1)

console.log('Search:', 4, ll.search(4))
console.log('Search:', 9, ll.search(9))
console.log('--------------------------')
console.log('Size:', ll.getSize())
console.log('--------------------------')

console.log('Print List:', ll.printList())
console.log('Delete:', 1, ll.deleteNode(1, false))
console.log('Print List:', ll.printList())
console.log('--------------------------')

ll.appendToTail(1)
console.log('Print List:', ll.printList())
console.log('Delete multiple:', 1, ll.deleteNode(1, true))
console.log('Print List:', ll.printList())
console.log('--------------------------')

console.log('Delete From Head: ', ll.deleteFromHead())
console.log('--------------------------')
console.log('Print List:', ll.printList())
console.log('Delete From Tail: ', ll.deleteFromTail())
console.log('--------------------------')
console.log('Print List:', ll.printList())
console.log('Delete From Tail: ', ll.deleteFromTail())
console.log('Print List:', ll.printList())

const ll1 = new LinkedList()

ll1.appendToTail(1)
ll1.appendToTail(1)
ll1.appendToTail(1)
ll1.appendToTail(1)
ll1.appendToTail(1)
console.log('--------------------------')
console.log("Delete 1's from linked list of only 1's")
console.log('Print List:', ll1.printList())
console.log('Delete multiple:', 1, ll1.deleteNode(1, true))
console.log('Print List:', ll1.printList())
