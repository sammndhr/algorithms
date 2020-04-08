const { Trie } = require('../modules')

test('creates a new instance of Trie', () => {
  const trie = new Trie()
  expect(trie instanceof Trie).toBe(true)
})

test('gets root of trie', () => {
  const trie = new Trie(),
    root = {
      s: {
        o: { m: { e: { t: { h: { i: { n: { g: { isWord: true } } } } } } } }
      }
    }
  trie.insert('something')
  expect(trie.root).toEqual(root)
})

describe('insert', () => {
  test('inserts specified word characters in correct order in trie', () => {
    const trie = new Trie(),
      root = {
        s: {
          o: { m: { e: { t: { h: { i: { n: { g: { isWord: true } } } } } } } },
          p: { y: { isWord: true } }
        }
      }
    trie.insert('something')
    trie.insert('spy')
    expect(trie.root).toEqual(root)
  })
})

describe('search', () => {
  test('searches trie and returns true if the word is found', () => {
    const trie = new Trie(),
      wordToSearch = 'something'
    trie.insert('something')

    expect(trie.search(wordToSearch)).toEqual(true)
  })

  test('searches trie and returns false if the word is not found', () => {
    const trie = new Trie(),
      wordToSearch = 'something'
    trie.insert('some')

    expect(trie.search(wordToSearch)).toEqual(false)
  })
})
