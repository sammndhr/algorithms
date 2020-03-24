// const head = Symbol('head') //To keep head as private in linked list

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  #head
  #size

  constructor() {
    // The head property shouldn't be accessible outside the class
    this.#head = null //Class fields aren't supported by a lot of browsers. Use symbol instead to create private class variables.
    this.#size = 0
    // this[head] = null
  }

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

  deleteFromHead() {
    const currHead = this.#head
    if (!currHead) return null

    this.#head = currHead.next //
    currHead.next = null

    this.#size--

    return currHead
  }

  deleteFromTail() {
    let curr = this.#head
    if (!curr) return null

    let prev
    while (curr.next) {
      curr = curr.next
      prev = curr
    }
    prev.next = null

    this.#size--
    return curr
  }

  getSize() {
    return this.#size
  }

  //TODO
  delete(val, deleteMultiple = false) {
    let curr = this.#head
    if (!curr) return false
  }
}

const ll = new LinkedList()
console.log(ll.deleteFromTail())
ll.appendToTail(5)
console.log(ll.deleteFromHead())
console.log(ll.getSize())
ll.appendToTail(3)
console.log(ll.deleteFromHead())
ll.appendToTail(4)
ll.prependToHead(1)
console.log(ll.deleteFromTail())
console.log(ll.getSize())
