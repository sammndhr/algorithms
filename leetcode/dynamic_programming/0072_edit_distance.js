var minDistance = function (word1, word2) {
  const m = word1.length + 1,
    n = word2.length + 1,
    dp = []

  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n)
    dp[i][0] = i
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  console.log(dp)

  return dp[m - 1][n - 1]
}

console.log(minDistance('horse', 'ors'))
console.log(minDistance('fun', 'sun'))
