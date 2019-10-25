/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  const len = grid.length,
    last = len - 1
  if (grid[0][0] || grid[last][last]) return -1
  const queue = [{ coord: [0, 0], k: 1 }],
    directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]],
    isValidCord = (x, y) => x >= 0 && x < len && y >= 0 && y < len
  grid[0][0] = 1
  while (queue.length) {
    const {
      coord: [x, y],
      k
    } = queue.shift()
    if (x === last && y === last) return k
    for (let [moveX, moveY] of directions) {
      const nextX = x + moveX,
        nextY = y + moveY
      if (isValidCord(nextX, nextY) && grid[nextX][nextY] === 0) {
        queue.push({ coord: [nextX, nextY], k: k + 1 })
        grid[nextX][nextY] = 1
      }
    }
  }
  return -1
}

console.log(shortestPathBinaryMatrix([[0, 1], [1, 0]]))
