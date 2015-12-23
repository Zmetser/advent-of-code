"use strict";

const input = '1321131112'

function getNext(current) {
  return current.match(/(\d)(\1+)?/g).reduce((acc, n) => acc += n.length + n[0], '')
}

let next = input
let i = 0
do {
  next = getNext(next)
  i++
} while(i < 50)

console.log(next.length)
