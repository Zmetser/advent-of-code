const fs = require('fs');

const { assertEqual, solution } = require('./test_utils');
const { readFileAsync, toNumberArray } = require('./utils');

(async function () {
	const input = await readFileAsync('./inputs/day_5.txt', 'utf8')
		.then((data) => toNumberArray(data.toString(), '\n'));

	function jump(instructions) {
		let jumps = 0;
		let currentIndex = 0;
		let offset = instructions[currentIndex];
		while (undefined !== offset) {
			instructions.splice(currentIndex, 1, offset + 1)
			currentIndex += offset;
			jumps += 1;
			offset = instructions[currentIndex];
		}

		return jumps;
	}

	assertEqual(() => jump([0, 0]), 4);
	assertEqual(() => jump([1, 1, -2]), 6);
	assertEqual(() => jump([0, 3, 0, 1, -3]), 5);

	solution(jump(input));

}())