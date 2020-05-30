// Go to: https://www.interviewcake.com/table-of-contents and copy paste the following code
/* ---------------------------------------------------------------------------- */
const allSections = document.getElementsByClassName('toc-section'),
  allProblems = {}

const getProblems = (items) => {
  if (!items || !items.length) return
  console.log(items)
  const problems = []
  for (let i = 0; i < items.length; i++) {
    const problem = items[i].getElementsByTagName('a')[0],
      link = problem.href,
      title = problem.getElementsByClassName('item-title')[0].innerText,
      number = i + 1,
      problemObj = { link, title, number }
    problems.push(problemObj)
  }

  return problems
}

for (const section of allSections) {
  if (!section.children[2] || !section.children[2].children[1]) continue
  const chapName = section.children[0].innerText.split('. '),
    chapNo = chapName[0],
    chapTitle = chapName[1]

  const practice = section.children[2].children[1].getElementsByClassName(
    'toc-item-container'
  )
  const problems = getProblems(practice)

  allProblems[chapNo] = { title: chapTitle, problems }
}

JSON.stringify(allProblems)

/* ---------------------------------------------------------------------------- */

// Copy the result (exluding beginning and ending double quotes) into ./problems.json
// "{"1":{"title":"Array and string manipulation"......]}}"
