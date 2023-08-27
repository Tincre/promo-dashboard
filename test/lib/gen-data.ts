import { rando } from '@nastyox/rando.js';

export function generateCPC(start: number, end: number, length: number = 13) {
  const result = generateFloats(start, end, length);
  return result;
}

export function generateCTR(start: number, end: number, length: number = 13) {
  const result = generateFloats(start, end, length);
  return result;
}

export function generateCPM(start: number, end: number, length: number = 13) {
  const result = generateFloats(start, end, length);
  return result;
}

export function generateViews(start: number, end: number, length: number = 13) {
  const result = generateIntegers(start, end, length);
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

function generateFloats(start: number, end: number, length: number = 13) {
  // generate sequence array in 10s
  const interval: number = (end - start) / length;
  const upperIndexBound: number = length - 2;
  let result: number[] = [length, 0];
  let lastVal: number = start;
  for (let i = 0; i < length; i += 1) {
    if (i < 1) {
      result[i] = start;
    } else if (i > upperIndexBound) {
      result[i] = end;
    } else {
      const target = interval * i;
      result[i] = rando(lastVal, lastVal + target, 'float');
    }
  }
  return result;
}
/* https://stackoverflow.com/a/70064391/5369706
 */
export function generateDateRange(
  startDate: Date,
  endDate?: Date,
  includeEndDate?: boolean
) {
  const dates = [];
  const currentDate = startDate;
  if (typeof endDate === 'undefined') endDate = new Date();
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
}

export function generateDates(length: number, endDate?: Date) {
  const dates: string[] = [];
  const currentDate = endDate || new Date();
  for (let i: number = length; i > 0; i--) {
    let tmpDate = new Date(currentDate);
    dates.push(tmpDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return dates.reverse();
}
