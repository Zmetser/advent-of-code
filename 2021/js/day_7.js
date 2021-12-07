const path = require('path');
const fs = require('fs');

const positions = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
  .split(',').map(Number);

const min = Math.min(...positions);
const max = Math.max(...positions);

let m = Infinity;
for (let i = min; i <= max; i++) {
  const fuelCost = sumOfFuelCostAt(i, positions);
  if (m > fuelCost) {
    m = fuelCost;
  }
}

console.log(m)

function sumOfFuelCostAt(position, positions) {
  return positions.reduce((acc, curr) => acc + Math.abs(position - curr), 0);
}