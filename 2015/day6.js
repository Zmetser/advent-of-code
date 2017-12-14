"use strict";

const _ = require('lodash');
const fs = require('fs');

fs.readFile('./inputs/day6.txt', 'utf8', (err, data) => {
  const instructions = data.split('\n');
  const lightMatrix = instructions.reduce(processInstruction, _createMatrix(1000, 1000));
  console.log(_(lightMatrix).flatten().sum(), 'lights are lit.');
});

function processInstruction(matrix, instruction, index) {
  console.log(index, instruction);
  const executeCommand = _getBrightnessCommand(instruction);
  const range   = _getRange(instruction);

  range.forEach((c) => {
    let [x, y] = c;
    matrix[x][y] = executeCommand(matrix[x][y]);
  });

  return matrix;
}

function _createMatrix(x, y) {
  return Array.from(Array(x).keys(), _ => Array.from(Array(y).keys(), _ => 0))
}

// First part
function _getToggleCommand(instruction) {
  if (instruction.startsWith('turn on'))
    return (_) => 1;
  if (instruction.startsWith('turn off'))
    return (_) => 0;
  if (instruction.startsWith('toggle'))
    return (n) => n ? 0 : 1;
}

// Second part
function _getBrightnessCommand(instruction) {
  if (instruction.startsWith('turn on'))
    return (n) => n + 1;
  if (instruction.startsWith('turn off'))
    return (n) => n - 1 > 0 ? n - 1 : 0;
  if (instruction.startsWith('toggle'))
    return (n) => n + 2;
}

function _getRange(instruction) {
  var regex = new RegExp(/(\d{1,3}),(\d{1,3})\s\w*\s(\d{1,3}),(\d{1,3})/g);
  const [match, fromX, fromY, toX, toY] = Array.from(regex.exec(instruction), (x) => parseInt(x, 10));
  return _.flatten(_.range(fromX, toX + 1, 1).map((x) => {
    const range = _.range(fromY, toY + 1, 1)
    return _.zip(_.range(x, range.length + x, 0), range);
  }));
}