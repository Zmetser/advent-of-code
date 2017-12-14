const { assertEqual, solution } = require('./test_utils');

const indexOfMax = (arr) => arr.indexOf(Math.max.apply(null, arr));
const incIndex = (i, l) => i + 1 < l ? i + 1 : 0;

function redistributeHighest(input) {
	const maxIndex = indexOfMax(input);
	let max = input[maxIndex];

	input.splice(maxIndex, 1, 0);

	let index = maxIndex;
	do {
		index = incIndex(index, input.length);
		input.splice(index, 1, input[index] + 1);
		max--;
	} while (max);

	return input;
}

function redistribute(input, memo = []) {
	while (true) {
		const relocated = redistributeHighest(input).join('');
		if (memo.includes(relocated)) {
			memo.push(relocated);
			break;
		}
		memo.push(relocated);
	}

	return memo;
}

const task1 = (input) => redistribute(input).length;

assertEqual(() => task1([0, 2, 7, 0]), 5);
solution(task1([2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14]))

const task2 = (input) => {
	const last = redistribute(input).slice(-1)[0];
	return redistribute(input, [last]).length - 1;
}

assertEqual(() => task2([0, 2, 7, 0]), 4);
solution(task2([2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14]))