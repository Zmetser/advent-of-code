import * as path from 'path';
import { readFileSync } from 'fs';

const input: number[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day10.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => Number(n));

type Cache = { [jolt: number]: number };
const acc: Cache = input.sort((a, b) => a - b).reduce((acc, jolt) => {
  // check all valid values
  [jolt - 1, jolt - 2, jolt - 3].forEach(valid => {
    // if it is an existing jolt "connect" them together
    if (acc.hasOwnProperty(valid)) {
      acc[jolt] = (acc[jolt] || 0) + acc[valid];
    }
  });

  return acc;
}, {0: 1} as Cache);

console.log(Math.max(...Object.values(acc)))
