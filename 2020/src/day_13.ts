const [departure, busIds] = [
  1000507,
  '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,631,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,23,x,x,x,x,x,x,x,383,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17'
];

const buses = busIds.split(',').filter(bus => bus !== 'x').map(Number);

const res = buses.reduce((acc, travelTime) => {
  const waitTime = travelTime - (departure % travelTime);
  return (waitTime < acc[0]) ? [waitTime, travelTime] : acc;
}, [departure, 0]);

console.log(res[0] * res[1]);