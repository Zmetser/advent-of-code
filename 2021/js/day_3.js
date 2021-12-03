const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), { encoding: 'utf-8' });
const listOfBinaryNumbers = input.split('\n');

const numberOfHighBits = listOfBinaryNumbers.reduce((acc, binary) => {
  for (i in binary) {
    if (binary[i] === '1') {
      acc[i] = (acc[i] ?? 0) + 1;
    }
  }
  return acc;
}, []);

const mostCommonInColumn = n => n > listOfBinaryNumbers.length / 2;
const gammaRate = numberOfHighBits.map(n => +mostCommonInColumn(n)).join('');
const epsilonRate = numberOfHighBits.map(n => +!mostCommonInColumn(n)).join('');

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))