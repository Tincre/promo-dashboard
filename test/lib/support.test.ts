import { getSupportLink } from '../../src/lib/support';
import { campaignStubData } from '../cms.data';

describe('getSupportLink', () => {
  it('returns the prepared email support link', () => {
    const supportLink = getSupportLink(campaignStubData[0]);
    expect(typeof supportLink).toBe('string');
  });
});
