const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day10.txt'), { encoding: 'utf-8' }).split('\n');

const pairs = {
  '(': ')', '{': '}', '[': ']', '<': '>',
  ')': '(', '}': '{', ']': '[', '>': '<'
}
const reverse = (token) => pairs[token];

function getOpenTokens(line) {
  const tokens = line.split('');
  const open = [];
  for (let token of tokens) {
    if (['(', '[', '{', '<'].includes(token)) {
      open.unshift(token);
    } else if (token === reverse(open[0])) {
      open.shift()
    } else {
      // syntax error
      return false;
    }
  }
  return open;
}

const score = [')', ']', '}', '>'];
const lineScores = input.reduce((acc, line) => {
  const openTokens = getOpenTokens(line);
  if (openTokens) {
    return acc.concat(openTokens.map(reverse).reduce((acc, token) => acc * 5 + (score.indexOf(token) + 1), 0));
  }
  return acc;
}, []);

console.log(lineScores.sort((a, b) => a - b)[Math.floor(lineScores.length / 2)])
