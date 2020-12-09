import * as path from 'path';
import { readFileSync } from 'fs';

const input: number[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day9.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => Number(n));

const addsUp = (sum: number, i: number, arr: number[]): boolean =>
  arr.some((num, j) => j !== i && sum === arr[i] + num);

const iter = (index: number, input: number[]): number => {
  const preamble = input.slice(index - 25, index);
  return preamble.some((_, i) => addsUp(input[index], i, preamble)) ? iter(index + 1, input) : input[index];
}

console.log(iter(25, input));