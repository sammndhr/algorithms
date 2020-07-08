/* First intuition
1. Shortest path so another bfs problem. 
2. The keys and doors add complexity but otherwise problem is a bit like the max area of island.
   So a "grid with implied adjacency list" problem where neighbors for each cell will be four cells -
   top, bottom, left and right.
3. We're not given the start and end coords, so we'll have to traverse the grid once in the beginning to get that info.
   Since we'll be traversing the grid once anyway, we should collect the keys and their coordinates.
   We'll save this info in a hash. Eg. { b: [[0,4], [2,3]], c: [[0,3]] }. Problem says there can be more than
   one key (or door) of the same type so we need to make sure we collect ALL keys of the same time and their coords.
4. After traversing, we know three things — all keys and their locations, the start coords, the end coords. 
5. We'll use a matrix (array of arrays) to keep track of the cells we've visited. We'll also save the "path"
   we've travelled to reach that cell in an array. Eg. [[2,0], [1,0]].
   TODO: Space optimized way to do this would be with a linked list of the path (coords).
6. The rest is just traversing the graph (or grid) with bfs starting from the start coord.
   If we hit a door, we'll get the matching key and the coords the key is present in from our keys hash.
   And check those coords in the visited matrix. If any one of the keys cells has been visited,
   we can go through the door. We'll also ignore waters as we traverse the grid.
7. If we reach the end coord, we return visited at the end cell coords.

First intuition didn't work. Reasons:
1. Forgot constraint "You're allowed to revisit cells" so keeping track
   of visited and only traversing the unvisited didn't work. 

First Refactor:
So I got rid of the 'if visited[row][col]' condition. Issue I ran into:
1. If the cell was a door, it would still check if a matching key was already visited,
   but this didn't work either.
2. If a key was found, it would be visited for ALL paths - even for ones
   that didn't go through the key.
3. Saving the path of coords in the visited matrix doesn't work. Multiple paths will all
   push their coords into the ONE path array per cell.

Second Refactor:
1. So I went on a walk and talked about the problem with Zach, came back to whiteboard, doodled and 
   let it sit for a while.
2. To each cell that I added to the queue, I added another key - path.
   So each cell would have the path that got them there.
3. I still had the issue of checking if key was found in that path. So I added another key - keysInPath
   to the cell object. So if a door is found, first we check if the key exists in keysInPath before
   adding that cell to the queue. 
4. This works but only for TWO test cases. Everything else is 'Time Limit Exceeded'. I think I'm
   missing something on how I'm traversing the paths but I can't think of anything, so I'll leave
   this problem for now. I'm satisfied with how far I got with this problem.
*/

function find_shortest_path(grid) {
  const start = findStart(grid)
  return bfs(start, grid)
}

function bfs(start, grid) {
  let queue = [
    { row: start[0], col: start[1], path: [start], keysInPath: new Set() }
  ]

  while (queue.length) {
    const { row, col, path, keysInPath } = queue.shift(),
      neighbors = getNeighbors(row, col, grid)

    for (const neighbor of neighbors) {
      const [nRow, nCol] = neighbor,
        cell = grid[nRow][nCol]
      // If we get to the end, return the path along with the end coords
      if (cell === '+') return [...path, neighbor]

      // Check if cell is door and if it is, check if a key exists in the path
      const isDoor = checkIfDoor(nRow, nCol, grid),
        keyExists = isDoor && doesKeyExistInPath(cell.toLowerCase(), keysInPath)

      // We need to copy the keysInPath set
      const nextKeysInPath = new Set(keysInPath),
        isKey = checkIfKey(nRow, nCol, grid)

      // If cell is key, add the cell or key to the key path
      if (isKey) nextKeysInPath.add(cell)
      /*
      We can only go through land, keys and doors if the key exists.
      For everything else skip
      */
      if (cell === '.' || isKey || keyExists) {
        queue.push({
          row: nRow,
          col: nCol,
          path: [...path, neighbor],
          keysInPath: nextKeysInPath
        })
      } else {
        continue
      }
    }
  }
}

function doesKeyExistInPath(key, keysInPath) {
  return keysInPath.has(key)
}

function checkIfDoor(x, y, grid) {
  const charCode = grid[x].charCodeAt(y)
  if (charCode > 65 && charCode < 91) return true
  return false
}

function checkIfKey(x, y, grid) {
  const charCode = grid[x].charCodeAt(y)
  if (charCode > 96 && charCode < 123) return true
  return false
}

function getNeighbors(x, y, grid) {
  const result = []

  if (x + 1 < grid.length) result.push([x + 1, y])
  if (y + 1 < grid[0].length) result.push([x, y + 1])
  if (x - 1 >= 0) result.push([x - 1, y])
  if (y - 1 >= 0) result.push([x, y - 1])

  return result
}

function findStart(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '@') return [row, col]
    }
  }
}

// tests
console.log(find_shortest_path(['...B', '.b#.', '@#+.']))
// The next tests takes too long and my computer gets angry after a while.
console.log(find_shortest_path(['+B...', '####.', '##b#.', 'a...A', '##@##']))
