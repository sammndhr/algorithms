/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function(difficulty, profit, workers) {
  const diffProfHash = {}
  let total = 0,
    d = 0
  difficulty.forEach((diff, i) => {
    diffProfHash[diff] = profit[i]
  })
  difficulty.sort((a, b) => {
    return a - b
  })
  workers.sort((a, b) => {
    return a - b
  })
  workers.forEach((worker, i) => {
    while (difficulty[d] <= worker) {
      d++
    }

    console.log(total, difficulty[d], d, diffProfHash[difficulty[d]])
    total += d < 0 ? 0 : diffProfHash[difficulty[d]]
  })

  return total
}

let diffculty = [8, 4, 6, 10, 2],
  profit = [40, 20, 30, 50, 10],
  worker = [4, 5, 6, 7]

diffculty = [85, 47, 57]
profit = [24, 66, 99]
worker = [40, 25, 25]

diffculty = [13, 37, 58]
profit = [4, 90, 96]
worker = [34, 45, 73]
console.log(maxProfitAssignment(diffculty, profit, worker))
