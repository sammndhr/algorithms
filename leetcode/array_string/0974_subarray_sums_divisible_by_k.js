/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

//iterative O(n^2) runtime. Won't pass leetcode 'Status: Time Limit Exceeded'
var subarraysDivByK = function(A, K) {
  let count = 0
  const sum = []
  A.forEach(curr => {
    sum.push(0)
    sum.forEach((elem, j) => {
      sum[j] = curr + elem
      if (sum[j] % K === 0 || sum[j] % K === -0) {
        count++
      }
    })
  })

  return count
}

//https://leetcode.com/problems/subarray-sums-divisible-by-k/discuss/217980/Java-O(N)-with-HashMap-and-prefix-Sum
var subarraysDivByK = function(A, K) {
  const map = { 0: 1 }
  let count = 0,
    sum = 0

  A.forEach((elem, i) => {
    sum = (elem + sum) % K
    sum = sum < 0 ? sum + K : sum
    if (map[sum]) {
      val = map[sum]
      count += val
      map[sum]++
    } else {
      map[sum] = 1
    }
  })
  console.log(map)
  return count
}

// 450015000
arr = new Array(30000).fill(0)
// console.log(arr.length)
console.log(subarraysDivByK([-14, 5, 0, -10, -2, -3, 1], 5))
// console.log(subarraysDivByK([], 5))
// console.log(subarraysDivByK([-1, 2, 9], 2))

// console.log(subarraysDivByK(arr, 1000))
arr = [2, -2, 2, -4]

// console.log(subarraysDivByK(arr, 6))
