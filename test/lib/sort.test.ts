import { campaignStubData } from '../cms.data';
import {
  sortCampaignDataOnIsActive,
  sortCampaignDataOnIsActiveAndReceiptId,
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

describe('sortCampaignDataOnIsActiveAndReceiptId', () => {
  it('sorts data without crashing', () => {
    const sorted = sortCampaignDataOnIsActiveAndReceiptId(campaignStubData);
    expect(sorted[0].isActive).not.toBe(
      campaignStubData[campaignStubData.length - 1].isActive
    );
    expect(sorted[0].receiptId).toBe(campaignStubData[0].receiptId);
    expect(sorted[campaignStubData.length - 1].receiptId).toBe(
      campaignStubData[campaignStubData.length - 1].receiptId
    );
  });
});

describe('numActiveCampaigns', () => {
  it('returns the number of active campaigns without crashing', () => {
    const activeCampaigns = 4;
    const numActive = numActiveCampaigns(campaignStubData);
    expect(numActive).toBe(activeCampaigns);
  });
  it('returns the number of active campaigns without crashing with exclusions', () => {
    const activeCampaigns = 3;
    const numActive = numActiveCampaigns(campaignStubData, [
      campaignStubData[1].pid,
    ]);
    expect(numActive).toBe(activeCampaigns);
  });
});
