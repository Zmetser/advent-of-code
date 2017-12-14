function toNumberArray(seq, separator = '') {
  return seq.split(separator).map(n => parseInt(n, 10));
}

module.exports = {
  toNumberArray
}