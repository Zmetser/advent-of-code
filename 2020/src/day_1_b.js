const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day1.txt'), { encoding: 'utf-8' });
const report = input.split('\n').map(n => parseInt(n, 10));

// Generalization of the first answer
const prod = (sum, report, i = 0) => {
  if (i >= report.length) {
    return null;
  }
  const result = sum - report[i];
  // if result is in report that two number will add up to sum
  // multiplying them together will give us 2/3 of the answer
  return report.includes(result) ? report[i] * result : prod(sum, report, i + 1);
};

const answer = (report, i = 0) => {
  const x = prod(2020 - report[i], report);
  return x ? x * report[i] : answer(report, i + 1);
};

console.log(answer(report))