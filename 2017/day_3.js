const { solution } = require('./test_utils');

/*

5   4   3
6   1   2
7   8   9

(x,y) x: <->

(-1,1)  (0,1)  (1,1)
(-1,0)  (0,0)  (1,0)
(-1,-1) (0,-1) (1,-1)

*/

const dir = direction => (direction + 1) % 4;

const DIRECTIONS = [
	[0, 1], // UP
	[-1, 0], // LEFT
	[0, -1], // DOWN
	[1, 0] // RIGHT
];

function* generateUlam(stop) {
	let start = 1;
	let value = start;
	let direction = 3; // RIGHT

	let x = 0;
	let y = 0;

	let minX = 0;
	let minY = 0;
	let maxX = 0;
	let maxY = 0;

	for (let i = 0; i <= stop; i++) {
		yield [x, y, value];

		value += 1;
		x += DIRECTIONS[direction][0];
		y += DIRECTIONS[direction][1];

		if (x < minX) {
			direction = dir(direction);
			minX = x;
		}
		if (x > maxX) {
			direction = dir(direction);
			maxX = x;
		}
		if (y < minY) {
			direction = dir(direction);
			minY = y;
		}
		if (y > maxY) {
			direction = dir(direction);
			maxY = y;
		}
	}
}

const distFromCenter = (x, y) => Math.abs(x) + Math.abs(y);

function assert(distance, shouldEqual, value) {
	if (distance === shouldEqual) {
		console.info(
			'✓ OK\t'.green,
			`Data from square ${value} is carried ${distance}`
		);
	} else {
		console.error(
			'✘ FAIL\t'.red,
			`Data from square ${value} is carried ${
				distance
			} but it should be carried ${shouldEqual}`
		);
	}
}

for (let [x, y, value] of generateUlam(347991)) {
	switch (value) {
		case 1:
			assert(distFromCenter(x, y), 0, 1);
			break;
		case 12:
			assert(distFromCenter(x, y), 3, 12);
			break;
		case 23:
			assert(distFromCenter(x, y), 2, 23);
			break;
		case 1024:
			assert(distFromCenter(x, y), 31, 1024);
			break;
		case 347991:
			solution(distFromCenter(x, y));
			break;
	}
}


module.exports = {
	generateUlam
}