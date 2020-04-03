/* 
 Two words are permutations of each other if they both contain the same number of the same characters. E.g. 'apple' and 'pepla'
*/

function checkPermutation(string1, string2) {
  if (string1.length !== string2.length) return false

  const mapChars = {}

  for (const char of string1) {
    mapChars[char] = !mapChars[char] ? 1 : mapChars[char] + 1
  }

  for (const char of string2) {
    if (!mapChars[char]) return false
    mapChars[char]--
    if (mapChars[char] < 0) return false
  }

  return true
}

/*
Time Complexity - O(n)
Space complexity - O(n)
*/

/* ---------------------------------------------------------------------------- */

function checkPermutationWithSort(string1, string2) {
  if (string1.length !== string2.length) return false
  const sortedString1 = string1
    .split('')
    .sort()
    .join('')
  const sortedString2 = string2
    .split('')
    .sort()
    .join('')

  return sortedString1 === sortedString2
}

/*
Time Complexity - O(nlogn). Time Complexity of the sort
Space complexity - O(n). String.split('') will take up O(2n) space
*/
/* ---------------------------------------------------------------------------- */

// tests
const pairs = [
  ['apple', 'papel', true],
  ['carrot', 'tarroc', true],
  ['hello', 'llloh', false],
  ['abc', 'aa', false],
  ['isla', 'mond', false]
]

for (const pair of pairs) {
  console.log(checkPermutation(pair[0], pair[1]) === pair[2])
}
