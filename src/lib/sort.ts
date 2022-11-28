import { CampaignData } from './types';

export function sortCampaignDataOnIsActive(data: CampaignData[]) {
  let newArray = data.sort((campaign: CampaignData) =>
    campaign?.isActive ? -1 : 1
  );
  return newArray;
}

export const numActiveCampaigns = (sortedCampaignsData: CampaignData[]) => {
  let activeCampaigns = 0;
  sortedCampaignsData.map((campaign) =>
    campaign.isActive ? (activeCampaigns += 1) : null
  );
  return activeCampaigns;
};
