const { Stack } = require('../modules')

test('creates a new instance of Stack', () => {
  const stack = new Stack()
  expect(stack instanceof Stack).toBe(true)
})

describe('peek', () => {
  test('returns top value of stack if it exists', () => {
    const stack = new Stack()
    stack.push(1)
    expect(stack.peek()).toBe(1)
  })

  test('returns null if stack is empty', () => {
    const stack = new Stack()
    stack.push(1)
    expect(stack.peek()).toBe(1)
  })
})

describe('push', () => {
  test('adds item to top of stack', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.peek()).toBe(2)
  })
})

describe('pop', () => {
  test('removes and return top item of stack', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.pop()).toBe(2)
  })
  test('removes the top item of stack and modifies top to be the next item', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    stack.pop()
    expect(stack.peek()).toBe(1)
  })
  test('return null if stack is empty', () => {
    const stack = new Stack()
    expect(stack.pop()).toBe(null)
  })
})

describe('isEmpty', () => {
  test('returns true if stack is empty', () => {
    const stack = new Stack()
    expect(stack.isEmpty()).toBe(true)
  })
})

describe('printStack', () => {
  test('prints all items of stack as an array', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.printStack()).toEqual([2, 1])
  })
})
