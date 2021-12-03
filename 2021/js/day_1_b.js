const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day1.txt'), { encoding: 'utf-8' });
const measurements = input.split('\n').map(n => parseInt(n, 10));

function getNumberOfIncreases(measurements) {
  let counter = 0;
  let sum = [0, 0, 0];
  for (let i = 0; i < measurements.length - 2; i++) {
    sum[i % 3] = measurements[i] + measurements[i + 1] + measurements[i + 2];
    if (sum[(i - 1) % 3] < sum[i % 3]) {
      counter++;
    }
  }
  return counter
}

console.log(
  getNumberOfIncreases(measurements),
  'measurements are larger than the previous window'
);