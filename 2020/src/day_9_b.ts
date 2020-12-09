import * as path from 'path';
import { readFileSync } from 'fs';
import { range } from 'lodash';

const input: number[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day9.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => Number(n));

const sum = 1038347917;

const getRange = (): [number, number] => {
  for (let i = 0; i < input.length; i++) {
    let acc = input[i];
    for (let j = i + 1; j < input.length; j++) {
      acc += input[j];
      if (acc === sum) {
        return [i, j];
      }
      if (acc > sum) {
        break;
      }
    }
  }
  return [0, 0];
}

const [first, ...rest] = range(...getRange()).map(i => input[i]).sort();
console.log(first + rest.slice(-1)[0]);