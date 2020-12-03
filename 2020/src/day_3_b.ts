import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[][] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), { encoding: 'utf-8' })
    .split('\n').map(row => row.split(''));

function check(row: number, col: number) {
  let i = 0;
  let j = 0;
  let trees = 0;

  while (input[i]) {
    if (input[i][j] === '#') {
      trees++;
    }
    j += col;
    if (j >= input[i].length) {
      j = j - input[i].length;
    }
    i += row;
  }
  return trees;
}
const startingPoints = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const result = startingPoints.reduce((acc, p) => acc * check(p[1], p[0]), 1);

console.log(result);