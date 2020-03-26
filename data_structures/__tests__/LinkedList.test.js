const { LinkedList } = require('../modules')

describe('head, size, print, search', () => {
  const ll = new LinkedList(),
    testList = [5, 3]
  ll.fromArray(testList)

  test('gets head of linked list', () => {
    expect(ll.head).toEqual({ val: 5, next: { val: 3, next: null } })
  })

  test('does not mutate head of linked list', () => {
    ll.head = null
    expect(ll.head).toEqual({ val: 5, next: { val: 3, next: null } })
  })

  test('gets size of linked list', () => {
    expect(ll.size).toBe(2)
  })

  test('prints all node vals as an array', () => {
    expect(ll.printList()).toEqual(testList)
  })

  test('searches linked list and returns true if given val exists', () => {
    expect(ll.search(5)).toBe(true)
  })

  test('searches linked list and returns false if given val does not exist', () => {
    expect(ll.search(1)).toBe(false)
  })
})

describe('add', () => {
  test('appends nodes to end of linked list from vals of array', () => {
    const ll = new LinkedList(),
      testList = [5, 3]
    ll.fromArray(testList)
    expect(ll.head).toEqual({ val: 5, next: { val: 3, next: null } })
  })

  test('prepends node of given val to head of linked list ', () => {
    const ll = new LinkedList()
    ll.fromArray([2])
    ll.prependToHead(1)
    expect(ll.printList()).toEqual([1, 2])
  })

  test('appends node of given val to tail of linked list ', () => {
    const ll = new LinkedList()
    ll.fromArray([1])
    ll.appendToTail(2)
    expect(ll.printList()).toEqual([1, 2])
  })
})

describe('delete from head', () => {
  test('deletes head node of linked list if node does not equal null and returns deleted node val', () => {
    const ll = new LinkedList(),
      testList = [5, 3]
    ll.fromArray(testList)
    expect(ll.deleteFromHead()).toBe(5)
  })

  test('returns null if head is null', () => {
    const ll = new LinkedList()
    expect(ll.deleteFromHead()).toBe(null)
  })
})

describe('delete from tail', () => {
  test('deletes tail node of linked list if node does not equal null and returns deleted node val', () => {
    const ll = new LinkedList(),
      testList = [5, 3]
    ll.fromArray(testList)
    expect(ll.deleteFromTail()).toBe(3)
  })

  test('returns null if head is null', () => {
    const ll = new LinkedList()
    expect(ll.deleteFromTail()).toBe(null)
  })
})

describe('delete node of given val', () => {
  test('deletes first node that matches the given val', () => {
    const ll = new LinkedList(),
      testList = [1, 2, 1, 3]
    ll.fromArray(testList)
    expect(ll.deleteNode(1, false)).toBe(true)
  })

  test('deletes only the first node that matches the given val', () => {
    const ll = new LinkedList(),
      testList = [1, 2, 1, 3]
    ll.fromArray(testList)
    ll.deleteNode(1, false)
    expect(ll.printList()).toEqual([2, 1, 3])
  })

  test('deletes all nodes that matches the given val', () => {
    const ll = new LinkedList(),
      testList = [1, 2, 1, 3]
    ll.fromArray(testList)
    ll.deleteNode(1, true)
    expect(ll.printList()).toEqual([2, 3])
  })

  test('returns false if node of given val is not found', () => {
    const ll = new LinkedList(),
      testList = [1, 2, 1, 3]
    ll.fromArray(testList)
    expect(ll.deleteNode(9, false)).toBe(false)
  })

  test('returns null if head is null', () => {
    const ll = new LinkedList()
    expect(ll.deleteFromTail()).toBe(null)
  })
})
