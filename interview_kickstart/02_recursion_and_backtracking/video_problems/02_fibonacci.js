/* Fibonacci Sequence — https://en.wikipedia.org/wiki/Fibonacci_number 
F(n) = F(n-1) + F(n-2) for n >= 1
F(0) = 0, F(1) = 1
*/

/* 
Recursive exponential time
Time Complexity -
  Lower Bound - Ω(1.4^n) 
  Upper Bound - O(2^n)
Space Complexity - O(n). Comes from F(n-1). F(n-2) will be half the depth (or height).
*/
function rFibonacci(n) {
  if (n === 0) return 0
  else if (n === 1) return 1
  else return rFibonacci(n - 1) + rFibonacci(n - 2)
}

/* 
Iterative
Time Complexity - O(n)
Space Complexity - O(1)
*/
function iFibonacci(n) {
  if (n === 0) return 0

  let [prev, curr] = [0, 1]

  for (let i = 1; i < n; i++) {
    ;[prev, curr] = [curr, prev + curr]
  }

  return curr
}

/* 
Recursive Linear Time - Recurse on the base cases and n
Time Complexity - O(n)
Space Complexity - O(n)

Overview: 
Recurse on fib(n, b1, b2) with n decreasing by 1 and [b1, b2] = [b2, b1 + b2]

Eg, for n = 4,
nFib(4,0,1)
  nFib(3,1,1)
    nFib(2,1,2)
      nFib(1,2,3)
        nFib(0,3,5) --> n == 0, return 3
*/
function nFibonacci(n) {
  function recurse(n, b1, b2) {
    if (n === 0) return b1
    else return recurse(n - 1, b2, b1 + b2)
  }

  return recurse(n, 0, 1)
}

// Tests ------------------------------------------
const tests = [
  [0, 0],
  [1, 1],
  [2, 1],
  [4, 3],
  [9, 34],
  [15, 610],
  [30, 832040]
]

console.log('Recursive exponential time tests')
for (const test of tests) {
  console.log(rFibonacci(test[0]) === test[1])
}

console.log('Iterative tests')
for (const test of tests) {
  console.log(iFibonacci(test[0]) === test[1])
}

console.log('Recursive linear time tests')
for (const test of tests) {
  console.log(nFibonacci(test[0]) === test[1])
}
