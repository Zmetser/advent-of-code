const colors = require('colors');

function _arrowFunctionBody(fn) {
  return fn.toString().replace('() => ', '')
}

function assertEqual(getValue, shouldEqual) {
  const value = getValue();
  if (value === shouldEqual) {
    console.info('✓ OK\t'.green, `${_arrowFunctionBody(getValue)} is ${value}`)
  } else {
    console.error('✘ FAIL\t'.red, `${_arrowFunctionBody(getValue)} is ${value} but it should be ${shouldEqual}`)
  }
}

function solution(value) {
  console.log('The solution for today\'s problem is:'.bold.magenta, value.toString().bold)
}

module.exports = {
  assertEqual,
  solution
}