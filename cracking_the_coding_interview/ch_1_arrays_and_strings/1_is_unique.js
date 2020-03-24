function isUnique(string) {
  if (string.length > 128) return false //Assuming 128 ASCII

  const mapChars = {}
  for (const char of string) {
    const mappedChar = mapChars[char]
    if (mappedChar) {
      return false
    }
    mapChars[char] = true
  }
  return true
}

/* 
n = string.length
Space complexity - O(c) where c is 128
Time complexity - O(n)

You could express the complexity as O(c) space and O(min(c, n)) or O(c) time, where c is the size of the character set. 
*/

/* ---------------------------------------------------------------------------- */

function isUniqueConstantSpace(string) {
  const len = string.length
  if (len > 128) return false
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (string[i] === string[j]) return false
    }
  }

  return true
}

/* 
Space complexity - O(1). Constants only (i, j, len)

Time complexity - O(n!) or O(min(c, n!)). I think n^2 isn't corrent. Because you're only checking n - i chars for each char. i.e. (n - 1) + (n - 2) + ... + 1
*/

//tests
const wordsToCheck = [
  ['string', true],
  ['testo', false],
  ['hello', false],
  ['apple', false],
  ['uniq', true]
]

for (const wordArr of wordsToCheck) {
  const word = wordArr[0]
  console.log(
    word,
    isUnique(word) === wordArr[1],
    isUniqueConstantSpace(word) === wordArr[1]
  )
}
