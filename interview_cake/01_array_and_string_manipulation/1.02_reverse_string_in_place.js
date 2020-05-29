// https://www.interviewcake.com/question/javascript/reverse-string-in-place?course=fc1&section=array-and-string-manipulation

const { swapArrInPlace } = require('../../utils')
// Reverse the input array of characters in place
function reverse(arrayOfChars) {
  let i = 0,
    j = arrayOfChars.length - 1
  while (i < j) {
    swapArrInPlace(arrayOfChars, i, j)
    i++
    j--
  }
}

/*
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  ['abcd', 'dcba'],
  ['', ''],
  ['a', 'a'],
  ['AndD', 'DdnA']
]

for (const test of testCases) {
  const arr = test[0].split('')
  reverse(arr)
  console.log(arr.join('') === test[1])
}
