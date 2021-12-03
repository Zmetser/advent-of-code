const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day3.txt'), { encoding: 'utf-8' });
const listOfBinaryNumbers = input.split('\n');

function countHighBits(array, col) {
  return array.reduce((acc, row) => acc += Number(row[col] === '1'), 0)
}

function mostCommonBit(array, col) {
  return Number(countHighBits(array, col) >= array.length / 2);
}

function rating(array, callback, col = 0) {
  if (array.length === 1) {
    return array;
  }
  const bit = callback(array, col);
  return rating(array.filter(row => Number(row[col]) === bit), callback, col + 1);
}

function flip(f) {
  return (...args) => Number(!f.apply(f, args));
}

let oxygenGeneratorRating = rating(listOfBinaryNumbers, mostCommonBit)[0];
console.log(oxygenGeneratorRating);

let co2ScrubberRating = rating(listOfBinaryNumbers, flip(mostCommonBit))[0];
console.log(co2ScrubberRating);

console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2))