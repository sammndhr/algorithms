/* https://reactgo.com/hashtable-javascript/ */

/*
Rudimentary javascript hash table resolving collisions with separate chaining. 
Todo: Resolve conflicts with Linear Probing, Separate Chaining (linked lists)
*/

class HashTable {
  constructor(size = 42) {
    this.buckets = new Array(size)
    this.size = size
  }

  hash(key) {
    return key.toString().length % this.size
  }

  set(key, value) {
    let index = this.hash(key)
    if (!this.buckets[index]) {
      this.buckets[index] = []
    }
    this.buckets[index].push([key, value])
    return index
  }

  get(key) {
    let index = this.hash(key)
    if (!this.buckets[index]) return null
    for (const bucket of this.buckets[index]) {
      if (bucket[0] === key) {
        return bucket[1]
      }
    }
  }
}

module.exports = HashTable
