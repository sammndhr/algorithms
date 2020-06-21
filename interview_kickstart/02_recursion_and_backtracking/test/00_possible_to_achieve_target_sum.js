function check_if_sum_possible(arr, k) {
  function helper(i, slate, sum) {
    if (k > 0 && sum > k) return false
    if (sum === k && slate.length > 0) return true
    if (i === arr.length) return false

    for (let pick = i; pick < arr.length; pick++) {
      if (helper(pick + 1, slate, sum)) return true

      slate.push(arr[pick])
      if (helper(pick + 1, slate, sum + arr[pick])) return true
      slate.pop()
    }

    return false
  }

  return helper(0, [], 0)
}

console.log(check_if_sum_possible([2, 4, 8], 6))
console.log('---------')
console.log(check_if_sum_possible([2, 4, 6], 5))
console.log(check_if_sum_possible([2, 4, 6], 11))
console.log(check_if_sum_possible([1, 1], 0))
console.log(check_if_sum_possible([2, -5, -10], -15))

console.log(check_if_sum_possible([3, -2, -3, 1], -4))
