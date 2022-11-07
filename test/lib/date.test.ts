import { now } from '../../src/lib/date';

describe('now', () => {
  it('returns the date timestamp right now', () => {
    const time = now();
    expect(typeof time).toBe('string');
    expect(time.length).toBe(10);
  });
});
