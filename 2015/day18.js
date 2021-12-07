const path = require('path');
const fs = require('fs');

const WIDTH = 100;
const NEIGHBOR_MATRIX = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
]
const input = fs.readFileSync(path.join(__dirname, 'inputs', 'day18.txt'), { encoding: 'utf-8' })
  .split('').filter(s => s === '#' || s === '.');

const index = (x, y) => [x, y].toString();
const coords = (index) => index.split(',').map(Number);

function buildFlatMatrix(input) {
  return input.reduce((acc, s, x) =>
    acc.set([x % WIDTH, Math.floor(x / WIDTH)].toString(), s === '#')
  , new Map());
}

function neighbors(x, y) {
  return NEIGHBOR_MATRIX.reduce((acc, [xm, ym]) =>
    acc.concat([index(x + xm, y + ym)])
    , []);
}

function nextState(x, y, input) {
  // Part Two
  if ((x === 0 || x === WIDTH -1) && (y === 0 || y === WIDTH -1)) {
    return true;
  }
  const currentState = input.get(index(x, y))
  const neighborStates = neighbors(x, y).map(index => input.get(index)).filter(Boolean);
  return currentState ? neighborStates.length === 2 || neighborStates.length === 3 : neighborStates.length === 3
}

function step(input) {
  const nextStep = new Map();

  for (let index of input.keys()) {
    nextStep.set(index, nextState(...coords(index), input))
  }

  return nextStep;
}

let state = buildFlatMatrix(input);
// Part Two
state.set(index(0, 0), true);
state.set(index(0, WIDTH - 1), true);
state.set(index(WIDTH - 1, 0), true);
state.set(index(WIDTH - 1, WIDTH - 1), true);

for (let i = 0; i < 100; i++) {
  state = step(state)
}

let counter = 0;
for (let light of state.values()) {
  if (light) counter++;
}

console.log(counter); // Part One: 1061, Part Two: 1006