const { HashTable } = require('../modules')

test('gets correct value from table', () => {
  const hash = new HashTable(10)
  hash.set('test', 'This is a test.')
  expect(hash.get('test')).toBe('This is a test.')
})
