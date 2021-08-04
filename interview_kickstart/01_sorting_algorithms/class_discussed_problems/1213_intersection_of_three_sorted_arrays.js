// https://leetcode.com/problems/intersection-of-three-sorted-arrays/

/*
Intersection of Two Arrays

Time Complexity - O(n) where n is length of shorter array
Space Complexity - O(n) where n is length of shorter array
  - It's possible all elements are unique and in both arrays.
    Eg. arr1 = [1,2,3,4] , arr2 = [1,2,3,4,5], intersection = [1,2,3,4]
*/
var twoArraysIntersection = function (arr1, arr2) {
  const res = [],
    len1 = arr1.length,
    len2 = arr2.length

  let i = 0,
    j = 0

  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) i++
    else if (arr2[j] < arr1[i]) j++
    else {
      // There might be duplicates. So make sure to add number only once.
      const rLen = res.length
      if (res[rLen - 1] !== arr1[i]) res.push(arr1[i])
      i++
      j++
    }
  }

  return res
}

/*
----------------------------------------------------------------------
Intersection of THREE Arrays using twoArraysIntersection 

Time Complexity - O(n) + O(n) where n is length of shorter array
Space Complexity - O(n) where n is length of shorter array

Notes: This one runs 4ms faster than the pointer solution in leetcode
*/
var threeArraysIntersection = function (arr1, arr2, arr3) {
  const twoArrsI = twoArraysIntersection(arr1, arr2)
  const res = twoArraysIntersection(twoArrsI, arr3)

  return res
}

/*
----------------------------------------------------------------------
Intersection of THREE Arrays using three pointers

Time Complexity - O(n) where n is length of shorter array
Space Complexity - O(n) where n is length of shorter array

Notes: Use a nested while loops to keep incrementing pointers
1. After first iteration:
[0,0,1,2]
       i
[1,2,3,4]
   j
[2,3,4,5]
 k
*/
var threeArraysIntersectionPointers = function (arr1, arr2, arr3) {
  const res = [],
    len1 = arr1.length,
    len2 = arr2.length,
    len3 = arr3.length

  let i = 0,
    j = 0,
    k = 0

  while (i < len1 && j < len2 && k < len3) {
    while (i < len1 && arr1[i] < arr2[j]) i++
    while (j < len2 && arr2[j] < arr3[k]) j++
    while (k < len3 && arr3[k] < arr1[i]) k++

    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      const rLen = res.length
      if (res[rLen - 1] !== arr1[i]) res.push(arr1[i])
      i++
      j++
      k++
    }
  }
  return res
}

//  ------------------------------------------------------------------------
// tests
const tests = [
  [
    [2, 3, 3, 5, 5, 6, 7, 8, 12],
    [5, 5, 6, 8, 9, 10, 10],
    [8, 8, 8, 10, 11, 12],
    [8]
  ],
  [
    [8, 8, 8, 10, 11, 12],
    [5, 5, 6, 8, 9, 10, 10],
    [2, 3, 3, 5, 5, 6, 7, 8, 12],
    [8]
  ],
  [
    [0, 0, 0, 1, 2, 2, 3],
    [0, 0, 0, 1, 2, 2, 3],
    [0, 0, 0, 1, 2, 2, 3],
    [0, 1, 2, 3]
  ],
  [
    [0, 0, 0, 1, 2, 2, 3],
    [0, 1, 2, 2, 3, 4, 5],
    [0, 1, 4, 5, 6, 7, 8],
    [0, 1]
  ]
]

console.log('3 array with recycled 2 array')
for (const test of tests) {
  const intersection = threeArraysIntersection(test[0], test[1], test[2])
  console.log(intersection)
  console.log(JSON.stringify(intersection) === JSON.stringify(test[3]))
}

console.log('3 array with 3 pointers')
for (const test of tests) {
  const intersection = threeArraysIntersectionPointers(
    test[0],
    test[1],
    test[2]
  )
  console.log(intersection)
  console.log(JSON.stringify(intersection) === JSON.stringify(test[3]))
}
