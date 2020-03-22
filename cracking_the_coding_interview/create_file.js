const exec = require('child_process').exec

const createFilename = str => {
  const filename = str
  return `${filename
    .toLowerCase()
    .split(' ')
    .join('_')}.js`
}

const createFunctionName = str => {
  const words = str
    .toLowerCase()
    .split(' ')
    .slice(1)

  let functionName = words.shift()
  for (const word of words) {
    functionName += word[0].toUpperCase() + word.slice(1)
  }

  return functionName
}
const name = process.argv[2]
const file = createFilename(name)
const functionName = createFunctionName(name)
exec(
  `touch ${file} && code ${file} && node ./../write_file_contents.js ${functionName} > ${file}`
)
