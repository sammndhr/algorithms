function isPalindrome(s) {
  let i = 0,
    j = s.length - 1
  while (i < j) {
    if (s[i++] !== s[j--]) return false
  }
  return true
}

var partition = function (s) {
  const results = [],
    len = s.length
  function pHelper(i, slate) {
    console.log(i, slate)
    if (slate.length > 0 && !isPalindrome(slate[slate.length - 1])) {
      console.log('o-o-o-o-o-o-o-o-o')
      return
    }

    if (i === len) {
      console.log('x-x-x-x-x-x-x-x')
      results.push(slate.slice(0))
      return
    }
    console.log('------')
    for (let pick = i; pick < len; pick++) {
      console.log('i', i, pick, slate)
      slate.push(s.slice(i, pick + 1))

      pHelper(pick + 1, slate)
      slate.pop()
    }
  }
  pHelper(0, [])
  return results
}

console.log(partition('abcbd'))
// console.log(partition(''))
