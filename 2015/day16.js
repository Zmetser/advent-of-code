"use strict";

const _ = require('lodash')
const fs = require('fs')
const conditions = {
  children: 3,
  cats: 7, // greater than this many
  samoyeds: 2,
  pomeranians: 3, // less than this many
  akitas: 0,
  vizslas: 0,
  goldfish: 5, // less than this many
  trees: 3, // greater than this many
  cars: 2,
  perfumes: 1
}

// Part 1
fs.readFile('./inputs/day16.txt', 'utf8', (err, data) => {
  const aunts = data.split('\n')

  let matchingAunts = aunts

  for (let condition in conditions) {
    console.info(`Checking ${condition}`, matchingAunts.length);
    matchingAunts = matchingAunts.reduce((acc, aunt) => {
      const conditionValue = aunt.match(`${condition}: (\\d{1,})`)

      if (conditionValue === null || meetsCondition(condition, +conditionValue[1]))
        acc.push(aunt)
      return acc;
    }, [])
  }

  console.log('Dearest aunt:', matchingAunts);
});

function meetsCondition(condition, value) {
  const limit = conditions[condition]
  switch (condition) {
    case 'cats':
    case 'trees':
      return (value > limit)
    case 'pomeranians':
    case 'goldfish':
      return (value < limit)
    default:
      return (value === limit)
  }

  return false;
}