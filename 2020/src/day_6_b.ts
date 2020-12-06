import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
    .split(/\n{2,}/g);

const intersect = <T>(a: Set<T>, b: Set<T>): Set<T> => new Set(Array.from(a).filter(x => b.has(x)));

console.log(
  input.reduce((result, group) => {
    const answers = group.split('\n').map(answer => new Set(Array.from(answer.split(''))));
    return result + answers.reduce((count, _, i, answers) => answers[i + 1] ? intersect(count, answers[i + 1]) : count, answers[0]).size
  }, 0)
);