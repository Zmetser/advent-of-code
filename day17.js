"use strict"

const containers = [43, 3, 4, 10, 21, 44, 4, 6, 47, 41, 34, 17, 17, 44, 36, 31, 46, 9, 27, 38]
const limit = 150

console.log('Possible combinations', subsetSum(limit, containers.length, 0));

var i = 1, result;

while (!result) {
  result = subsetSum(limit, i++, 0);
}
console.log('Minimum container required', result);

function subsetSum(sum, length, index) {
  if (length < 0)
    return 0
  else if (sum === 0)
    return 1
  else if (index === containers.length || sum < 0)
    return 0
  else
    return subsetSum(sum, length, index + 1) + subsetSum(sum - containers[index], length - 1, index + 1)
}