import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day4.txt'), { encoding: 'utf-8' })
    .split('\n\n');

const validPassports = input.filter(line =>
  /byr:(192[0-9]|19[2-9]\d|200[0-2])/gm.test(line) // [1920, 2002]
  && /iyr:(201\d|2020)/gm.test(line) // [2010, 2020]
  && /eyr:(202\d|2030)/gm.test(line) // [2020, 2030]
  && /hgt:((1[5-8]\d|19[0-3])cm)|(59|6[0-9]|7[0-6])in/gm.test(line) // [150, 193]cm | [59, 76]in
  && /hcl:#[0-9a-f]{6}/gm.test(line) // Hex
  && /ecl:(amb|blu|brn|gry|grn|hzl|oth)/gm.test(line) // exactly one of: amb blu brn gry grn hzl oth.
  && /pid:[0-9]{9}/gm.test(line) // a nine-digit number, including leading zeroes.
);

console.log(validPassports.length - 1);