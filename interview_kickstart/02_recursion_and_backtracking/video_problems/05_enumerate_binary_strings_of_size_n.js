/* Enumerate all possible binary strings of length n. */

/*
BFS Recursive decrease-and-conquer
Time Complexity - O(n * 2^n)
Space Complexity - O(2^n) 
*/
function rBinaryStrings(n) {
  if (n < 0) return []
  else if (n === 1) return ['0', '1']
  else {
    const prev = rBinaryStrings(n - 1),
      result = []

    for (const s of prev) {
      result.push(s + '0')
      result.push(s + '1')
    }

    return result
  }
}

// ---------------------------------------

/*
Iterative decrease-and-conquer
Time Complexity - O(n * 2^n)
Space Complexity - O(2^n)
*/
function iBinaryStrings(n) {
  if (n < 1) return []

  let result = ['0', '1']

  for (let i = 2; i <= n; i++) {
    const newResult = []

    for (const s of result) {
      newResult.push(s + '0')
      newResult.push(s + '1')
    }

    result = newResult
  }

  return result
}

// ---------------------------------------

/*
DFS Recursive divide-and-conquer
Time Complexity - O(n * 2^n)
Space Complexity - O(n). Height of tree or length of prefix of partial slate which increases with depth.
*/
function binaryStrings(n) {
  if (n < 1) return []

  const result = []
  bsHelper('', n)
  return result

  function bsHelper(slate, n) {
    if (n === 0) result.push(slate)
    else {
      bsHelper(slate + '0', n - 1)
      bsHelper(slate + '1', n - 1)
    }
  }
}

// Tests
const tests = [
  [2, ['00', '01', '10', '11']],
  [3, ['000', '001', '010', '011', '100', '101', '110', '111']],
  [
    4,
    [
      '0000',
      '0001',
      '0010',
      '0011',
      '0100',
      '0101',
      '0110',
      '0111',
      '1000',
      '1001',
      '1010',
      '1011',
      '1100',
      '1101',
      '1110',
      '1111'
    ]
  ],
  [1, ['0', '1']],
  [0, []]
]

console.log('Recursive decrease-and-conquer')
for (const test of tests) {
  const res = rBinaryStrings(test[0])
  console.log(test[0], res)
  console.log(JSON.stringify(res) === JSON.stringify(test[1]))
}

console.log('Iterative decrease-and-conquer')
for (const test of tests) {
  const res = JSON.stringify(iBinaryStrings(test[0]))
  console.log(res === JSON.stringify(test[1]))
}

console.log('Recursive divide-and-conquer')
for (const test of tests) {
  const res = JSON.stringify(binaryStrings(test[0]))
  console.log(res === JSON.stringify(test[1]))
}
