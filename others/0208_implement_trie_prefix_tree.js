/**
 * Initialize your data structure here.
 */
// Mine
class Trie {
  constructor() {
    this.letters = {}
  }

  insert(word) {
    const len = word.length
    let curr = this.letters
    for (let i = 0; i < len; i++) {
      const letter = word[i]
      if (!curr[letter]) curr[letter] = {}
      curr = curr[letter]
    }
    curr.isEnd = true
  }

  traverse(word) {
    const len = word.length
    let curr = this.letters
    for (let i = 0; i < len; i++) {
      const letter = word[i]
      if (!curr[letter]) return false
      curr = curr[letter]
    }
    return curr
  }

  search(word) {
    return !!this.traverse(word).isEnd
  }

  startsWith(prefix) {
    return !!this.traverse(prefix)
  }
}
// https://leetcode.com/problems/implement-trie-prefix-tree/discuss/58965/Concise-JavaScript-solution
//ES5 Constructor function version
// function Trie() {
//   this.root = {}
// }

// Trie.prototype.insert = function(word) {
//   let curr = this.root
//   word.split('').forEach(ch => (curr = curr[ch] = curr[ch] || {}))
//   curr.isWord = true
// }

// Trie.prototype.traverse = function(word) {
//   let curr = this.root
//   for (var i = 0; i < word.length; i++) {
//     if (!curr) return null
//     curr = curr[word[i]]
//   }
//   return curr
// }

// Trie.prototype.search = function(word) {
//   let node = this.traverse(word)
//   return !!node && !!node.isWord
// }

// Trie.prototype.startsWith = function(word) {
//   return !!this.traverse(word)
// }

const trie = new Trie()
trie.insert('apple')
console.log(trie)
console.log(trie.search('app'))
console.log(trie.search('apple'))
console.log(trie.startsWith('app'))
