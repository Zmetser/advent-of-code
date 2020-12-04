import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day4.txt'), { encoding: 'utf-8' })
    .split('\n\n');

const pattern = /(eyr:)|(hcl:)|(byr:)|(iyr:)|(ecl:)|(hgt:)|(pid:)/gm;
const validPassports = input.filter(line => line.match(pattern)?.length === 7);

console.log(validPassports.length);