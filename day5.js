"use strict";

const fs = require('fs');
const prohibitedStrings = ['ab', 'cd', 'pq', 'xy'];

fs.readFile('./inputs/day5.txt', 'utf8', function (err, data) {
  const result = data.split('\n').reduce((acc, word) => {
    if (testWord(word)) acc++;
    return acc;
  }, 0);

  console.log(result);
});

function hasExclusion(text) {
  for (let prohibited of prohibitedStrings)
    if (text.indexOf(prohibited) !== -1)
      return true;

  return false;
}

function hasDoubleLetters(text) {
  let iterator = text[Symbol.iterator]();
  let chr = iterator.next().value;

  while (chr) {
    let nextChar = iterator.next().value;
    if (chr === nextChar)
      return true;
    chr = nextChar;
  }

  return false;
}

function countVowels(text) {
  const vowels = text.match(/[aouei]/g);
  return vowels ? vowels.length : 0;
}

function testWord(text) {

  if (hasExclusion(text)) {
    return false;
  }

  if (!hasDoubleLetters(text)) {
    return false;
  }

  if (countVowels(text) < 3) {
    return false
  }

  return true;
}

// TESTS
console.assert(countVowels('ugknbfddgicrmopn') >= 3, 'is nice because it has at least three vowels.');
console.assert(hasDoubleLetters('abcdde'), 'abcdde contains at least one letter that appears twice in a row (dd).');
console.assert(!hasExclusion('xazegov'), 'does not contain the prohibited strings.');

console.assert(!testWord('jchzalrnumimnmhp'), 'jchzalrnumimnmhp is naughty because it has no double letter.');
console.assert(!testWord('haegwjzuvuyypxyu'), 'haegwjzuvuyypxyu is naughty because it contains the string xy.');
console.assert(!testWord('dvszwmarrgswjxmb'), 'dvszwmarrgswjxmb is naughty because it contains only one vowel.');