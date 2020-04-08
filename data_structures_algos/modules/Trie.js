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

const Trie = (() => {
  let root

  const traverse = word => {
    let curr = root
    for (const ch of word) {
      if (!curr) return null
      curr = curr[ch]
    }
    return curr
  }

  class Trie {
    constructor() {
      root = {}
    }

    get root() {
      return root
    }

    insert(word) {
      let curr = root
      for (const ch of word) {
        curr[ch] = curr[ch] ? curr[ch] : {}
        curr = curr[ch]
      }

      curr.isWord = true
    }

    search(word) {
      let node = traverse(word)
      return node !== null && node.isWord === true
    }

    startsWith(word) {
      return traverse(word) !== null
    }
  }
  return Trie
})()

module.exports = Trie
