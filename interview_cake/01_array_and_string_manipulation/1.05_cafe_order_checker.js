// https://www.interviewcake.com/question/javascript/cafe-order-checker?course=fc1&section=array-and-string-manipulation

// Check if we're serving orders first-come, first-served

// recursive solution
function isFirstComeFirstServed(takeOut, dineIn, served) {
  if (served.length === 0) return true

  if (takeOut.length && takeOut[0] === served[0]) {
    return isFirstComeFirstServed(takeOut.slice(1), dineIn, served.slice(1))
  }

  if (dineIn.length && dineIn[0] === served[0]) {
    return isFirstComeFirstServed(takeOut, dineIn.slice(1), served.slice(1))
  }
  return false
}

/*
Time Complexity - O(n^2)
Space complexity - O(n^2)
*/

/* ---------------------------------------------------------------------------- */

// Using pointers
function isFirstComeFirstServedIterative(takeOut, dineIn, served) {
  const takeOutLen = takeOut.length,
    dineInLen = dineIn.length

  let t = 0,
    d = 0

  for (const order of served) {
    // increment takeOut index if order matches take out order
    if (t < takeOutLen && order === takeOut[t]) t++
    // increment dineIn index if order matches dine in order
    else if (d < dineInLen && order === dineIn[d]) d++
    // if neither one matches, the order cut in line OR the order doesn't exist, so return false
    else return false
  }
  /*  check if total no. of take out and dine in orders matches the number of served orders.
	 If either t or d don't match the total no of take our or dine in order respectively,
	 that order was never served. Someone din't get cake. So sad :( */
  if (t !== takeOutLen || d !== dineInLen) return false

  return true
}

/*
Time Complexity - O(n)
Space complexity - O(1)
*/

/* ---------------------------------------------------------------------------- */

const testCases = [
  [[1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6], true],
  [[1, 5], [2, 3, 6], [1, 2, 6, 3, 5], false],
  [[], [2, 3, 6], [2, 3, 6], true],
  [[1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8], false],
  [[27, 12, 18], [55, 31, 8], [55, 31, 8, 27, 12, 18], true]
]

console.log('Recursive')
for (const test of testCases) {
  console.log(isFirstComeFirstServed(test[0], test[1], test[2]) === test[3])
}

console.log('Iterative')
for (const test of testCases) {
  console.log(
    isFirstComeFirstServedIterative(test[0], test[1], test[2]) === test[3]
  )
}
