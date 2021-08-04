function compareObjects(obj1, obj2) {
  const res = JSON.stringify(obj1) === JSON.stringify(obj2)

  return res
}

function getRandomInt(min = 0, max = 100) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function swapArrItemsInPlace(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

module.exports = {
  compareObjects,
  getRandomInt,
  getRandomIntInclusive,
  swapArrItemsInPlace
}
