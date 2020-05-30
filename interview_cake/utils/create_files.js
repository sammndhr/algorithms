const exec = require('child_process').exec
const allProblems = require('./problems.json')

// From dir interview-cake/${ch} run `node ../utils/create_files.js $chap`
const createFilename = (str, chap, number) => {
  let filename = chap ? `${chap}.` : ''
  filename += number ? `0${number}_` : ''
  const arr = str.toLowerCase().split(' ')

  return `${filename}${arr.join('_')}.js`
}

const chap = process.argv[2],
  problems = allProblems[chap].problems

for (const problem of problems) {
  const file = createFilename(problem.title, chap, problem.number)
  const link = problem.link

  exec(
    `touch ${file} && node ./../utils/write_file_contents.js "${link}" > ${file}`
  )
}
