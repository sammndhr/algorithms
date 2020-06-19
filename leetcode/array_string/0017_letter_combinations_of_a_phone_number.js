/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let results = []
  const phone = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z']
    },
    recurse = (digits, comb) => {
      if (!digits.length) results.push(comb)
      else {
        const digit = digits[0]
        if (!phone[digit]) return //when digit is 1, 0 & other invalid entries, forEach will never be called which means recurse will never get called again and the combination so far will never reach the end or get pushed to the results array. So the returned results array is empty
        phone[digit].forEach(letter => {
          recurse(digits.slice(1), comb + letter)
        })
      }
    }
  if (digits) recurse(digits, '')
  return results
}

//Converted to javascript - iterative solution https://leetcode.com/problems/letter-combinations-of-a-phone-number/discuss/8064/My-java-solution-with-FIFO-queue
var letterCombinations = function(digits) {
  let results = ['']
  if (!digits) return []
  const phone = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z']
    },
    len = digits.length
  for (let i = 0; i < len; i++) {
    const currDig = digits[i]

    while (results[0].length === i) {
      const comb = results.shift()

      if (!phone[currDig]) return []
      const currDigLen = phone[currDig].length

      for (let j = 0; j < currDigLen; j++) {
        results.push(comb + phone[currDig][j])
      }
    }
  }
  return results
}

//Second attempt with two loops - Converted to javascript - iterative solution https://leetcode.com/problems/letter-combinations-of-a-phone-number/discuss/8064/My-java-solution-with-FIFO-queue
var letterCombinations = function(digits) {
  let results = ['']
  if (!digits) return []
  const phone = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z']
    },
    len = digits.length

  while (results[0].length !== len) {
    const comb = results.shift()
    const currDigArr = phone[digits.charAt(comb.length)]

    if (!currDigArr) return []
    const currDigLen = currDigArr.length

    for (let j = 0; j < currDigLen; j++) {
      results.push(comb + currDigArr[j])
    }
  }
  return results
}
const inputs = ['1', '12', '123', '3412', '0312', '', '203', '0', '23']

inputs.forEach(input => {
  console.log(input, '--', letterCombinations(input))
})
