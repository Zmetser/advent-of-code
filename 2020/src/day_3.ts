import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[][] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), { encoding: 'utf-8' })
    .split('\n').map(row => row.split(''));

let row = 1;
let col = 3;
let trees = 0;

while (input[row]) {
  if (input[row][col] === '#') {
    trees++;
  }
  col += 3;
  if (col >= input[row].length) {
    col = col - input[row].length;
  }
  row += 1;
}

console.log(trees)