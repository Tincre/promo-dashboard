import { campaignStubData } from '../cms.data';
import {
  sortCampaignDataOnIsActive,
  numActiveCampaigns,
} from '../../src/lib/sort';

describe('sortCampaignDataOnIsActive', () => {
  it('sorts data without crashing', () => {
    const sorted = sortCampaignDataOnIsActive(campaignStubData);
    expect(sorted[0].isActive).not.toBe(
      campaignStubData[campaignStubData.length - 1].isActive
    );
  });
});

describe('numActiveCampaigns', () => {
  it('returns the number of active campaigns without crashing', () => {
    const activeCampaigns = 4;
    const numActive = numActiveCampaigns(campaignStubData);
    expect(numActive).toBe(activeCampaigns);
  });
});
