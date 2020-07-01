// With dfs
var floodFill = function (image, sr, sc, newColor) {
  const oldColor = image[sr][sc]

  dfs(sr, sc)

  return image

  // -----------------------------------------------
  function dfs(i, j) {
    // All 4-direction connected cells' colors have been changed to new color
    if (image[i][j] === newColor) return
    // Edge of same color block
    if (image[i][j] !== oldColor) return
    /* 
    1. if function didn't return, we're still inside the 'same color' block.
    2. Update old color to new color.
    3. And call dfs on that cell's valid neighbors.
    */
    image[i][j] = newColor
    const neighbors = getNeighbors(i, j, image)

    for (const neighbor of neighbors) {
      const [nRow, nCol] = neighbor

      dfs(nRow, nCol)
    }
  }
}

// With bfs
var floodFillBFS = function (image, sr, sc, newColor) {
  const oldColor = image[sr][sc]

  bfs(sr, sc)

  return image

  function bfs(i, j) {
    // Selected color is already new color so just return
    if (image[i][j] === newColor) return

    const queue = []
    queue.push([i, j])
    image[i][j] = newColor

    while (queue.length) {
      const [row, col] = queue.shift(),
        neighbors = getNeighbors(row, col, image)

      for (const neighbor of neighbors) {
        const [nRow, nCol] = neighbor

        if (image[nRow][nCol] === oldColor) {
          queue.push(neighbor)
          image[nRow][nCol] = newColor
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

// tests
const tests = [
  [
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1]
    ],
    1,
    1,
    2
  ],
  [
    [
      [0, 0, 0],
      [0, 1, 1]
    ],
    1,
    1,
    1
  ],
  [[[0]], 0, 0, 2]
]

for (const test of tests) {
  console.log(floodFill(test[0], test[1], test[2], test[3]))
  console.log(floodFillBFS(test[0], test[1], test[2], test[3]))
}
