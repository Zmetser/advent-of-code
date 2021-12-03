const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day2.txt'), { encoding: 'utf-8' });
const commands = input.split('\n').reduce((acc, row) => acc.concat([row.split(' ')]), []);

function move({h, d, aim}, [direction, amount]) {

  switch (direction) {
    case 'forward': return { h: h + Number(amount), d: d + aim * Number(amount), aim };
    case 'down': return { aim: aim + Number(amount), h, d };
    case 'up': return { aim: aim - Number(amount), h, d };
  }
}

function stepThrough(commands) {
  let endsUpAt = commands.reduce((acc, command) => move(acc, command), { h: 0, d: 0, aim: 0 })
  return endsUpAt.h * endsUpAt.d;
}

console.log(stepThrough(commands))
