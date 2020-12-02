import * as path from 'path';
import { readFileSync } from 'fs';

const input =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day2.txt'), { encoding: 'utf-8' })
    .split('\n');

function explodeRow(row: string): [chr: string, range: [number, number], pass: string] {
  const [positions, chr, pass] = row.split(' ');
  const [min, max] = positions.split('-').map(n => parseInt(n, 10));

  return [chr.slice(0, 1), [min, max], pass];
}

const answer = input.reduce((validPasswords, row) => {
  const [chr, pos, pass] = explodeRow(row);
  // chr must be at exactly one of the positions
  const atCorrectPosition = (pass[pos[0] - 1] === chr) !== (pass[pos[1] - 1] === chr);

  return atCorrectPosition ? validPasswords + 1 : validPasswords;
}, 0);

console.log(answer);