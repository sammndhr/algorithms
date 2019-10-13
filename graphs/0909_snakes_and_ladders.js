/**
 * @param {number[][]} board
 * @return {number}
 */
const getLocation = (sq, n) => {
  const remainder = (sq - 1) % n,
    quotient = Math.floor((sq - 1) / n),
    row = n - 1 - quotient,
    col = row % 2 !== n % 2 ? remainder : n - 1 - remainder
  return [row, col]
}

var snakesAndLadders = function(board) {
  const queue = [1],
    n = board.length,
    end = n ** 2,
    visited = { 1: 0 }

  while (queue.length) {
    let curr = queue.shift()
    if (curr === end) return visited[curr]

    for (let i = curr + 1; i <= Math.min(curr + 6, end); i++) {
      const [row, col] = getLocation(i, n),
        next = board[row][col] === -1 ? i : board[row][col]
      if (visited[next] === undefined) {
        queue.push(next)
        visited[next] = visited[curr] + 1
      }
    }
  }
  return -1
}

const board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, 12, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1]
]
const board1 = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]]

const board2 = [
  [-1, -1, 78, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, 99, -1],
  [-1, -1, -1, 50, -1, -1, -1, -1, -1, -1],
  [-1, 88, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 69, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, 18, -1, -1, -1, -1, -1, -1]
]

console.log(snakesAndLadders(board))
// console.log(snakesAndLadders(board1))
// console.log(snakesAndLadders(board2))
