// https://www.interviewcake.com/question/javascript/top-scores?course=fc1&section=hashing-and-hash-tables

// Sort the scores in O(n) time
function sortScores(unorderedScores, highestPossibleScore) {
  // Use a hash to keep track of the number of scores
  const counts = {},
    sorted = []

  // Iterate over the unorderedScores and map the number of times it occurs to counts
  for (const score of unorderedScores) {
    counts[score] = counts[score] ? counts[score] + 1 : 1
  }

  // Starting from the highestPossibleScore, iterate over all the possible scores in reverse
  for (let score = highestPossibleScore; score >= 0; score--) {
    const count = counts[score]

    // Loop over the total count and push all occurrences of the score into sorted.
    // 0 < undefined equals false so only occurring scores are pushed
    let i = 0
    while (i < count) {
      sorted.push(score)
      i++
    }
  }

  return sorted
}

/*
n = total number of possible scores. highestPossibleScore - 0
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [[30, 60], 100, [60, 30]],
  [[37, 89, 41, 65, 91, 53], 100, [91, 89, 65, 53, 41, 37]],
  [[20, 10, 30, 30, 10, 20], 100, [30, 30, 20, 20, 10, 10]]
]

for (const test of testCases) {
  const sorted = JSON.stringify(sortScores(test[0], test[1]))
  console.log(sorted === JSON.stringify(test[2]))
}
