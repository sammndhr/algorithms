function nQueens(n) {
  const results = []

  placeQueens(0, [])
  return createBoard(results, n)

  function placeQueens(row, columns) {
    if (row === n) {
      results.push(columns.slice(0))
      return
    }

    for (let col = 0; col < n; col++) {
      if (checkValid(columns, row, col)) {
        columns[row] = col
        placeQueens(row + 1, columns)
      }
    }
  }

  function checkValid(columns, row1, col1) {
    for (let row2 = 0; row2 < row1; row2++) {
      const col2 = columns[row2]

      if (col1 === col2) return false

      const colDistance = Math.abs(col2 - col1),
        rowDistance = row1 - row2

      if (colDistance === rowDistance) return false
    }
    return true
  }

  function createBoard(results) {
    const boards = []
    for (const column of results) {
      const board = []
      for (let rowI = 0; rowI < n; rowI++) {
        let row = ''
        for (let col = 0; col < n; col++) {
          row += column[col] === rowI ? 'q' : '-'
        }

        board.push(row)
      }

      boards.push(board)
    }
    return boards
  }
}

console.log(nQueens(4))
