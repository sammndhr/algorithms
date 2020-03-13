/**
 * @param {number} n
 * @return {number}
 */

// Iterative
//  Time Complexity => 2^n (2^0 + 2^1 + 2^2 + ...+ 2^m = 2^(m+1) -1 where m is n-1)
var climbStairsIterative = function(n) {
  if (n == 0) return 0
  let i = 0
  const recurse = i => {
    if (i > n) return 0
    if (i === n) return 1
    return recurse(i + 1) + recurse(i + 2)
  }
  return recurse(i)
}

// memoize
var climbStairsMemoize = function(n) {
  if (n == 0) return 0
  let i = 0
  const memoize = {}
  const recurse = i => {
    if (i > n) return 0
    if (i === n) return 1
    if (!memoize[i]) memoize[i] = recurse(i + 1) + recurse(i + 2)
    return memoize[i]
  }
  return recurse(i)
}

// DP
var climbStairs = function(n) {
  if (n == 0) return 0
  const dp = [0, 1, 2]
  for (let i = 3; i <= n; i++) {
    dp.push(dp[i - 1] + dp[i - 2])
  }
  return dp[n]
}

console.log(climbStairsDP(5))
console.log(climbStairsDP(4))
console.log(climbStairsIterative(5))
console.log(climbStairsIterative(4))
