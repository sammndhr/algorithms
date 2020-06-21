function find_all_well_formed_brackets(n) {
  const result = [],
    total = n * 2

  function pHelper(slate, open, i) {
    if (open === 0 && i === total) {
      result.push(slate)
      return
    }

    // If open brackets > n or there's a close bracket before open (open < 0) or we've reached the end
    if (open < 0 || open > n || i === total) return
    pHelper(slate + '(', open + 1, i + 1)
    pHelper(slate + ')', open - 1, i + 1)
  }

  pHelper('', 0, 0)
  return result
}

function find_all_well_formed_brackets(n) {
  const result = [],
    total = n * 2

  function pHelper(slate, open, i) {
    if (open === 0 && i === total) {
      result.push(slate.join(''))
      return
    }

    if (open < 0 || open > n || i === total) return

    slate.push('(')
    pHelper(slate, open + 1, i + 1)
    slate.pop()
    slate.push(')')
    pHelper(slate, open - 1, i + 1)
    slate.pop()
  }

  pHelper([], 0, 0)
  return result
}

console.log(find_all_well_formed_brackets(3))

console.log(find_all_well_formed_brackets(3))
