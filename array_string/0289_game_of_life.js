/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
  const rowLen = board.length
  if (!rowLen) return
  const colLen = board[0].length,
    boardCopy = []
  for (let k = 0; k < rowLen; k++) {
    boardCopy.push(board[k].slice(0))
  }
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      const currCell = boardCopy[i][j]
      let iMinusOneSum, iPlusOneSum
      if (!boardCopy[i - 1]) {
        iMinusOneSum = 0
      } else {
        iMinusOneSum =
          (boardCopy[i - 1][j - 1] || 0) +
          (boardCopy[i - 1][j] || 0) +
          (boardCopy[i - 1][j + 1] || 0)
      }
      if (!boardCopy[i + 1]) {
        iPlusOneSum = 0
      } else {
        iPlusOneSum =
          (boardCopy[i + 1][j - 1] || 0) +
          (boardCopy[i + 1][j] || 0) +
          (boardCopy[i + 1][j + 1] || 0)
      }
      const neighboringCellCount =
        iMinusOneSum +
        iPlusOneSum +
        (boardCopy[i][j + 1] || 0) +
        (boardCopy[i][j - 1] || 0)
      if (!currCell && neighboringCellCount === 3) {
        board[i][j] = 1
      }
      if (currCell && (neighboringCellCount < 2 || neighboringCellCount > 3)) {
        board[i][j] = 0
      }
      if (
        currCell &&
        (neighboringCellCount === 2 || neighboringCellCount === 3)
      ) {
        board[i][j] = 1
      }
    }
  }
}

const board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]
console.log(board)
gameOfLife(board)
console.log(board)
