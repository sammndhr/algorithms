function oneEditReplace(str1, str2, len) {
  let foundDifference = false
  for (let i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) {
      if (foundDifference) return false
      foundDifference = true
    }
  }
  return true
}

//Mine. Inserting letter and checking if the rest of the string matches up. Space complexity is O(n) (need copy of string1 if we don't want to mutate the input)
function oneEditInsert(str1, str2, len1) {
  let inserted = false,
    string1 = str1.slice()

  for (let i = 0; i < len1; i++) {
    if (string1[i] !== str2[i]) {
      if (inserted) return false
      inserted = true
      string1 = str1.slice(0, i) + str2[i] + str1.slice(i)
    }
  }
  return true
}

// Referenced book. Using pointers
function oneEditInsert(str1, str2, len1) {
  let i = 0,
    j = 0

  while (i < len1 && j < len1 + 1) {
    if (str1[i] !== str2[j]) {
      if (i !== j) return false
      j++
    } else {
      i++
      j++
    }
  }
  return true
}

function oneAway(str1, str2) {
  const len1 = str1.length,
    len2 = str2.length
  if (len1 === len2) {
    return oneEditReplace(str1, str2, len1)
  }
  if (len1 + 1 === len2) {
    return oneEditInsert(str1, str2, len2)
  }
  if (len1 - 1 === len2) {
    return oneEditInsert(str2, str1, len1)
  }

  return false
}

/* ---------------------------------------------------------------------------- */

//Solution 2. Compact version.

function oneEditAway(first, second) {
  const firstLen = first.length,
    secondLen = second.length
  if (Math.abs(firstLen - secondLen) > 1) return false

  const s1 = firstLen < secondLen ? first : second,
    s2 = firstLen < secondLen ? second : first,
    s1Len = s1.length,
    s2Len = s2.length

  let i = 0,
    j = 0,
    foundDifference = false

  while (i < s1Len && j < s2Len) {
    if (s1[i] !== s2[j]) {
      if (foundDifference) return false

      foundDifference = true
      // Replacing, so increment i
      if (s1Len === s2Len) i++
    } else i++ // increment i if characters match
    j++ // Always increment for second (longer) string
  }

  return true
}

/* 
n = length of shorter string
Space Complexity: O(1). My oneEditInsert is O(n)
Time Complexity: O(n)
*/

const testCases = [
  ['pale', 'ple', true],
  ['pales', 'pale', true],
  ['pale', 'bale', true],
  ['pale', 'bake', false],
  ['pal', 'palz', true],
  ['palz', 'pal', true],
  ['pales', 'palez', true],
  ['pal', 'pelz', false],
  ['pal', 'qalzz', false]
]

for (const test of testCases) {
  console.log(oneAway(test[0], test[1]) === test[2], test, 'oneAway')
  console.log(oneEditAway(test[0], test[1]) === test[2], test, 'oneEditAway')
}
