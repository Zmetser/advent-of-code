const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day1.txt'), { encoding: 'utf-8' });
const report = input.split('\n').map(n => parseInt(n, 10));

const answer = (report, i = 0) => {
  const result = 2020 - report[i];
  // if result is in report that two number will add up to 2020
  // multiplying them together will give us the answer
  return report.includes(result) ? report[i] * result : answer(report, i + 1);
};

console.log(answer(report));