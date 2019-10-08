/* Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
Example 2:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0. */

/**
 * @param {number[]} prices
 * @return {number}
 */

//Time - O(n), Space = O(1)
var maxProfit = function(prices) {
  const len = prices.length
  let buyingPrice = 0,
    sellingPrice = 0,
    maxProfit = 0

  for (let i = 0; i < len; i++) {
    const stockPrice = prices[i]
    if (i === 0 || buyingPrice > stockPrice) {
      buyingPrice = stockPrice
      sellingPrice = 0
      continue
    }
    if (stockPrice > sellingPrice) sellingPrice = stockPrice

    maxProfit = Math.max(maxProfit, sellingPrice - buyingPrice)
  }
  return maxProfit
}

//Time - O(n2), Space = O(1) (from solutions)
//In formal terms, we need to find max(prices[j] - prices[i]) for every i and j such that j > i
var maxProfit = function(prices) {
  const len = prices.length
  let maxProfit = 0
  for (let i = 0; i < len; i++) {
    const buyingPrice = prices[i]
    for (let j = i + 1; j < len; j++) {
      const sellingPrice = prices[j]
      const profit = sellingPrice - buyingPrice
      maxProfit = Math.max(profit, maxProfit)
    }
  }
  return maxProfit
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])) //5
console.log(maxProfit([7, 6, 4, 3, 1])) //0
console.log(maxProfit([2, 4, 1])) //2
console.log(maxProfit([3, 2, 6, 5, 0, 3])) //4
