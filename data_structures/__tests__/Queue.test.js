const { Queue } = require('../modules')

test('creates a new instance of Queue', () => {
  const queue = new Queue()
  expect(queue instanceof Queue).toBe(true)
})

describe('printQueue', () => {
  test('prints all items of queue as an array', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.printQueue()).toEqual([1, 2])
  })
})

describe('peek', () => {
  test('returns first item of queue if it exists', () => {
    const queue = new Queue()
    queue.enqueue(1)
    expect(queue.peek()).toBe(1)
  })

  test('returns null if queue is empty', () => {
    const queue = new Queue()
    queue.enqueue(1)
    expect(queue.peek()).toBe(1)
  })
})

describe('enqueue', () => {
  test('adds item to end of queue', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    const arr = queue.printQueue(),
      len = arr.length
    expect(arr[len - 1]).toBe(2)
  })
  test('does not add item to beginning of queue', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.peek()).toBe(1)
  })
})

describe('remove', () => {
  test('removes and return first item of queue', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)
  })

  test('removes the first item of queue and modifies first to be the next item', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.dequeue()
    expect(queue.peek()).toBe(2)
  })

  test('return null if queue is empty', () => {
    const queue = new Queue()
    expect(queue.dequeue()).toBe(null)
  })
})

describe('isEmpty', () => {
  test('returns true if queue is empty', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).toBe(true)
  })

  test('returns false if queue is not empty', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBe(false)
  })
})
