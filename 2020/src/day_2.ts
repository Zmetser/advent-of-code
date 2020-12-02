import * as path from 'path';
import { readFileSync } from 'fs';

const input =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day2.txt'), { encoding: 'utf-8' })
    .split('\n');

function explodeRow(row: string): [chr: string, range: [number, number], pass: string] {
  const [rangeString, chr, pass] = row.split(' ');
  const [min, max] = rangeString.split('-').map(n => parseInt(n, 10));

  return [chr.slice(0, 1), [min, max], pass];
}

const answer = input.reduce((validPasswords, row) => {
  const [chr, range, pass] = explodeRow(row);
  const n = pass.split('').filter(c => c === chr).length;
  const inRange = (n >= range[0] && n <= range[1]);

  return inRange ? validPasswords + 1 : validPasswords;
}, 0);

console.log(answer);