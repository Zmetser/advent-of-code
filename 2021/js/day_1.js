const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day1.txt'), { encoding: 'utf-8' });
const measurements = input.split('\n').map(n => parseInt(n, 10));

function getNumberOfIncreases(measurements) {
  let counter = 0;
  for (i in measurements) {
    if (measurements[i] > measurements[i - 1]) {
      counter++;
    }
  }
  return counter
}

console.log(
  getNumberOfIncreases(measurements),
  'measurements are larger than the previous'
);