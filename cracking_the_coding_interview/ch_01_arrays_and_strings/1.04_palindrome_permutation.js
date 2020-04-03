function palindromPermutation(str) {
  const string = str.toLowerCase(),
    mapChars = {}

  let oddCharCount = 0,
    totalCharCount = 0

  for (const char of string) {
    //check only lowercase letters (a-z)
    if (char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123) {
      totalCharCount++
      mapChars[char] = !mapChars[char] ? 1 : mapChars[char] + 1
    }
  }

  for (const char in mapChars) {
    const count = mapChars[char]
    if (count % 2 !== 0) oddCharCount++
    if (oddCharCount > 1) return false
  }

  //Allow one odd char only for strings with character count odd
  if (totalCharCount % 2 === 0 && oddCharCount > 0) return false

  return true
}

/*
n = length of string
Space Complexity: O(n)
Time Complexity: O(n)
*/

//Tests

const testCases = [
  ['string', false],
  ['strts', true],
  ['sssstssss', true],
  ['settss', false],
  ['Tact Coa', true],
  ['Tact boa', false]
]

for (const test of testCases) {
  console.log(palindromPermutation(test[0]) === test[1], test)
}
