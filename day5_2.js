"use strict";

const fs = require('fs');

fs.readFile('./inputs/day5.txt', 'utf8', function (err, data) {
  const result = data.split('\n').reduce((acc, word) => {
    if (testWord(word)) acc++;
    return acc;
  }, 0);

  console.log(result);
});

function hasRepeatingDoubles(text) {
  let iterator = text[Symbol.iterator]();
  let chr = iterator.next().value;

  while (chr) {
    const nextChar = iterator.next().value;
    const doubles = text.match(new RegExp(chr + nextChar, 'g'));

    if (doubles && doubles.length >= 2) {
      return true;
    }

    chr = nextChar;
  }

  return false;
}

function testWord(text) {

  if (!hasRepeatingDoubles(text)) {
    return false;
  }

  if (!/(.).(\1)/.test(text)) {
    return false;
  }

  return true;
}

// TESTS
console.assert(hasRepeatingDoubles('qjhvhtzxzqqjkmpb'), 'qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj).');
console.assert(!hasRepeatingDoubles('uurcxxtgmygtbstv'), 'uurcxxtgmygtbstv is naughty because it has no repeating pairs.');
console.assert(!hasRepeatingDoubles('uuurcxxxtgmygtbstv'), 'Triples should not count as pairs');