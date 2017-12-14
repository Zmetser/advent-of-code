"use strict";

const _ = require('lodash');

const input = 'abcdefgh';
const ABC = 'abcdefghijklmnopqrstvwxyz';
const straights = ABC.split('').map((chr, index) => ABC.substr(index, 3)).slice(0, -2);

function increment(password) {
  const _password = password.split('').reverse();

  function iteratee(index, password) {
    const nextChr = getNext(password[index]);

    password.splice(index, 1, nextChr === 10 ? 0 : nextChr);

    if (nextChr !== ABC[0]) return password;

    return iteratee(index + 1, password);
  }

  return iteratee(0, _password).reverse().join('');
}

function getNext(chr) {
  const index = ABC.indexOf(chr);
  return (index + 1 > ABC.length - 1) ? ABC[0] : ABC[index + 1];
}

function validPassword(password) {
  const hasDoubles = password.match(/(.)(\1)/g);
  if (!hasDoubles || hasDoubles.length < 2) return false;
  const hasRestrictions = /[ilo]/.test(password);
  if (hasRestrictions) return false;
  return _.any(straights, (straight) => password.indexOf(straight) > -1);
}

let password = input;
while (!validPassword(password)) {
  console.log(password);
  password = increment(password);
}

console.log('prev', input, 'current', password);