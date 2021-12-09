const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '../', 'inputs', 'day8.txt'), { encoding: 'utf-8' })
  .split('\n').reduce((acc, line) => acc.concat([line.split(' | ')[1].split(' ')]), []);

function countTokens(input) {
  return input.flat().reduce((acc, token) => acc + Number([2, 3, 4, 7].includes(token.length)), 0);
}

console.log(countTokens(input))