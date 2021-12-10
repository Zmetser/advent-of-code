const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day10.txt'), { encoding: 'utf-8' }).split('\n');

const pairs = {'(': ')', '{': '}', '[': ']', '<': '>'}
const reverse = (token) => pairs[token];

function findFirstSyntaxError(line) {
  const tokens = line.split('');
  const open = [];
  for (let token of tokens) {
    if (['(', '[', '{', '<'].includes(token)) {
      open.unshift(token);
    } else if (token === reverse(open[0])) {
      open.shift()
    } else {
      console.log(`Expected ${reverse(open[0])}, but found ${token} instead`)
      return token;
    }
  }
  return null;
}

const oopsies = []
for (let line of input) {
  oopsies.push(findFirstSyntaxError(line));
}
const score = {')': 3, ']': 57, '}': 1197, '>': 25137};
console.log(oopsies.reduce((acc, n) => acc + (score[n] || 0), 0))
