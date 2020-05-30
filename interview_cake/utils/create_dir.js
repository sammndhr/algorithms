const exec = require('child_process').exec
const allProblems = require('./problems.json')

// From $interview_cake, run `node create_dir.js $chap` where $chap is the chapter number. Omitting the chapter number will create directories for all chapters

const createDirName = (name, chapNo) => {
  let filename = chapNo ? `0${chapNo}_` : ''

  const arr = name.toLowerCase().split(' ')
  filename = `${filename}${arr.join('_')}`
  return filename.replace(/\,/g, '')
}

const createDir = (chapNo) => {
  const name = allProblems[chapNo].title
  const dir = createDirName(name, chapNo)
  exec(`mkdir ${dir}`)
}

const chapNo = process.argv[2]

if (chapNo === undefined) {
  for (const chap of Object.keys(allProblems)) {
    createDir(chap)
  }
} else {
  createDir(chapNo)
}
