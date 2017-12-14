"use strict";

const _ = require('lodash');
const fs = require('fs');

// Part 1
fs.readFile('./inputs/day12.txt', 'utf8', (err, data) => {
  const numbers = data.match(/-?\d{1,}/g);
  console.log(numbers.map((n) => parseInt(n, 10)).reduce((m, n) => m + n, 0));
});

// Part2
fs.readFile('./inputs/day12.txt', 'utf8', (err, data) => {
  const input = JSON.parse(data);
  console.log(numbers([], input).reduce((m, n) => m + n, 0));
});

function numbers(acc, data) {
  if (_.isNumber(data))
    acc.push(data);
  else if (_.isArray(data))
    _.map(data, _.partial(numbers, acc));
  else if (_.isObject(data) && _.values(data).indexOf('red') === -1)
    _.map(_.values(data), _.partial(numbers, acc));

  return acc;
}