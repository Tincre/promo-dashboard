import {
  successToast,
  failureToast,
  infoToast,
  copyToast,
} from '../../src/lib/notifications';

describe('successToast', () => {
  it('returns the success toast', () => {
    const toast = successToast('Success!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
  it('returns the custom success toast', () => {
    const toast = successToast('Success!', 'blah');
    expect(toast).toBeTruthy();
  });
});

describe('failureToast', () => {
  it('returns the failure toast', () => {
    const toast = failureToast('Failure!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
  it('returns the custom failure toast', () => {
    const toast = failureToast('Failure!', 'blah');
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
  it('returns the custom info toast', () => {
    const toast = infoToast('Info!', 'blah');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
});
describe('copyToast', () => {
  it('returns the default copy toast', () => {
    const toast = copyToast('Info!');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
  it('returns the custom copy toast', () => {
    const toast = copyToast('Info!', 'blah');
    expect(toast).toBeTruthy();
    expect(typeof toast).toBe('string');
  });
});
