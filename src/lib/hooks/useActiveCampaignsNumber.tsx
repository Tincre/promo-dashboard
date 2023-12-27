import { useState, useEffect } from 'react';
import { numActiveCampaigns } from '../sort';
import { CampaignSortedData } from '@tincre/promo-types';

/**
 * useActiveCampaignsNumber
 * @description A hook to return the number of active campaigns.
 */
export function useActiveCampaignsNumber(
  sortedCampaignsData: CampaignSortedData[],
  deletedCampaigns: string[]
) {
  const [numberOfActiveCampaigns, setNumberOfActiveCampaigns] = useState<
    number | undefined
  >();
  useEffect(() => {
    if (sortedCampaignsData?.length) {
      setNumberOfActiveCampaigns(
        numActiveCampaigns(sortedCampaignsData, deletedCampaigns)
      );
    }
  }, [sortedCampaignsData, deletedCampaigns]);
  return numberOfActiveCampaigns;
}
