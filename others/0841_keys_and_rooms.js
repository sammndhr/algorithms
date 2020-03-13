/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  const seen = {},
    stack = [],
    roomsLen = rooms.length
  seen[0] = true
  stack.push(0)
  while (stack.length) {
    const curr = stack.pop()
    for (const key of rooms[curr]) {
      if (!seen[key]) {
        seen[key] = true
        stack.push(key)
      }
    }
  }

  for (let i = 1; i < roomsLen; i++) {
    const roomKeyNum = seen[i]
    if (!roomKeyNum && i !== 0) return false
  }
  return true
}

//test
console.log(canVisitAllRooms([[1], [2], [3], []]))
console.log(canVisitAllRooms([[2], [], [1]]))
console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]))
