/* 

https://leetcode.com/problems/implement-trie-prefix-tree/solution/
Visualize a trie as a 26 by n matrix with one way relation between the letters in different levels. n is the length of the longest word in the trie.

words — deed, nom, noon

a  b  c  d  e  f  g  h  i  j  k  l  m  n  o ...
           ↘                            ↘ 
a  b  c  d  e  f  g  h  i  j  k  l  m  n  o ...
            ↓                           ↙ ↓
            ↓                         ↙   ↓
a  b  c  d  e  f  g  h  i  j  k  l  m  n  o ...
          ↙                             ↙
a  b  c  d  e  f  g  h  i  j  k  l  m  n  o ...

The root would look like:

const trie =
{
  d: { e: { e: { d: { isWord: true } } } },
  n: { o: { o: { n: { isWord: true } },
       m: { isWord: true } }
     }
}

*/

// We'll assume that the words provided will consist of letters only and are always lowercase

const Trie = class Trie {
  #root
  constructor() {
    this.#root = {}
  }

  get root() {
    return this.#root
  }
  // helper. Change to private when private instance methods are supported
  _traverse(word) {
    let curr = this.#root
    for (const ch of word) {
      if (!curr) return null
      curr = curr[ch]
    }
    return curr
  }

  insert(word) {
    let curr = this.#root
    for (const ch of word) {
      curr[ch] = curr[ch] ? curr[ch] : {}
      curr = curr[ch]
    }

    curr.isWord = true
  }

  search(word) {
    let node = this._traverse(word)
    return node !== null && node.isWord === true
  }

  startsWith(word) {
    return this._traverse(word) !== null
  }
}

module.exports = Trie
