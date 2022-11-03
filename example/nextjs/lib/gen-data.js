import { rando } from '@nastyox/rando.js';
function generateIntegers(start, end, length = 13) {
  // generate sequence array in 10s
  const interval = Math.round((end - start) / length);
  const upperIndexBound = length - 2;
  let result = new Array(length, 0);
  let lastVal;
  for (let i = 0; i < length; i += 1) {
    if (i < 1) {
      result[i] = start;
      lastVal = start;
    } else if (i > upperIndexBound) {
      result[i] = end;
    } else {
      const target = interval * i;
      result[i] = rando(lastVal, lastVal + target);
    }
  }
  return result;
}
export function generateClicks(start, end, length = 13) {
  const result = generateIntegers(start, end, length);
  console.log(`generateClicks: ${JSON.stringify(result)}`);
  return result;
}
export function generateSpend(start, end, length = 10) {
  const result = generateIntegers(start, end, length);
  console.log(`generateSpend: ${JSON.stringify(result)}`);
  return result;
}
