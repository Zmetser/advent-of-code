const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day4.txt'), { encoding: 'utf-8' })
  .split('\n\n');

const sequence = input.shift().split(',').map(Number)

const boards = input.reduce((acc, line) => {
  // Every line is a board where rows are separated with \n
  acc.push(line.split('\n').reduce((acc, row) =>
    acc.concat([row.split(' ').filter(n => n !== '').map(Number)])
  , []))
  return acc;
}, []);

function wins(board, calls) {
  for (let i = 0; i < 5; i++) {
    if (board[i].every(n => calls.includes(n))) {
      return true;
    }
    if (board.every(row => calls.includes(row[i]))) {
      return true
    }
  }
  return false;
}

function play(boards, sequence) {
  const calls = [];
  for (let draw of sequence) {
    calls.push(draw);
    for (let board of boards) {
      if (wins(board, calls)) {
        return [board, calls];
      }
    }
  }
}

function result(winningBoard, calls) {
  const lastCall = calls[calls.length - 1];
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    for (let k = 0; k < 5; k++) {
      if (!calls.includes(winningBoard[i][k])) {
        sum += winningBoard[i][k];
      }
    }
  }
  return sum * lastCall;
}

console.log(result(...play(boards, sequence)))