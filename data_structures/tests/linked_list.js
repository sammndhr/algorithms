const { LinkedList } = require('../modules')
//Tests

const ll = new LinkedList()
ll.fromArray([5, 3, 1])
ll.appendToTail(4)
ll.prependToHead(1)
ll.prependToHead(1)

console.log('Head: ', ll.head)
ll.head = { val: 200, next: null } //Doesn't do anything
console.log(ll.printList())

console.log('--------------------------')
console.log('Search:', 4, ll.search(4))
console.log('Search:', 9, ll.search(9))
console.log('--------------------------')
console.log('Size:', ll.size)
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
