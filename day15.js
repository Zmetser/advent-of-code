"use strict"

const _ = require('lodash')
const fs = require('fs')

fs.readFile('./inputs/day15.json', 'utf8', (err, data) => {
  const ingredients = JSON.parse(data)
  const ingredientValues = _.zip.apply(_, _.map(ingredients, (scores) => _.map(scores, _.identity)))
  const caloryLimit = 500

  let maxScore = 0;
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
      for (let k = 0; k <= 100 - i - j; k++) {
        let multipliers = [i, j, k, 100 - i - j - k]

        // part two, recipes with 500 calory
        if (getScore(ingredientValues[4], multipliers) !== caloryLimit) continue

        let score = ingredientValues.slice(0, 4).reduce((score, values) =>
          score * getScore(values, multipliers)
        , 1)

        if (score > maxScore) maxScore = score
      }
    }
  }

  console.log(maxScore);
})

function getScore(scores, multipliers) {
  return Math.max(_.sum(_.map(scores, (score, i) => score * multipliers[i])), 0)
}