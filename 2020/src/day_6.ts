import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
    .split(/\n{2}/);

console.log(
  input.reduce((sum, group) =>
    sum + new Set(
      Array.from(
        group.split('\n').map(n => n.split('')).flat()
      )
    ).size
  , 0)
);