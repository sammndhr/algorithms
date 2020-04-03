const writeFileContents = functionName => {
  const fileContents = `const { Stack } = require('../../data_structures/modules')


function ${functionName}() {

}

/*
n = 
Time Complexity - O(n)
Space complexity - O(n)
*/

// Tests



const testCases = [
  []
]

for (const test of testCases) {
  console.log(${functionName}(test[0].head) === test[1])
}
  `
  return fileContents
}

const functionName = process.argv[2]

console.log(writeFileContents(functionName))
