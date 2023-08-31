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

describe('generateDateRange', () => {
  it('returns an array of Date objects', () => {
    const testStart = '2023-01-01';
    const testEnd = '2023-01-03';
    const testStartDate = new Date(testStart);
    const testEndDate = new Date(testEnd);
    const testLength = 2;
    const testDates = generateDateRange(testStartDate, testEndDate);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect((testDates[0] as Date).toISOString().slice(0, 10)).toBe(testStart);
  });
  it('returns an array of Date objects including the end date', () => {
    const testStart = '2023-01-01';
    const testEnd = '2023-01-03';
    const testStartDate = new Date(testStart);
    const testEndDate = new Date(testEnd);
    const testLength = 3;
    const testDates = generateDateRange(testStartDate, testEndDate, true);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect((testDates[0] as Date).toISOString().slice(0, 10)).toBe(testStart);
    expect(
      (testDates[testDates.length - 1] as Date).toISOString().slice(0, 10)
    ).toBe(testEnd);
  });
});

describe('generateStringDateRanges', () => {
  it('returns an array of string ISO dates', () => {
    const testStart = now();
    const testLength = 1;
    const testDates = generateStringDateRanges(testStart);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect(testDates[0]).toBe(testStart);
  });
  it('returns an array of string ISO dates including end date', () => {
    const testStart = '2023-01-01';
    const testEnd = '2023-01-03';
    const testLength = 2;
    const testDates = generateStringDateRanges(testStart, testEnd);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect(testDates[0]).toBe(testStart);
  });
  it('returns an array of Date objects including the end date', () => {
    const testStart = '2023-01-01';
    const testEnd = '2023-01-03';
    const testLength = 3;
    const testDates = generateStringDateRanges(testStart, testEnd, true);
    expect(Array.isArray(testDates)).toBe(true);
    expect(testDates.length).toBe(testLength);
    expect(testDates[0]).toBe(testStart);
    expect(testDates[testDates.length - 1]).toBe(testEnd);
  });
});
