/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function(grid) {
  const maxRow = [],
    maxCol = []
  let m = grid.length,
    n = grid[0].length,
    blocksAdded = 0

  for (row = 0; row < m; row++) {
    let maxSoFar = 0
    for (col = 0; col < n; col++) {
      curVal = grid[row][col]
      maxSoFar = Math.max(maxSoFar, curVal)
    }
    maxRow.push(maxSoFar)
  }

  for (col = 0; col < n; col++) {
    let maxSoFar = 0
    for (row = 0; row < m; row++) {
      curVal = grid[row][col]
      maxSoFar = Math.max(maxSoFar, curVal)
    }
    maxCol.push(maxSoFar)
  }

  for (row = 0; row < m; row++) {
    for (col = 0; col < n; col++) {
      curVal = grid[row][col]
      newVal = Math.min(maxRow[row], maxCol[col])
      blocksAdded += newVal - curVal
    }
  }

  return blocksAdded
}

const grid = [
  [3, 0, 8, 4],
  [2, 4, 5, 7],
  [9, 2, 6, 3],
  [0, 3, 1, 0]
]
console.log(maxIncreaseKeepingSkyline(grid))
