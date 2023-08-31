import {
  now,
  generateDates,
  generateDateRange,
  generateStringDateRanges,
} from '../../src/lib/date';

describe('now', () => {
  it('returns the date timestamp right now', () => {
    const time = now();
    expect(typeof time).toBe('string');
    expect(time.length).toBe(10);
  });
});

describe('generateDates', () => {
  it('returns an array of ISO date strings', () => {
    const testLength = 10;
    const testDates = generateDates(testLength);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    const date = now();
    expect(testDates[testLength - 1]).toBe(date);
  });
  it('returns an array of ISO date strings w/custom end date', () => {
    const testLength = 10;
    const testDates = generateDates(testLength, new Date('2023-01-03'));
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect(testDates[testLength - 1]).toBe('2023-01-03');
  });
});
