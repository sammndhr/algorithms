// https://www.interviewcake.com/question/javascript/permutation-palindrome?course=fc1&section=hashing-and-hash-tables

// Same as https://github.com/mrinalini-m/algorithms/blob/master/cracking_the_coding_interview/ch_01_arrays_and_strings/1.04_palindrome_permutation.js
// Doing this one using sets
// Check if any permutation of the input is a palindrome
function hasPalindromePermutation(str) {
  // Keep track of all the unpaired characters
  const unpairedChars = new Set()

  for (let char of str) {
    // If char exists, delete it cause it's paired,
    // otherwise add it to unpairedChars
    if (unpairedChars.has(char)) {
      unpairedChars.delete(char)
    } else {
      unpairedChars.add(char)
    }
  }
  // If there is more than one unpaired character, it is not a palindrome permutation
  return unpairedChars.size <= 1
}

/*
n = length of string
Space Complexity: O(k) where k is a constant. It is the total number of allowed characters. ASCII 128, Unicode 110,000.
Time Complexity: O(n)
*/

/* ---------------------------------------------------------------------------- */

const testStr = 'aabcbcd'
console.log(hasPalindromePermutation(testStr))
