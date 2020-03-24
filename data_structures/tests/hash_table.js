const { HashTable } = require('../modules')
const hash = new HashTable(10)
hash.set('test', 'This is a test.')

console.log(hash)
console.log(hash.get('test'))
