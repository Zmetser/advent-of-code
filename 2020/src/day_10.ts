import * as path from 'path';
import { readFileSync } from 'fs';

const input: number[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day10.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => Number(n));

const adapters = input.sort((a, b) => a - b);

const d = [0, ...adapters, Math.max(...adapters) + 3].reduce((acc, n, i, arr) => {
  const diff = arr[i + 1] - n;
  return acc.map((n, i) => i === diff - 1 ? n + 1 : n);
}, [0, 0, 0]);

console.log(d[0] * d[2]);