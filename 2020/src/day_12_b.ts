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

const acc: { x: number, y: number, shipX: number, shipY: number } = {
  x: 10,
  y: 1,
  shipX: 0,
  shipY: 0
};

const result = input.reduce((acc, [action, value]) => {
  const { x, y, shipX, shipY } = acc;

  switch (action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W': {
      const [vx, vy] = dir(quarterToDegree[action]);
      return {
        ...acc,
        x: x + vx * value,
        y: y + vy * value
      }
    }

    case 'F': {
      return {
        ...acc,
        shipY: shipY + y * value,
        shipX: shipX + x * value,
      }
    }

    case 'L':
    case 'R': {
      const [vx, vy] = dir((360 + (action === 'L' ? -1 * value : value)) % 360);
      return {
        ...acc,
        x: x * vy + y * vx,
        y: y * vy - x * vx
      }
    }
  }

  return acc;
}, acc)

console.log(result);
console.log(Math.abs(result.shipX) + Math.abs(result.shipY));