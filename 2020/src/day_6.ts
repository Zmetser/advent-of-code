import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
    .split('\n');

const last = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
}
const emptySet: Set<string> = new Set();

const answersByGroup = input.reduce((acc: Array<Set<string>>, n: string) => {
  // start new group
  if (n === '') {
    return acc.concat([new Set()]);
  }
  // add each char in n to the end of the current group
  const group = last(acc);
  n.split('').forEach(n => group.add(n));
  return acc.slice(0, -1).concat([group]);
}, [emptySet]);

console.log(
  answersByGroup.reduce((acc, n) => acc + n.size, 0)
);