var subsetsWithDup = function (nums) {
  const result = [],
    len = nums.length
  nums = nums.sort((a, b) => a - b)

  function subsetHelper(i, slate) {
    if (len === i) {
      result.push(slate.slice(0))
      return
    }

    let count = 1,
      j = i + 1

    while (j < len && nums[j] === nums[i]) {
      count++
      j++
    }

    for (let copies = 0; copies < count + 1; copies++) {
      for (let op = 0; op < copies; op++) {
        slate.push(nums[i])
      }

      subsetHelper(count + i, slate)

      for (let op = 0; op < copies; op++) {
        slate.pop()
      }
    }
  }

  subsetHelper(0, [])
  return result
}

// Tests
console.log(subsetsWithDup([1, 2, 3]))
console.log(subsetsWithDup([1, 2, 2, 2]))
