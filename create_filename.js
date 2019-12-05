const exec = require('child_process').exec

const createFilename = str => {
	str = str.replace(/\(/g, '')
	str = str.replace(/\)/g, '')
	const i = str.indexOf('.')
	let num = str.slice(0, i)

	while (num.length < 4) {
		num = '0' + num
	}
	const filename = num + str.slice(i + 1)
	return `${filename
		.toLowerCase()
		.split(' ')
		.join('_')}.js`
}

const name = process.argv[2]
const file = createFilename(name)

exec(`touch ${file} && code ${file} && node ${file}`)
