const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day13.txt'), { encoding: 'utf-8' }).split('\n');
const points = input.reduce((set, line) => set.add(line), new Set());

const matrixToString = (m) => m.map((row) => row.join("")).join("\n");

const foldingPoints = [
  'x=655',
  'y=447',
  'x=327',
  'y=223',
  'x=163',
  'y=111',
  'x=81',
  'y=55',
  'x=40',
  'y=27',
  'y=13',
  'y=6'
].map(str => {
  const [axis, value] = str.split('=');
  return {[axis]: Number(value)}
});

const toIndex = (p) => p.toString();
const fromIndex = (p) => p.split(',').map(Number);

function fold(points, foldingPoint) {
  for (let p of points) {
    const [x, y] = fromIndex(p);
    if (foldingPoint.x && x > foldingPoint.x) {
      points.delete(p);
      points.add(toIndex([2 * foldingPoint.x - x, y]))
    } else if (foldingPoint.y && y > foldingPoint.y) {
      points.delete(p);
      points.add(toIndex([x, 2 * foldingPoint.y - y]))
    }
  }
  return points;
}

for (let foldingPoint of foldingPoints) {
  fold(points, foldingPoint);
}

const matrix = [...Array(6)].map((_) => Array(40).fill('.'));

for (let p of points) {
  const [x, y] = fromIndex(p);
  matrix[y][x] = '#';
}

console.log(matrixToString(matrix))