function compareObjects(obj1, obj2) {
  const res = JSON.stringify(obj1) === JSON.stringify(obj2)
  console.log(res)
  return res
}

module.exports = { compareObjects }
