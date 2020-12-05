import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[][] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day5.txt'), { encoding: 'utf-8' })
    .split('\n').map(r => r.split(''));

function coordinate(pass: string[], lowr: string, max: number): number {
  return pass.reduce((acc, n) => {
    // number of seats in the reduced range
    const range = (acc[1] - acc[0]) / 2;
    return (n === lowr) ?
      // calculate upper bound
      [acc[0], acc[0] + Math.floor(range)] :
      // calculate lower bound
      [acc[1] - Math.ceil(range), acc[1]];
  }, [0, max])[1];
}

const allSeats = input.map(pass => {
  const row = coordinate(pass.slice(0, 7), 'F', 127);
  const col = coordinate(pass.slice(7), 'L', 7);
  return [row, col];
});

const seatsInRowOrder = allSeats.sort((a, b) => a[0] - b[0]);

const rowWithAGap = (() => {
  for (let i = 5; i < seatsInRowOrder.length; i = i + 8) {
    // find the row with one less seat
    if (seatsInRowOrder[i][0] !== seatsInRowOrder[i + 7][0]) {
      return seatsInRowOrder.slice(i, i + 8);
    }
  }
})();

if (rowWithAGap) {
  const seatNextToMe = rowWithAGap.find((seat, i, rows) => rows[i + 1][1] !== seat[1]);
  if (seatNextToMe) {
    const mySeat = [seatNextToMe[0], seatNextToMe[1] + 1];
    console.log(mySeat[0] * 8 + mySeat[1]);
  }

}