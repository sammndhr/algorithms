const exec = require('child_process').exec

const createFilename = (str, chap) => {
  let filename = chap ? `${chap}.` : ''
  const arr = str.toLowerCase().split(' ')
  arr[0] = arr[0].length === 1 ? `0${arr[0]}` : arr[0]
  return `${filename}${arr.join('_')}.js`
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
const chap = process.argv[3]
const file = createFilename(name, chap)
const functionName = createFunctionName(name)
exec(
  `touch ${file} && code ${file} && node ./../write_file_contents.js ${functionName} > ${file}`
)
