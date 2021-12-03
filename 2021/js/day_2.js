const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'day2.txt'), { encoding: 'utf-8' });
const commands = input.split('\n').reduce((acc, row) => acc.concat([row.split(' ')]), []);


function drive([direction, amount]) {
  switch (direction) {
    case 'forward': return { h: +amount };
    case 'down': return { d: +amount };
    case 'up': return { d: -amount };
  }
}

function move(current, modifier) {
  return { h: current.h + (modifier.h ?? 0), d: current.d + (modifier.d ?? 0) };
}

function stepThrough(commands) {
  let endsUpAt = commands.reduce((acc, command) => move(acc, drive(command)), { h: 0, d: 0 })
  return endsUpAt.h * endsUpAt.d;
}

console.log(stepThrough(commands))
