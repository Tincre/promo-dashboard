import { CampaignData } from './types';

export function sortCampaignDataOnIsActive(data: CampaignData[]) {
  let newArray = data.sort((campaign: CampaignData) =>
    campaign?.isActive ? -1 : 1
  );
  return newArray;
}
