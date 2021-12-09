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
const index = (x, y) => [x, y].toString();
const get = (x, y) => distances[y * WIDTH + x];

function getNeighbors(x, y) {
  return NEIGHBOR_MATRIX.reduce((acc, [xm, ym]) =>
    acc.concat([[x + xm, y + ym]])
    , []);
}

function lowPoints(input) {
  return input.reduce((acc, n, i, input) => {
    const x = i % WIDTH;
    const y = Math.floor(i / WIDTH);
    const neighbors = getNeighbors(x, y).filter(isInMatrix).map(([x, y]) => get(x, y));
    const min = Math.min(...neighbors);
    return (n < min) ? acc.concat([[x, y]]) : acc;
  }, []);
}

function findBasinAt(queue, basin) {
  if (queue.length === 0) {
    return basin
  }

  const [xLow, yLow] = queue.shift();
  const min = get(xLow, yLow);
  const newInBasin = getNeighbors(xLow, yLow).filter(isInMatrix).reduce((acc, [x, y]) => {
    if (!basin.includes(index(x, y)) && get(x, y) < 9 && get(x, y) >= min) {
      basin.push(index(x, y));
      acc.push([x, y]);
    }
    return acc;
  }, []);

  return findBasinAt(queue.concat(newInBasin), basin);
}

const basins = lowPoints(distances)
  .map(low => findBasinAt([low], []))
  .sort((a, b) => b.length - a.length);

console.log(basins.slice(0, 3).reduce((acc, basin) => (basin.length + 1) * acc, 1))