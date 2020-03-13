/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  for (let row = 0; row < 9; row++) {
    const hasNumInRow = {}
    for (let col = 0; col < 9; col++) {
      const elem = board[row][col]
      if (hasNumInRow[elem] && elem !== '.') {
        return false
      }
      hasNumInRow[board[row][col]] = true
    }
  }
  for (let col = 0; col < 9; col++) {
    const hasNumInCol = {}
    for (let row = 0; row < 9; row++) {
      const elem = board[row][col]
      if (hasNumInCol[elem] && elem !== '.') {
        return false
      }
      hasNumInCol[elem] = true
    }
  }
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const hasNumInSquare = {}

      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
          const elem = board[i][j]

          if (hasNumInSquare[elem] && elem !== '.') {
            return false
          }
          hasNumInSquare[board[i][j]] = true
        }
      }
    }
  }
  return true
}

const board1 = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '5', '.', '1', '9', '.', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
]
const board2 = [
  ['.', '8', '7', '6', '5', '4', '3', '2', '1'],
  ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['9', '.', '.', '.', '.', '.', '.', '.', '.']
]
const board3 = [
  ['.', '.', '4', '.', '.', '.', '6', '3', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['5', '.', '.', '.', '.', '.', '.', '9', '.'],
  ['.', '.', '.', '5', '6', '.', '.', '.', '.'],
  ['4', '.', '3', '.', '.', '.', '.', '.', '1'],
  ['.', '.', '.', '7', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '5', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.']
]
console.log(isValidSudoku(board1))
console.log(isValidSudoku(board2))
console.log(isValidSudoku(board3))
