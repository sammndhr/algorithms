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
