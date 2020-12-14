import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day14.txt'), { encoding: 'utf-8' })
    .split('\n');

function parseInstruction(instruction: string): [address: number, value: number] | [mask: string] {
  const memMatch = instruction.match(/mem\[(\d+)\] = (\d+)/);
  if (memMatch) {
    return [Number(memMatch[1]), Number(memMatch[2])]
  }
  const maskMatch = instruction.match(/mask = (.*)/);
  if (maskMatch) {
    return [maskMatch[1]];
  }

  throw new Error('no match');
}

function applyMask(value: number, mask: string): string {
  const binary = Number(value).toString(2).padStart(36, '0');
  return mask.split('').map((d, i) => d === '0' ? binary[i] : d).join('');
}

function addressCombinations(address: string): string[] {
  const floatingPositions = address.split('').reduce<number[]>((acc, n, i) => n === 'X' ? acc.concat([i]) : acc, []);
  const all: string[] = [];

  for (let variation = 0; variation < Math.pow(2, floatingPositions.length); variation++) {
    all.push(
      variation.toString(2).padStart(floatingPositions.length, '0').split('').reduce((partialAddress, d, i) =>
        String(partialAddress.substring(0, floatingPositions[i]) + d + partialAddress.substring(floatingPositions[i] + 1))
        , address)
    );
  }

  return all;
}

type Memory = Map<number, number>;
type State = [string, Memory];
const memory: Memory = new Map<number, number>();

input.reduce<State>(([mask, memory], _) => {
  const instruction = parseInstruction(_);
  if (instruction.length === 1) {
    return [instruction[0], memory];
  }
  const [address, value] = instruction;
  addressCombinations(applyMask(address, mask)).forEach(address => memory.set(parseInt(address, 2), value));
  return [mask, memory];
}, ['', memory]);

console.log(memory.size);

console.log(
  Array.from(memory.values()).reduce((sum, d) => sum + d, 0)
);