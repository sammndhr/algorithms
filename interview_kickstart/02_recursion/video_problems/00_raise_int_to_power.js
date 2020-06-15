// Given two integers, n and k, calcuate n^k. n > 0, k >= 0

/* 
Recursive
Time Complexity - O(k)
Space Complexity - O(k). From call stack
*/

function rRaiseIntToPower(n, k) {
  if (k === 0) return 1
  else return n * rRaiseIntToPower(n, k - 1)
}

// ----------------------------------------------
/*
Iterative
Time Complexity - O(k)
Space Complexity - O(1)
*/
function iRaiseIntToPower(n, k) {
  let result = 1
  for (let i = 1; i <= k; i++) {
    result *= n
  }
  return result
}

// Tests ------------------------------------------
const tests = [
  [2, 4, 16],
  [2, 0, 1],
  [12, 5, 248832]
]
console.log('Recursive tests')
for (const test of tests) {
  console.log(rRaiseIntToPower(test[0], test[1]) === test[2])
}

console.log('Iterative tests')
for (const test of tests) {
  console.log(iRaiseIntToPower(test[0], test[1]) === test[2])
}
