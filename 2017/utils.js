const { promisify } = require('util');
const readFileAsync = promisify(require('fs').readFile);

function toNumberArray(seq, separator = '') {
	return seq.split(separator).map(n => parseInt(n, 10));
}

module.exports = {
	toNumberArray,
	readFileAsync: async filePath => await readFileAsync(filePath)
};
