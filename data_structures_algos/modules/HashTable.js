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
    const i = this.hash(key)
    // if no collision, set the bucket at position i to array
    if (!this.buckets[i]) this.buckets[i] = []
    // push [key, val] into the array
    this.buckets[i].push([key, value])
    return i
  }

  get(key) {
    const i = this.hash(key)

    if (!this.buckets[i]) return null
    // check each pair inside the bucket at position i
    // if key matches key at pair[0] return the val at pair[1]
    for (const pair of this.buckets[i]) {
      if (pair[0] === key) return pair[1]
    }
  }
}
module.exports = HashTable
