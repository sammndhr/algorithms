// https://www.interviewcake.com/question/javascript/shuffle?course=fc1&section=greedy

/* 
First Intuition for a 'uniform' shuffle: It's same as getting random ball from a bag.
You "pick" a random item form array and set it aside (into a new array). 
Keep doing this until there are no more items in the array. 

https://www.mathsisfun.com/data/probability-events-conditional.html
*/
const { swapArrItemsInPlace } = require('./../../utils')

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor
}

// Shuffle the input in place
function shuffle(array) {
  const len = array.length

  if (len <= 1) return

  for (let i = 0; i < len - 1; i++) {
    const randomIndex = getRandom(i, len - 1)

    if (i !== randomIndex) swapArrItemsInPlace(array, i, randomIndex)
  }
}

/*
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [[1, 2, 3, 4, 5], [], [7]]

for (const test of testCases) {
  shuffle(test)
  console.log(test)
}
