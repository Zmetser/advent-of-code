const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
  .split(',').map(Number);

// AGE group      0, 1  2  3  4  5  6  7  8
let population = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let simulationTime = 256;

// Initializa population
for (let age of input) {
  population[age] += 1;
}

while (simulationTime > 0) {
  let newPopulation = [];
  // Shift age groups left
  for (let age = 1; age < population.length; age++) {
    newPopulation.push(population[age])
  }
  // spawn new generation
  newPopulation.push(population[0]);
  // reset spawners to 6
  newPopulation[6] += population[0];
  population = newPopulation;
  simulationTime--;
}

console.log(population.reduce((sum, n) => sum + n, 0));