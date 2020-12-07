import * as path from 'path';
import { readFileSync } from 'fs';

const input: Map<string, number>[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day7.txt'), { encoding: 'utf-8' })
    .split('\n')
    .map(rule => {
      const container = rule.match(/^(\w*) (\w*)(?= bags)/);
      const bags = rule.match(/(\d) ((\w*) (\w*))(?= bags?)/g)?.map(m => m.match(/(\d) (.*)/)) as [string, string, string][];
      const map = new Map<string, number>();
      if (container) {
        map.set(container[0], 0);
      }
      if (bags) {
        bags.forEach(bag => map.set(bag[2], Number(bag[1])));
      }
      return map;
    });

const iter = (name: string, count: number): number => {
  const myRule = input.find(rule => rule.get(name) === 0);

  if (myRule) {
    return count + Array.from(myRule).slice(1).reduce((acc, [bag, count]) => acc + count * iter(bag, 1), 0);
  }
  return count;
}

console.log(iter('shiny gold', 0));