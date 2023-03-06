import {
  successToast,
  failureToast,
  infoToast,
} from '../../src/lib/notifications';

describe('successToast', () => {
  it('returns the success toast', () => {
    const toast = successToast('Success!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
});

describe('failureToast', () => {
  it('returns the failure toast', () => {
    const toast = failureToast('Failure!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
});

describe('infoToast', () => {
  it('returns the info toast', () => {
    const toast = infoToast('Info!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
});
