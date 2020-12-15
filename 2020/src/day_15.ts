const memo = new Map<number, number[]>();

memo.set(20, [1]);
memo.set(9, [2]);
memo.set(11, [3]);
memo.set(0, [4]);
memo.set(1, [5]);
memo.set(2, [6]);
let prev = 2;

const l = 30000000;
for (let i = memo.size; i <= l; i++) {
  if (i % (l / 100 ) === 0) {
    console.log(Math.round(i / l * 100) + '%', 'mem used:', memo.size);
  }
  const occurances =  memo.get(prev);
  const isNew = occurances?.length === 1 && occurances[0] === i - 1;
  if (isNew) {
    prev = 0;
  } else {
    prev = occurances ? occurances[occurances?.length - 1] - occurances[occurances?.length - 2] : -1;
  }
  const prevOccurance = (memo.get(prev) || []).slice(-1);
  memo.set(prev, prevOccurance.concat([i]));

  if (i === 2020) {
    console.log('part 1:', prev);
  }
}

console.log('part 2:', prev);