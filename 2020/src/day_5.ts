import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[][] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day5.txt'), { encoding: 'utf-8' })
    .split('\n').map(r => r.split(''));

function coordinate(pass: string[], lowr: string, max: number): number {
  return pass.reduce((acc, n) => {
    // number of seats in the reduced range
    const range = (acc[1] - acc[0]) / 2;
    return (n === lowr) ?
      // calculate upper bound
      [acc[0], acc[0] + Math.floor(range)] :
      // calculate lower bound
      [acc[1] - Math.ceil(range), acc[1]];
  }, [0, max])[1];
}

const highestId = input.reduce((max, pass) => {
  const row = coordinate(pass.slice(0, 7), 'F', 127);
  const col = coordinate(pass.slice(7), 'L', 7);
  const id = row * 8 + col;
  return max < id ? id : max;
}, 0);


console.log(highestId);
