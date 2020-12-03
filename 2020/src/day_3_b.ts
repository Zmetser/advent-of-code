import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[][] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), { encoding: 'utf-8' })
    .split('\n').map(row => row.split(''));

type Step = [right: number, down: number];
function slide(slope: string[][], step: Step) {
  const iter = (i = 0, j = 0, trees = 0): number => {
    if (i >= slope.length) {
      return trees;
    }
    const nextI = j + step[0];
    return iter(
      i + step[1],
      // wrap around
      nextI >= slope[i].length ? nextI - slope[i].length : nextI,
      slope[i][j] === '#' ? trees + 1 : trees
    );
  }

  return iter();
}

const startingPoints: Step[] = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

console.log(
  startingPoints.reduce((acc, p) => acc * slide(input, p), 1)
);