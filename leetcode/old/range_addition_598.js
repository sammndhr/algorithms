
/*
Given an m * n matrix M initialized with all 0's and several update operations.

Operations are represented by a 2D array, and each operation is represented by an array with two positive integers a and b, which means M[i][j] should be added by one for all 0 <= i < a and 0 <= j < b.

You need to count and return the number of maximum integers in the matrix after performing all the operations.
*/

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */

//Brute force method, will run out of memory
// var maxCount = function(m, n, ops) {
//   var M = [];
//   var maxIntArr = [];
//   var maxSoFar;
//   for (let i = 0; i < m; i++) {
//     var innerArr = [];
//     for (let j = 0; j < n; j++) {
//       var elem = 0;
//       for (let x = 0; x < ops.length; x++) {
//         if (i < ops[x][0] && j < ops[x][1]) {
//           elem++;
//         }
//       }
//       if (i === 0 && j === 0) {
//         maxSoFar = elem;
//         maxIntArr.push(maxSoFar);
//       } else if (elem >= maxSoFar) {
//         maxSoFar = elem;
//         maxIntArr.push(maxSoFar);
//       }
//       innerArr.push(elem);
//       if (j === n-1) {
//         M.push(innerArr);
//       }
//     }
//   }
//   return maxIntArr.length;
// };

var maxCount = function(m, n, ops) {
  var maxA, maxB;
  if (ops.length === 0) {
  return m * n;
  }
  for (let i = 0; i < ops.length; i++) {
    if (i===0) {
      maxA = ops[i][0];
      maxB = ops[i][1];
    }
    if (ops[i][0] < maxA) {
      maxA = ops[i][0];
    }
    if (ops[i][1] < maxB) {
      maxB = ops[i][1];
    }

  }
  return maxA * maxB;
};
// console.log(maxCount(40000,40000, []));
console.log(maxCount(5,5, [[4,2], [1,5]]));
console.log(maxCount(3,3, [[2,2], [3,3]]));







