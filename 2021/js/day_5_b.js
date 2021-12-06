const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day5.txt'), { encoding: 'utf-8' })
  .split('\n');

const lines = input.reduce((acc, line) => {
  const [_, x1, y1, x2, y2] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
  acc.push([Number(x1), Number(y1), Number(x2), Number(y2)])
  return acc;
}, [])

function pointsInLine([x1, y1, x2, y2]) {
  const points = [];
  const xs = [Math.min(x1, x2), Math.max(x1, x2)];
  const ys = [Math.min(y1, y2), Math.max(y1, y2)];
  for (let x = xs[0]; x <= xs[1]; x++) {
    for (let y = ys[0]; y <= ys[1]; y++) {
      points.push([x, y]);
    }
  }
  return points;
}

function pointsInDiagonal([x1, y1, x2, y2]) {
  const points = [];
  const stepX = x1 < x2 ? 1 : -1;
  const stepY = y1 < y2 ? 1 : -1;

  for (let i = 0; i <= Math.abs(x1 - x2); i++) {
    points.push([x1 + (i * stepX), y1 + (i * stepY)])
  }

  return points;
}

function markPoints(lines) {
  const diagram = new Map();
  const mark = (points) => {
    points.forEach(p => {
      const coord = p.toString();
      diagram.set(coord, diagram.has(coord) ? diagram.get(coord) + 1 : 1);
    });
  }

  lines.forEach(([x1, y1, x2, y2]) => {
    if (x1 === x2 || y1 === y2) {
      mark(pointsInLine([x1, y1, x2, y2]));
    } else {
      mark(pointsInDiagonal([x1, y1, x2, y2]));
    }
  });

  return diagram;
}


let overlaps = 0;
for (let count of markPoints(lines).values()) {
  overlaps += count >= 2;
}
console.log(overlaps)