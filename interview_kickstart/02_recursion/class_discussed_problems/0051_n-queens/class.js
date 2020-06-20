var find_all_arrangements = function (n) {
  const sub = Array.from(new Array(n)).map((v, i) => i)
  const result = []
  solveNQueensHelper(sub, 0, [], result)

  const convertAns = (answer) =>
    answer.reduce((acc, pos) => {
      let row = ''
      for (let i = 0; i < n; i++) {
        if (pos === i) {
          row += 'Q'
        } else {
          row += '.'
        }
      }
      acc.push(row)
      return acc
    }, [])

  return result.map(convertAns, [])
}

function solveNQueensHelper(S, start, slate, result) {
  if (!isLastQueenValid(slate)) {
    return
  }

  if (start === S.length) {
    result.push(slate.slice(0))
    return
  }

  for (let i = start; i < S.length; i++) {
    const val = S[i]
    swap(S, start, i)
    slate.push(val)
    solveNQueensHelper(S, start + 1, slate, result)
    slate.pop()
    swap(S, i, start)
  }
}

function isLastQueenValid(positions) {
  const lastCol = positions.length - 1
  const lastRow = positions[lastCol]
  for (let col = 0; col < lastCol; col++) {
    const row = positions[col]
    if (Math.abs(lastRow - row) === Math.abs(lastCol - col)) {
      return false
    }
  }
  return true
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

console.log(find_all_arrangements(4))
