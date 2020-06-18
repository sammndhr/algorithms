// with string concatenation
function generate_all_subsets(s) {
  const result = [],
    len = s.length

  function subsetHelper(slate, i) {
    if (i === len) result.push(slate)
    else {
      // exclude
      subsetHelper(slate, i + 1)
      // include
      subsetHelper(slate + s[i], i + 1)
    }
  }

  subsetHelper('', 0)
  return result
}

// using array, passing copy
function generate_all_subsets(s) {
  const result = [],
    len = s.length

  function subsetHelper(slate, i) {
    console.log(slate)
    if (i === len) result.push(slate.join(''))
    else {
      // exclude
      subsetHelper(slate, i + 1)
      // include
      subsetHelper([...slate, s[i]], i + 1)
    }
  }

  subsetHelper([], 0)
  return result
}

// using array, pass by reference
function generate_all_subsets(s) {
  const result = [],
    len = s.length

  function subsetHelper(slate, i) {
    if (i === len) result.push(slate.join(''))
    else {
      // exclude
      subsetHelper(slate, i + 1)
      // include
      slate.push(s[i])
      subsetHelper(slate, i + 1)
      slate.pop()
    }
  }

  subsetHelper([], 0)

  return result
}

//Tests
console.log(generate_all_subsets('str'))
