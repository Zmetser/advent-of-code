import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day14.txt'), { encoding: 'utf-8' })
    .split('\n');

function parseInstruction(instruction: string): [address: string, value: number] | [mask: string] {
  const memMatch = instruction.match(/mem\[(\d+)\] = (\d+)/);
  if (memMatch) {
    return [memMatch[1], Number(memMatch[2])]
  }
  const maskMatch = instruction.match(/mask = (.*)/);
  if (maskMatch) {
    return [maskMatch[1]];
  }

  throw new Error('no match');
}

function applyMask(value: number, mask: string) {
  const binary = Number(value).toString(2).split('');
  const maskedBinary = mask.split('').map((d, i) => d === 'X' ? binary[binary.length - mask.length + i] || 0 : d).join('');
  return parseInt(maskedBinary, 2);
}

type Memory = Map<string, number>;
type State = [string, Memory];
const memory: Memory = new Map<string, number>();

input.reduce<State>(([mask, memory], _) => {
  const instruction = parseInstruction(_);
  if (instruction.length === 1) {
    return [instruction[0], memory];
  }
  const [address, value] = instruction;
  const maskedValue = applyMask(value, mask);
  memory.set(address, maskedValue);
  return [mask, memory];
}, ['', memory]);

console.log(
  Array.from(memory.values()).reduce((sum, d) => sum + d, 0)
);