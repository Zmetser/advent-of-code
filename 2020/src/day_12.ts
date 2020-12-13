import * as path from 'path';
import { readFileSync } from 'fs';

// y ^
// x <->

const input: Array<[string, number]> =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day12.txt'), { encoding: 'utf-8' })
    .split('\n').map(instruction => {
      const [, action, value] = /(\w)(.*)/g.exec(instruction) as unknown as [string, string, string];
      return [action, Number(value)];
    });

type V = [number, number];

type Quarter = 'N' | 'S' | 'E' | 'W';
const quarterToDegree: { [quarter in Quarter]: number } = { 'N': 0, 'S': 180, 'E': 90, 'W': 270 };

const dir = (d: number): [number, number] => {
  switch (d) {
    case 0: return [0, 1];
    case 90: return [1, 0];
    case 180: return [0, -1];
    case 270: return [-1, 0];
  }
  return [0, 0];
}

const acc: { x: number, y: number, v: number } = {
  x: 0,
  y: 0,
  v: 90
};

const result = input.reduce((acc, [action, value]) => {
  const { x, y, v } = acc;

  switch (action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
    case 'F': {
      const [vx, vy] = dir(action === 'F' ? v : quarterToDegree[action]);
      return {
        x: x + vx * value,
        y: y + vy * value,
        v
      }
    }

    case 'L': return { ...acc, v: (v + 360 - value) % 360 }
    case 'R': return { ...acc, v: (v + 360 + value) % 360 }
  }

  return acc;
}, acc)

console.log(result);
console.log(Math.abs(result.x) + Math.abs(result.y));