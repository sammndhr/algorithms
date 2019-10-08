/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  let count = 0
  const len = M.length,
    visited = new Array(len).fill(0)
  const dfs = row => {
    for (let col = 0; col < len; col++) {
      const person = M[row][col]
      if (person === 1 && visited[col] === 0) {
        visited[col] = 1
        dfs(col)
      }
    }
  }

  for (let row = 0; row < len; row++) {
    if (visited[row] === 0) {
      dfs(row)
      count++
    }
  }
  return count
}

//My attempt (doesn't work)
var findCircleNumFail = function(M) {
  let count = 0
  const len = M.length
  const helper = (i, j) => {
    const recurse = (i, j) => {
      if (!M[i] || j >= len || j < 0) return
      if (M[i][j] === 1) {
        M[i][j] = 2
      } else {
        return
      }

      recurse(i, j + 1)
      recurse(i, j - 1)
      recurse(i + 1, j)
      recurse(i + 1, j - 1)
      recurse(i - 1, j)
      recurse(i - 1, j + 1)
    }
    if (!M[i][j]) {
      return 0
    }
    recurse(i, j)
    return 1
  }

  for (let row = 0; row < len; row++) {
    for (let col = 0; col < len; col++) {
      const person = M[row][col]
      if (person !== 2) {
        temp = helper(row, col)
        count += temp
      }
    }
  }
  return count
}
const arr1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
const arr2 = [[1, 1, 0], [1, 1, 1], [0, 1, 1]]
const arr3 = [[1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 1, 1]]
const arr4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
const arr5 = [[1, 0, 0, 1, 0], [0, 1, 1, 0, 1], [0, 1, 1, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 0, 1]]
const arr6 = [[1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 0, 0], [0, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 1]]

console.log(findCircleNum(arr1)) //2
console.log(findCircleNum(arr2)) //1
console.log(findCircleNum(arr3)) //1
console.log(findCircleNum(arr4)) //4
console.log(findCircleNum(arr5)) //1
console.log(findCircleNum(arr6)) //3
