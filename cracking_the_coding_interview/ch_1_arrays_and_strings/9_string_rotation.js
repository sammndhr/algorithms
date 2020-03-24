function stringRotation(str1, str2) {
  const len = str1.length

  if (len === str2.length && len > 0) {
    const s1s1 = str1 + str1
    return isSubstring(s1s1, str2)
  }
}

function isSubstring(str1, str2) {
  const first =
      str1.length > str2.length ? str1.toLowerCase() : str2.toLowerCase(),
    second = str1.length > str2.length ? str2.toLowerCase() : str1.toLowerCase()

  return first.includes(second)
}
/*
n = length of string1 (and string2)
Time Complexity - O(n). Runtime of includes() in isSubstring is O(n)
Space complexity - O(n). s1s1 is 2 x n
*/

// Tests
const testCases = [
  ['waterbottle', 'erbottlewat', true],
  ['waterbottle', 'esbottlewat', false],
  ['fortyfive', 'fiveForty', true]
]

for (const test of testCases) {
  console.log(stringRotation(test[0], test[1]) === test[2])
}
