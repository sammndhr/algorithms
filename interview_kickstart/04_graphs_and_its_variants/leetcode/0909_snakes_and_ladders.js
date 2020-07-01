var snakesAndLadders = function (board) {
  const size = board.length,
    maxSquare = size * size

  return minMoves(1)
  // -----------------------------------------------
  function numToRowCol(n) {
    const row = Math.floor((maxSquare - n) / size),
      c = (n - 1) % (2 * size) //c is in the range of 0 to 2*size -1
    // Because board is "boustrophedonically", make cols 2 * size

    let col

    if (c < size) col = c
    else col = 2 * size - 1 - c

    return [row, col]
  }

  // -----------------------------------------------
  // bfs for shortest path
  function minMoves(n) {
    const queue = [],
      visited = {}

    queue.push(n)
    visited[n] = 0 //records the shortest path distance from source to this vertex

    while (queue.length) {
      const curr = queue.shift()

      for (let i = 1; i < 7; i++) {
        let next = curr + i

        if (next > maxSquare) continue

        const [row, col] = numToRowCol(next)
        // if cell is snake or ladder, go down snake or go up ladder
        if (board[row][col] !== -1) next = board[row][col]

        if (visited[next] === undefined) {
          queue.push(next)
          visited[next] = visited[curr] + 1
          // The first path to get to end will be the min
          if (next === maxSquare) return visited[next]
        }
      }
    }

    // It's possible to have an impossible game, in which case return -1
    return -1
  }
}

// tests
const board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1]
]

console.log(snakesAndLadders(board))
