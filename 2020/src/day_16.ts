import * as path from 'path';
import { readFileSync } from 'fs';

const input: Array<number[]> =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day16.txt'), { encoding: 'utf-8' })
    .split('\n').map(n => n.split(',').map(n => Number(n)));

const fields: { [key: string]: [[number, number], [number, number]] } = {
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

const ranges: [[number, number], [number, number]] = Object.keys(fields).reduce((ranges, key) => {
  const [range1, range2] = fields[key];

  return [
    [Math.min(range1[0], ranges[0][0]), Math.max(range1[1], ranges[0][1])],
    [Math.min(range2[0], ranges[1][0]), Math.max(range2[1], ranges[1][1])]
  ];
}, fields['departure location']);

console.log(
  input.flatMap(ticket => ticket.filter(n =>
    (n < ranges[0][0] || n > ranges[0][1]) &&
    (n < ranges[1][0] || n > ranges[1][1])
  )).reduce((sum, n) => sum + n, 0)
)