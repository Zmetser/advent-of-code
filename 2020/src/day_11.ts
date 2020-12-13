import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day11.txt'), { encoding: 'utf-8' })
    .split('\n');

const width = input[0].length;

const empty = (seat: string) => seat === 'L';
const occupied = (seat: string) => seat === '#';

const getNeighborIndexes = (x: number, y: number): number[] => {
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ].filter(([x, y]) => x >= 0 && y >= 0 && x < width && y < width)
    .reduce((acc, [x, y]) => acc.concat([x + y * width]), []);
}

let prev: string[] = [];
let next: string[] = input.join('').split('');
while (prev.join('') !== next.join('')) {
  prev = next.slice();
  for (let i = 0; i < prev.length; i++) {
    const seat = prev[i];
    const x = i % width; // >
    const y = Math.floor(i / width); // ^
    const neighbors = getNeighborIndexes(x, y);

    if (empty(seat) && undefined === neighbors.find(i => occupied(prev[i]))) {
      next[i] = '#';
    } else if (occupied(seat) && neighbors.filter(i => occupied(prev[i])).length >= 4) {
      next[i] = 'L';
    } else {
      next[i] = seat;
    }
  }
}

console.log(
  next.reduce((acc, seat) => occupied(seat) ? acc + 1 : acc, 0)
);