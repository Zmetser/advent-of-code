import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day6.txt'), { encoding: 'utf-8' })
    .split('\n');

type question = string;
const answersByGroup = input.reduce((acc: Array<Array<Set<question>>>, n: string) =>
  // start new group
  (n === '') ?
    acc.concat([[]]) :
    // add each question in the answer to the end of the current group
    acc.slice(0, -1).concat([acc[acc.length - 1].concat([new Set(n.split(''))])])
  , [[]]);

const intersect = <T>(a: Set<T>, b: Set<T>): Set<T> => new Set(Array.from(a).filter(x => b.has(x)));

console.log(
  answersByGroup.reduce((acc, group) =>
    // Interscet all answers in the group. What remains are the all yes answers
    acc + group.reduce((acc, _, i, group) => group[i + 1] ? intersect(acc, group[i + 1]) : acc, group[0]).size
    , 0)
);