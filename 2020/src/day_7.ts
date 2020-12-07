import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day7.txt'), { encoding: 'utf-8' })
    .split('\n');

const peekBag = /(\w*) (\w*)(?= bags?)/g;

const iter = (bags: Set<string>): Set<string> => {
  const setSize = bags.size;
  input.forEach(rule => {
    const match = rule.match(peekBag);
    if (match && match.slice(1).find(bag => bags.has(bag))) {
      bags.add(match[0]);
    }
  });
  return setSize === bags.size ? bags : iter(bags);
}

console.log(iter(new Set(['shiny gold'])).size - 1);