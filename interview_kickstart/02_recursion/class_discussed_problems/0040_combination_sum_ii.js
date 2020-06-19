// https://leetcode.com/problems/combination-sum-ii/
// Similar to subsets II problem
function combinationSum2(candidates, target) {
  const result = []
  candidates = candidates.sort((a, b) => a - b)

  function cHelper(i, slate, sum) {
    // Backtracking case with sum == target
    if (sum === target) {
      result.push(slate.slice(0))
      return
    }
    // Backtracking case + base case
    if (sum > target || i === candidates.length) return

    let count = 1,
      j = i + 1
    while (j < candidates.length && candidates[j] === candidates[i]) {
      count++
      j++
    }

    for (let copies = 0; copies < count + 1; copies++) {
      for (let op = 0; op < copies; op++) {
        slate.push(candidates[i])
        sum += candidates[i]
      }

      cHelper(count + i, slate, sum)

      for (let op = 0; op < copies; op++) {
        slate.pop()
        sum -= candidates[i]
      }
    }
  }

  cHelper(0, [], 0)
  return result
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
