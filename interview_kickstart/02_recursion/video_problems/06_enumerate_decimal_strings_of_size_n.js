/* Enumerate all possible decimal strings of length n. */
/*
DFS Recursive divide-and-conquer
Time Complexity - O(n * 10^n)
Space Complexity - O(n). Height of tree or length of prefix of partial slate which increases with depth.
*/

function decimalStrings(n) {
  if (n < 1) return []

  const result = []
  dsHelper('', n)
  return result

  function dsHelper(slate, n) {
    if (n === 0) result.push(slate)
    else {
      for (let i = 0; i < 10; i++) {
        dsHelper(slate + `${i}`, n - 1)
      }
    }
  }
}

// Tests
const tests = [
  [1, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']],
  [0, []],
  [
    2,
    [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '58',
      '59',
      '60',
      '61',
      '62',
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '70',
      '71',
      '72',
      '73',
      '74',
      '75',
      '76',
      '77',
      '78',
      '79',
      '80',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '90',
      '91',
      '92',
      '93',
      '94',
      '95',
      '96',
      '97',
      '98',
      '99'
    ]
  ]
]

console.log('Recursive divide-and-conquer')
for (const test of tests) {
  const res = decimalStrings(test[0])
  console.log(res)
  console.log(JSON.stringify(res) === JSON.stringify(test[1]))
}
