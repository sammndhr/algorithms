var minimumDeleteSum = function (s1, s2) {
  const dp = [[]],
    m = s1.length + 1,
    n = s2.length + 1

  dp[0][0] = 0

  for (let i = 1; i < m; i++) {
    dp[i] = new Array(n)
    dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1)
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1)
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + s1.charCodeAt(i - 1),
          dp[i][j - 1] + s2.charCodeAt(j - 1)
        )
      }
    }
  }
  console.log(dp)
  return dp[m - 1][n - 1]
}

console.log(minimumDeleteSum('cat', 'at'))
