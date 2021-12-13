const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day13.txt'), { encoding: 'utf-8' }).split('\n');
const points = input.reduce((set, line) => set.add(line), new Set());

const foldX = 655;

const toIndex = (p) => p.toString();
const fromIndex = (p) => p.split(',').map(Number);

for (let p of points) {
  const [x, y] = fromIndex(p);
  if (x >= foldX) {
    points.delete(p);
    points.add(toIndex([2 * foldX - x, y]))
  }
}

console.log( points.size)