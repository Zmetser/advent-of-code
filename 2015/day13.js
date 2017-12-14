"use strict"

const _ = require('lodash')
const fs = require('fs')

fs.readFile('./inputs/day13.txt', 'utf8', (err, data) => {
  const input = data.split('\n')
  const guests = _.unique(input.map((line) => line.match(/\w*/)[0]))
  const happinessMap = input.reduce((acc, line) => {
    const [guest1, effect, amount, guest2] = line.match(/^(\w+).+(lose|gain) (\d+) happiness units by sitting next to (\w+)/).splice(1, 4)
    acc[guest1] = acc[guest1] || {}
    acc[guest1][guest2] = numericValue(effect, amount)
    return acc
  }, {})

  let arrangaments = guests.reduce(function permute(acc, guest, index, guests) {
    return acc.concat(guests.length > 1 && guests.slice(0, index).concat(guests.slice(index + 1)).reduce(permute, []).map((perm) => [guest].concat(perm)) || guest)
  }, [])

  let sums = arrangaments.map((table) => {
    return table.reduce((acc, middle, index, table) => {
      let left = table[(index - 1 >= 0) ? index - 1 : table.length - 1];
      let right = table[(index + 1 < table.length) ? index + 1 : 0];
      return (acc + +(happinessMap[middle][left]) + +(happinessMap[middle][right]));
    }, 0)
  })

  console.log(_.max(sums))

})

function numericValue(effect, amount) {
  return (effect === 'lose') ? -1 * +amount : +amount
}