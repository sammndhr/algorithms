/**
 * Definition for knows()
 *
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */

const knows = (a, b) => {
  const matrix = [[1, 1, 1], [1, 1, 0], [0, 0, 1]]
  return matrix[a] ? !!matrix[a][b] : false
}

//my ugly and brute force solution
var solution = function(knows) {
  const knowsHash = {},
    possibleCelebs = {}
  return function(n) {
    for (let i = 0; i < n; i++) {
      knowsHash[i] = []
      possibleCelebs[i] = true
    }
    for (let i = 0; i < n - 1; i++) {
      let j = i + 1
      while (j < n) {
        if (knows(i, j)) {
          delete possibleCelebs[i]
          knowsHash[i].push(j)
        }
        if (knows(j, i)) {
          delete possibleCelebs[j]
          knowsHash[j].push(i)
        }
        j++
      }
    }
    const possibleCeleb = Object.keys(possibleCelebs).length === 1 ? parseFloat(Object.keys(possibleCelebs)[0]) : -1
    if (possibleCeleb === -1) return possibleCeleb
    delete knowsHash[possibleCeleb]
    for (const key in knowsHash) {
      if (!knowsHash[key].includes(possibleCeleb)) return -1
    }
    return Object.keys(possibleCelebs).length === 1 ? parseInt(Object.keys(possibleCelebs)[0]) : -1
  }
}

// https://leetcode.com/problems/find-the-celebrity/discuss/71227/Java-Solution.-Two-Pass
function solution(knows) {
  return function(n) {
    let candidate = 0
    for (let i = 1; i < n; i++) {
      if (knows(candidate, i)) {
        candidate = i
      }
    }
    for (let i = 0; i < n; i++) {
      if (i < candidate && (knows(candidate, i) || !knows(i, candidate))) return -1
      if (i > candidate && !knows(i, candidate)) return -1
    }
    return c
  }
}

console.log(solution(knows)([[1, 1, 1], [1, 1, 0], [0, 0, 1]].length))
