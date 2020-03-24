function zeroMatrix(matrix) {
  const m = matrix.length,
    n = matrix[0] && matrix[0].length

  if (!m || !n) return false

  const zeroRows = {},
    zeroCols = {}

  //look for zeroes
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const cell = matrix[row][col]
      if (cell === 0) {
        zeroRows[row] = true
        zeroCols[col] = true
      }
    }
  }

  // Zero out rows
  for (const row of Object.keys(zeroRows)) {
    for (let col = 0; col < n; col++) {
      matrix[row][col] = 0
    }
  }

  // Zero out columns
  for (const col of Object.keys(zeroCols)) {
    for (let row = 0; row < m; row++) {
      matrix[row][col] = 0
    }
  }

  return matrix
}

/*
Matrix (m x n)
Time Complexity - O(m x n)
Space complexity - O(z). z is the number of zeros (x 2)
*/

// Tests
const testCases = [
  [
    [
      [7, 1, 2, 3, 4],
      [4, 5, 6, 0, 2],
      [8, 9, 3, 1, 3],
      [2, 0, 4, 5, 9],
      [3, 5, 2, 0, 3]
    ],
    [
      [7, 0, 2, 0, 4],
      [0, 0, 0, 0, 0],
      [8, 0, 3, 0, 3],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  ],
  [
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ]
]

for (const test of testCases) {
  console.log(zeroMatrix(test[0]).toString() === test[1].toString())
}
