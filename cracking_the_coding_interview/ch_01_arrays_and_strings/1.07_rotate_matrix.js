// Matrix rotation with O(n^2) space complexity. Creating a new rotated matrix
function rotateMatrix(matrix) {
  const n = matrix.length,
    rotated = []
  if (n === 0 || n !== matrix[0].length) return false //invalid matrices

  for (let i = 0; i < n; i++) {
    rotated.push([])
  }

  /* 
  Pattern: 
  column becomes new row value
  length - 1 - row becomes new column value
   */

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const curr = matrix[row][col],
        newRow = col,
        newCol = n - 1 - row
      rotated[newRow][newCol] = curr
    }
  }
  return rotated
}

/*
n = dimension of square matrix (n x n)
Time Complexity - O(n^2)
Space complexity - O(n^2)
*/
/* ---------------------------------------------------------------------------- */

function rotateMatrixInPlace(matrix) {
  const n = matrix.length,
    edge = n - 1
  if (n === 0 || n !== matrix[0].length) return false

  function rotatePixels(row, col) {
    let toRow, toCol, toPixel
    // Start at matrix[row][col]
    let fromRow = row,
      fromCol = col,
      fromPixel = matrix[row][col]

    // Final transformation will end at original (matrix[row][col])
    for (let i = 0; i < 4; i++) {
      // column becomes new row value
      toRow = fromCol
      // edge - row becomes new column value
      toCol = edge - fromRow

      toPixel = matrix[toRow][toCol]
      matrix[toRow][toCol] = fromPixel

      //After transformation, the displaced pixel will need to be transformed. So it becomes the new 'from'
      fromRow = toRow
      fromCol = toCol
      fromPixel = toPixel
    }
  }

  for (let row = 0; row < n / 2; row++) {
    for (let col = row; col < edge - row; col++) {
      rotatePixels(row, col)
    }
  }

  return matrix
}

/*
n = dimension of square matrix (n x n)
Time Complexity - O(n^2)
Space complexity - O(1)
*/

// tests
const testCases = [
  [
    [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 0, 1],
      [2, 3, 4, 5]
    ],
    [
      [2, 8, 4, 0],
      [3, 9, 5, 1],
      [4, 0, 6, 2],
      [5, 1, 7, 3]
    ]
  ],
  [
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ],
    [
      [6, 3, 0],
      [7, 4, 1],
      [8, 5, 2]
    ]
  ]
]

for (const test of testCases) {
  const res = rotateMatrix(test[0])
  console.log('Unrotated: ')
  for (const row of test[0]) {
    console.log(row)
  }
  console.log('Rotated: ')

  for (const row of res) {
    console.log(row)
  }
  console.log(res.toString() === test[1].toString())
  console.log(`---------------`)
}

console.log('\nROTATE IN PLACE')
console.log(`---------------`)

for (const test of testCases) {
  console.log('Unrotated: ')
  for (const row of test[0]) {
    console.log(row)
  }
  const res = rotateMatrixInPlace(test[0])
  console.log('Rotated: ')

  for (const row of test[0]) {
    console.log(row)
  }
  console.log(res.toString() === test[1].toString())
  console.log(`---------------`)
}
