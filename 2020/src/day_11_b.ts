import * as path from 'path';
import { readFileSync } from 'fs';

const empty = (seat: string) => seat === 'L';
const occupied = (seat: string) => seat === '#';
const toKey = (x: number, y: number) => `${x},${y}`;
const fromKey = (key: string) => key.split(',').map(n => Number(n));
const copy = <K, V>(map: Map<K, V>) => {
  const newMap = new Map<K, V>();
  map.forEach((value, key) => newMap.set(key, value));
  return newMap;
};

const input: Map<string, string> =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day11.txt'), { encoding: 'utf-8' })
    .split('\n').reduce((acc, line, y) => {
      line.split('').forEach((seat, x) => acc.set(toKey(x, y), seat));
      return acc;
    }, new Map() as Map<string, string>);

const getVisibleSeatsFrom = (x: number, y: number, seats: Map<string, string>): string[] => {
  return [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
  ].map(([vx, vy]) => {
    let newPos: [number, number] = [x + vx, y + vy];
    while (seats.has(toKey(...newPos))) {
      const visibleSeat = seats.get(toKey(...newPos));
      if (visibleSeat && visibleSeat !== '.')  {
        return visibleSeat;
      }
      newPos = [newPos[0] + vx, newPos[1] + vy];
    }
    return '';
  }).filter(seat => seat.length === 1);
}

let prev: Map<string, string> = new Map<string, string>();
let next: Map<string, string> = input;
let equilibrium = false;
while (!equilibrium) {
  prev = copy(next);
  equilibrium = true;

  prev.forEach((seat, key) => {
    const [x, y] = fromKey(key);
    const visibleSeats = getVisibleSeatsFrom(x, y, prev);

    if (empty(seat) && undefined === visibleSeats.find(occupied)) {
      equilibrium = false;
      next.set(toKey(x, y), '#');
    } else if (occupied(seat) && visibleSeats.filter(occupied).length >= 5) {
      equilibrium = false;
      next.set(toKey(x, y), 'L');
    }
  })
}

console.log(
  Array.from(next.values()).reduce((acc, seat) => occupied(seat) ? acc + 1 : acc, 0)
);