"use strict";

const _ = require('lodash');
const fs = require('fs');

fs.readFile('./inputs/day7.txt', 'utf8', (err, data) => {
  const assignments = data.split('\n');
  let memo = {signals: {}, inQueue: true}

  let counter = 0;
  while (memo.inQueue) {
    memo.inQueue = false;
    memo = assignments.reduce(processAssignment, memo);
    counter++;
    if (counter > assignments.length) break;
  }

  console.log('Got a in', counter, 'iterations:', memo.signals.a);
});

function processAssignment(memo, assignment, index, assignments) {
  const target = assignment.match(/\w{1,2}$/)[0];
  const instruction = assignment.split('->')[0].trim();

  if (!/\s/g.test(instruction)) {
    // Value assignments
    const intValue = getValue(instruction, memo.signals);
    if (isNaN(intValue)) memo.inQueue = true;
    else memo.signals[target] = intValue;
  } else {
    // Unary or binary operations
    const [match, left, operator, right] = instruction.match(/^(\d{1,}|\w{1,2})?\s?(AND|OR|RSHIFT|LSHIFT|NOT)\s(\d{1,}|\w{1,2})$/);
    const [a, b] = [getValue(left, memo.signals), getValue(right, memo.signals)];
    const intValue = (operator === 'NOT')
      ? processUnary(operator, b)
      : processBinary(operator, a, b);

    if (isNaN(intValue)) memo.inQueue = true;
    else memo.signals[target] = intValue;
  }

  return memo;
}

function getValue(value, memo) {
  let intValue = parseInt(value, 10);
  if (!isNaN(intValue)) {
    return intValue;
  }

  if (memo.hasOwnProperty(value)) {
    return memo[value];
  }

  return NaN;
}

function processUnary(operator, a) {
  return (isNaN(a)) ? NaN : getOperatorMethod(operator)(a);
}

function processBinary(operator, a, b) {
  return (isNaN(a) || isNaN(b)) ? NaN : getOperatorMethod(operator)(a, b);
}

function getOperatorMethod(operator) {
  switch (operator) {
    case 'AND':
      return (a, b) => a & b;
    case 'OR':
      return (a, b) => a | b;
    case 'NOT':
      return (a) => ~a;
    case 'LSHIFT':
      return (a, b) => a << b;
    case 'RSHIFT':
      return (a, b) => a >> b;
  }
}