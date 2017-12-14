const { solution } = require('./test_utils');

/*

5   4   3
6   1   2
7   8   9

(x,y) x: <->

(-1, 2)  (0,2)   (1, 2) (2, 2)
(-1,1)   (0,1)   (1,1)  (2, 1)
(-1,0)   (0,0)   (1,0)  (2, 0)
(-1,-1)  (0,-1)  (1,-1) (2, -1)

*/

const { generateUlam } = require('./day_3');

const distance = (x1, y1, x2, y2) =>
	Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

function findNeighbors(x1, y1) {
	return seq.filter(
		({ x: x2, y: y2 }) => distance(x1, y1, x2, y2) <= Math.sqrt(2)
	);
}

const seq = [];
for (let [x, y] of generateUlam(347991)) {
	const calculatedValue =
		findNeighbors(x, y).reduce((memo, { value }) => memo + value, 0) || 1;
	seq.push({ x, y, value: calculatedValue });
	if (calculatedValue > 347991) {
		solution(calculatedValue);
		break;
	}
}
