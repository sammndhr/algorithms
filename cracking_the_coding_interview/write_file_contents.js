const writeFileContents = functionName => {
  const fileContents = `function ${functionName}(str) {

}

/*
n = length of
Time Complexity - O(n)
Space complexity - O(n)
*/

// test cases
const testCases = [['test', true]]

for (const test of testCases) {
  console.log(${functionName}(test[0]) === test[1])
}
  `
  return fileContents
}

const functionName = process.argv[2]

console.log(writeFileContents(functionName))
