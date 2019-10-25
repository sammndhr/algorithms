/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minDominoRotations = function(A, B) {
  const len = A.length,
    check = (val, A, B) => {
      let rotationsA = 0,
        rotationsB = 0

      for (let i = 0; i < len; i++) {
        const a = A[i],
          b = B[i]
        if (a !== val && b !== val) return -1
        if (a !== val) rotationsA++
        else if (b !== val) rotationsB++
      }
      return Math.min(rotationsA, rotationsB)
    }

  const rotations1 = check(A[0], B, A)
  if (rotations1 !== -1 || A[0] === B[0]) return rotations1
  const rotations2 = check(B[0], A, B)
  return rotations2
}

const A = [2, 1, 2, 4, 2, 2],
  B = [5, 2, 6, 2, 3, 2]

const A1 = [3, 5, 1, 2, 3],
  B1 = [3, 6, 3, 3, 4]
console.log(minDominoRotations(A, B))
console.log(minDominoRotations(A1, B1))
