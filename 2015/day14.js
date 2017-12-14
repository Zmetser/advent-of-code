"use strict"

const _ = require('lodash')
const fs = require('fs')

fs.readFile('./inputs/day14.txt', 'utf8', (err, data) => {
  const input = data.split('\n')
  const limit = 2503

  console.log('max distance covered:', _.max(currentState(input, limit)));
  console.log('max score achieved:', _.max(scoreboard(input, limit)));
})

function currentState(input, limit) {
  return input.map((line) => {
    const [speed, runTime, restTime] = line.match(/(\d+)/g).map((n) => parseInt(n, 10))
    const cycleLength = runTime + restTime

    let completedCycles = Math.floor(limit / cycleLength)
    let distance = completedCycles * runTime * speed

    let currentCycle = limit - completedCycles * cycleLength

    if (currentCycle < cycleLength) {
      distance += (currentCycle < runTime) ? currentCycle * speed : runTime * speed
    }

    return distance
  })
}

function scoreboard(input, limit) {
  let scoreboard = currentState(input, 0)

  for (let i = 1; i < limit; i++) {
    let state = currentState(input, i)
    let max = _.max(state)

    state.forEach((n, i) => {if (n === max) scoreboard[i]++})
  }

  return scoreboard;
}