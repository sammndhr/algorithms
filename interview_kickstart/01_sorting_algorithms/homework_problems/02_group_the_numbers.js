// Given array of numbers, group them so that all evens are in left side and all odds are in right side

/* 
First Intuition: Use two pointers to partition the array like in quicksort

Time Complexity - O(n)
Space Complexity - O(1)
*/

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function isEven(num) {
  return num % 2 === 0
}

function groupTheNumbers(array) {
  const len = array.length

  let evenPointer = -1,
    curr = 0

  for (curr; curr < len; curr++) {
    const element = array[curr]

    if (isEven(element)) {
      evenPointer++
      swap(array, evenPointer, curr)
    }
  }

  return array
}

console.log(groupTheNumbers([1, 2, 3, 5, -1, 0, 7, 8]))
console.log(groupTheNumbers([1, 2, 3, 4]))
