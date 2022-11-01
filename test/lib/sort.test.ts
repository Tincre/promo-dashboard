import { campaignStubData } from '../cms.data';
import { sortCampaignDataOnIsActive } from '../../src/lib/sort';

describe('sortCampaignDataOnIsActive', () => {
  it('sorts data without crashing', () => {
    const sorted = sortCampaignDataOnIsActive(campaignStubData);
    expect(sorted[0].isActive).not.toBe(
      campaignStubData[campaignStubData.length - 1].isActive
    );
  });
});
