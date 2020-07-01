// with dfs
var numIslands = function (grid) {
  let islands = 0

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] !== '0') {
        dfs(x, y)
        islands++
      }
    }
  }

  return islands

  // -----------------------------------------------
  function dfs(i, j) {
    grid[i][j] = '0'
    const neighbors = getNeighbors(i, j, grid)

    for (const neighbor of neighbors) {
      const [nRow, nCol] = neighbor

      if (grid[nRow][nCol] !== '0') dfs(nRow, nCol)
    }
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// with bfs
var numIslands = function (grid) {
  let islands = 0

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] !== '0') {
        bfs(x, y)
        islands++
      }
    }
  }

  return islands

  // -----------------------------------------------
  function bfs(i, j) {
    const queue = []
    queue.push([i, j])
    grid[i][j] = '0'

    while (queue.length) {
      const [row, col] = queue.shift(),
        neighbors = getNeighbors(row, col, grid)

      for (const neighbor of neighbors) {
        const [nRow, nCol] = neighbor

        if (grid[nRow][nCol] !== '0') {
          queue.push([nRow, nCol])
          grid[nRow][nCol] = '0'
        }
      }
    }
  }
}

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// Common
function getNeighbors(x, y, grid) {
  const result = []

  if (x + 1 < grid.length) result.push([x + 1, y])
  if (y + 1 < grid[0].length) result.push([x, y + 1])
  if (x - 1 >= 0) result.push([x - 1, y])
  if (y - 1 >= 0) result.push([x, y - 1])

  return result
}

// Tests
console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ])
)

// -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
// Old DFS Solution
const COORD_DIFFS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
]

var numIslands = function (grid) {
  const yLength = grid.length

  if (yLength === 0) return 0

  const xLength = grid[0].length

  let count = 0
  for (let i = 0; i < yLength; i++) {
    for (let j = 0; j < xLength; j++) {
      if (grid[i][j] === '1') {
        count++
        expandIsland([i, j], grid)
      }
    }
  }

  return count
}

function expandIsland(pos, grid) {
  const y = pos[0]
  const x = pos[1]

  const isValid = y >= 0 && y < grid.length && x >= 0 && x < grid[0].length

  if (isValid && grid[y][x] === '1') {
    grid[y][x] = '0'
    COORD_DIFFS.forEach((coord) => {
      expandIsland([pos[0] + coord[0], pos[1] + coord[1]], grid)
    })
  }
}
