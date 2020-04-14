const writeFileContents = (functionName) => {
  const fileContents = `const { Graph } = require('../../utils')
function ${functionName}(graph) {

}

/*
n = 
Time Complexity - O(n)
Space complexity - O(n)
*/
// Tests
const g = new Graph()

for (let i = 65; i < 76; i++) {
  g.addVertex(String.fromCharCode(i))
}

g.addEdge('A', 'B')
g.addEdge('B', 'C')
g.addEdge('B', 'D')
g.addEdge('C', 'F')
g.addEdge('D', 'C')
g.addEdge('D', 'E')
g.addEdge('D', 'F')
g.addEdge('E', 'C')
g.addEdge('E', 'G')
g.addEdge('F', 'A')
g.addEdge('G', 'H')
g.addEdge('G', 'I')
g.addEdge('H', 'C')
g.addEdge('I', 'E')
g.addEdge('I', 'H')
g.addEdge('I', 'J')
g.addEdge('J', 'F')

console.log(${functionName}(g))
  `
  return fileContents
}

const functionName = process.argv[2]

console.log(writeFileContents(functionName))
