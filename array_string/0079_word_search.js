/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

//Without changing board. Extra memory
// Time Complexity - O(mn * 4^q), q = word.length
// Space Complexity- O(mn + 2^q)
var exist = function(board, query) {
  const height = board.length,
    width = board[0].length,
    qLen = query.length
  let seen = {}
  const helper = (i, j, q) => {
    const seenKey = `${i}_${j}`
    if (q === qLen) return true
    if (i < 0 || j < 0 || i >= height || j >= width) return false
    if (seen[seenKey]) return false
    if (board[i][j] !== query[q]) return false

    seen[seenKey] = true

    if (helper(i - 1, j, q + 1)) return true
    if (helper(i + 1, j, q + 1)) return true
    if (helper(i, j - 1, q + 1)) return true
    if (helper(i, j + 1, q + 1)) return true

    delete seen[seenKey]

    return false
  }

  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      if (query[0] === board[h][w]) {
        if (helper(h, w, 0)) return true
      }
    }
  }
  return false
}

// Changes board
// Time Complexity - O(mn * 4^q), q = word.length
// Space Complexity - O(mn + q)

var exist = function(board, query) {
  const height = board.length,
    width = board[0].length,
    qLen = query.length

  const helper = (i, j, q) => {
    if (i < 0 || j < 0 || i >= height || j >= width) return false
    if (board[i][j] !== query[q]) return false
    if (q === qLen - 1) return true
    board[i][j] = '*'

    if (helper(i - 1, j, q + 1)) return true
    if (helper(i + 1, j, q + 1)) return true
    if (helper(i, j - 1, q + 1)) return true
    if (helper(i, j + 1, q + 1)) return true

    board[i][j] = query[q]

    return false
  }

  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      if (helper(h, w, 0)) return true
    }
  }
  return false
}

const board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
]
console.log(exist(board, 'ABCCED'))
console.log(exist(board, 'SEE'))
console.log(exist(board, 'ABCB'))
console.log(
  exist(
    [
      ['C', 'A', 'A'],
      ['A', 'A', 'A'],
      ['B', 'C', 'D']
    ],
    'AAB'
  )
)
console.log(exist(board, 'ABCCED12'))
console.log(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'E', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    'ABCESEEEFS'
  )
)
console.log(exist([['a']], 'a'))
