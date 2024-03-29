import { rando } from '@nastyox/rando.js';

function generateIntegers(start: number, end: number, length: number = 13) {
  // generate sequence array in 10s
  const interval = Math.round((end - start) / length);
  const upperIndexBound = length - 2;
  let result = [length, 0];
  let lastVal: number = start;
  for (let i = 0; i < length; i += 1) {
    if (i < 1) {
      result[i] = start;
    } else if (i > upperIndexBound) {
      result[i] = end;
    } else {
      const target = interval * i;
      result[i] = rando(lastVal, lastVal + target);
    }
  }
  return result;
}
export function generateClicks(
  start: number,
  end: number,
  length: number = 13
) {
  const result = generateIntegers(start, end, length);
  return result;
}
export function generateSpend(start: number, end: number, length: number = 10) {
  const result = generateIntegers(start, end, length);
  return result;
}
