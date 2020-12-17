import * as path from 'path';
import { readFileSync } from 'fs';
import { range as createRange } from 'lodash';

type Range = [min: number, max: number];

const nearbyTickets: Array<number[]> =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day16.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => n.split(',').map(n => Number(n)));

const myTicket = [73, 59, 83, 127, 137, 151, 71, 139, 67, 53, 89, 79, 61, 109, 131, 103, 149, 97, 107, 101];
const fields: { [key: string]: [Range, Range] } = {
  'departure location': [[40, 261], [279, 955]],
  'departure station': [[33, 375], [394, 963]],
  'departure platform': [[39, 863], [877, 970]],
  'departure track': [[30, 237], [256, 955]],
  'departure date': [[47, 731], [741, 950]],
  'departure time': [[38, 301], [317, 954]],
  'arrival location': [[26, 598], [623, 969]],
  'arrival station': [[50, 835], [854, 971]],
  'arrival platform': [[44, 535], [549, 958]],
  'arrival track': [[36, 672], [685, 967]],
  'class': [[34, 217], [236, 974]],
  'duration': [[29, 469], [483, 970]],
  'price': [[45, 111], [120, 965]],
  'route': [[32, 751], [760, 954]],
  'row': [[25, 321], [339, 954]],
  'seat': [[38, 423], [438, 958]],
  'train': [[45, 798], [813, 954]],
  'type': [[40, 487], [503, 954]],
  'wagon': [[46, 916], [938, 949]],
  'zone': [[25, 160], [184, 957]],
};

const unionOfAllRanges: [Range, Range] = Object.keys(fields).reduce((ranges, key) => {
  const [range1, range2] = fields[key];
  return [
    [Math.min(range1[0], ranges[0][0]), Math.max(range1[1], ranges[0][1])],
    [Math.min(range2[0], ranges[1][0]), Math.max(range2[1], ranges[1][1])]
  ];
}, fields['departure location']);

const isInRange = (n: number, [min, max]: Range): boolean => n >= min && n <= max;
const isInOneOfTheRanges = (n: number, ranges: [Range, Range]) => isInRange(n, ranges[0]) || isInRange(n, ranges[1]);

const validTickets = nearbyTickets.filter(ticket => !ticket.some(n => !isInOneOfTheRanges(n, unionOfAllRanges)));

const fieldsWithPosition: Array<[string, Set<number>]> = [];
Object.keys(fields).forEach(key => {
  const possibleFieldPositions: Set<number> = new Set();

  // on all positions
  createRange(0, Object.keys(fields).length, 1).forEach(currentPosition => {
    // check if the value is in the range of the current field
    const hasInvalid = validTickets.some(ticket => !isInOneOfTheRanges(ticket[currentPosition], fields[key]));
    // if all the fields are within range, this position could work for the current field
    if (!hasInvalid) {
      possibleFieldPositions.add(currentPosition);
    }
  });

  fieldsWithPosition.push([key, possibleFieldPositions]);
});

// Eliminate duplicate field positions
fieldsWithPosition.sort((a, b) => a[1].size - b[1].size);
fieldsWithPosition.forEach(([_, singlePositionSet]) => {
  fieldsWithPosition.forEach(([_, positions]) => {
    if (positions.size > 1) {
      singlePositionSet.forEach(singlePosition => positions.delete(singlePosition));
    }
  })
})

console.log(
  fieldsWithPosition.reduce((product, [key, pos]) =>
    key.startsWith('departure') ? product * myTicket[Array.from(pos.values())[0]] : product
    , 1)
);