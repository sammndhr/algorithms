/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function(difficulty, profit, workers) {
  const diffProf = []
  let total = 0,
    maxP = 0,
    i = 0

  difficulty.forEach((diff, j) => {
    diffProf[j] = [diff, profit[j]]
  })

  diffProf.sort((a, b) => a[0] - b[0] || (a[0] == b[0] && a[1] - b[1]))
  workers.sort((a, b) => a - b)

  const diffProfLen = diffProf.length

  for (let work of workers) {
    while (i < diffProfLen && work >= diffProf[i][0]) {
      maxP = Math.max(diffProf[i++][1], maxP)
    }
    total += maxP
  }

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
diffculty = [13, 37, 58]
profit = [4, 90, 96]
worker = [34, 73, 45]
console.log(maxProfitAssignment(diffculty, profit, worker))
