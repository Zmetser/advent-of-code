const path = require('path');
const fs = require('fs');

const NEIGHBOR_MATRIX = [
          [0, -1],
  [-1, 0],        [1, 0],
          [0, 1],
];

const input = fs.readFileSync(path.join(__dirname, '../', 'inputs', 'day9.txt'), { encoding: 'utf-8' }).split('\n');
const distances = input.flatMap(line => line.split('')).map(Number);

const WIDTH = input[0].length;
const HEIGHT = input.length;

function isInBounds(w, h) {
  return ([x, y]) => x >= 0 && y >= 0 && x < w && y < h;
}
const isInMatrix = isInBounds(WIDTH, HEIGHT)

function getNeighbors(x, y) {
  return NEIGHBOR_MATRIX.reduce((acc, [xm, ym]) =>
    acc.concat([[x + xm, y + ym]])
    , []);
}

function sumOfRiskLevels(input) {
  return input.reduce((sum, n, i, input) => {
    const x = i % WIDTH;
    const y = Math.floor(i / WIDTH);
    const neighbors = getNeighbors(x, y).filter(isInMatrix).map(([x, y]) => input[y * WIDTH + x]);
    const min = Math.min(...neighbors);
    if (n < min) console.log(n, min)
    return (n < min) ? sum + 1 + n : sum;
  }, 0);
}

console.log(sumOfRiskLevels(distances))