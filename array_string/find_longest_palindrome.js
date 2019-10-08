const isPalindrome = string => {
  const str = string.toLowerCase(),
    len = str.length
  if (len < 2) {
    return false
  }
  let i = 0,
    j = len - 1
  while (i < j) {
    if (str[i] !== str[j - i]) {
      return false
    }
    i++
  }
  return true
}

const findLongestPalindrome = string => {
  const len = string.length
  let longestCount = 0,
    longestPalindromes = []
  for (let i = 0; i < len; i++) {
    let temp = string[i]
    for (let j = i + 1; j < len; j++) {
      temp += string[j]
      tempLen = temp.length
      if (isPalindrome(temp) && tempLen >= longestCount) {
        if (tempLen > longestCount) {
          longestPalindromes = []
        }
        longestPalindromes.push(temp)
        longestCount = tempLen
      }
    }
  }
  return longestPalindromes
}

console.log(findLongestPalindrome('QXXQIItoot'))
console.log(findLongestPalindrome('BOOBooLOLo'))
