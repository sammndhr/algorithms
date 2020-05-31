// https://www.interviewcake.com/question/javascript/stock-price?course=fc1&section=greedy

// Calculate the max profit

//Brute force
function getMaxProfit(stockPrices) {
  if (stockPrices.length < 2) throw 'You gotta sell to gain tendiez.'
  const len = stockPrices.length
  // Starting at 0 doesn't tell you if you've become a bear
  let maxTendies = -Infinity

  // Iterate over each stockPrice and
  // check against every stock price that comes after it (second loop)
  for (let i = 0; i < len; i++) {
    const earlier = stockPrices[i]

    for (let j = i + 1; j < len; j++) {
      const later = stockPrices[j],
        possibleTendies = later - earlier

      maxTendies = Math.max(maxTendies, possibleTendies)
    }
  }

  return maxTendies
}

/*
Time Complexity - O(n^2)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

// Greedy
function getMaxProfitGreedy(stockPrices) {
  if (stockPrices.length < 2) throw 'You gotta sell to gain tendiez.'
  const len = stockPrices.length
  /*  max can't be -Infinity because we're starting at i = 1 instead of 0,
   So in order to make sure we check if the first two prices could yeild the best result,
   set max to stockPrices[1] - stockPrices[0] */
  let maxTendies = stockPrices[1] - stockPrices[0],
    minPrice = stockPrices[0]

  for (let i = 1; i < len; i++) {
    const curr = stockPrices[i],
      possibleTendies = curr - minPrice

    minPrice = Math.min(minPrice, curr)
    maxTendies = Math.max(maxTendies, possibleTendies)
  }

  return maxTendies
}

/*
Time Complexity - O(n)
Space complexity - O(1)
*/

const testCases = [
  [[10, 7, 5, 8, 11, 9], 6],
  [[9, 7, 4, 1], -2],
  [[1, 5, 3, 2], 4],
  [[1, 1, 1, 1], 0]
]

console.log('BRUTE FORCE')
for (const test of testCases) {
  const res = getMaxProfit(test[0])
  console.log(res === test[1])
}

console.log('GREEDY')
for (const test of testCases) {
  const res = getMaxProfitGreedy(test[0])
  console.log(res === test[1])
}
