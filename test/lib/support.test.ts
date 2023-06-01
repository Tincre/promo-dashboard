import { getSupportLink } from '../../src/lib/support';
import { campaignStubData } from '../cms.data';

describe('getSupportLink', () => {
  it('returns the prepared email support link using defaults', () => {
    const supportLink = getSupportLink(campaignStubData[0]);
    expect(typeof supportLink).toBe('string');
    expect(supportLink).toContain('team@tincre.dev');
  });
  it('returns the prepared email support link using parameters', () => {
    const supportLink = getSupportLink(
      campaignStubData[0],
      'tincre.com',
      'team'
    );
    expect(typeof supportLink).toBe('string');
    expect(supportLink).toContain('team@tincre.com');
  });
});
