import { rando } from '@nastyox/rando.js';

export function generateSpend(start, end, length = 10) {
  // generate sequence array in 10s
  const interval = Math.round((end - start) / length);
  const upperIndexBound = length - 2;
  console.log(
    `generateSpend setup: 10 $${interval} segments between ${start} and ${end} ${upperIndexBound}`
  );

  let result = new Array(length, 0);
  let lastVal;
  for (let i = 0; i < length; i += 1) {
    console.log(`generating index ${i} between ${start} and ${end}`);
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
  console.log(`generateSpend: ${JSON.stringify(result)}`);
  return result;
}
