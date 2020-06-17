var letterCasePermutation = function (str) {
  const result = []
  function helper(str, i, slate) {
    if (i === str.length) {
      result.push(slate.join(''))
      return
    } else {
      if (!isNaN(str[i])) {
        slate.push(str[i])
        helper(str, i + 1, slate)
        slate.pop()
      } else {
        slate.push(str[i].toLowerCase())
        helper(str, i + 1, slate)
        slate.pop()

        slate.push(str[i].toUpperCase())
        helper(str, i + 1, slate)
        slate.pop()
      }
    }
  }

  helper(str, 0, [])
  return result
}
