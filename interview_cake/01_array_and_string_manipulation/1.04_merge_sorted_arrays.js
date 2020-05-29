// https://www.interviewcake.com/question/cpp/merge-sorted-arrays?course=fc1&section=array-and-string-manipulation

// Combine the sorted arrays into one large sorted array
// Using pointers
function mergeArrays(myArray, alicesArray) {
  const len1 = myArray.length,
    len2 = alicesArray.length,
    merged = []

  let i = 0,
    j = 0

  while (i < len1 && j < len2) {
    const currI = myArray[i],
      currJ = alicesArray[j]
    if (currI <= currJ) {
      merged.push(currI)
      i++
    } else {
      merged.push(currJ)
      j++
    }
  }

  if (i < len1) merged.push(...myArray.slice(i))
  if (j < len2) merged.push(...alicesArray.slice(j))

  return merged
}

/*
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [[], [1, 2, 3], [1, 2, 3]],
  [[5, 6, 7], [], [5, 6, 7]],
  [
    [2, 4, 7],
    [1, 3, 7],
    [1, 2, 3, 4, 7, 7]
  ],
  [
    [1, 4, 6, 8],
    [1, 7],
    [1, 1, 4, 6, 7, 8]
  ]
]

for (const test of testCases) {
  console.log(
    JSON.stringify(mergeArrays(test[0], test[1])) === JSON.stringify(test[2])
  )
}
