import { useState, useEffect } from 'react';
import {
  CampaignData,
  CampaignDummyData,
  CampaignSortedData,
} from '@tincre/promo-types';
import { sortCampaignDataOnIsActiveAndReceiptIdByDate } from '../sort';
import { replaceDataParamForChartData } from '../coerce';
import { numActiveCampaigns } from '../sort';

/**
 * usePromoDashboardData
 * @description A React hook that returns the sorted dashboard data and number of active campaigns.
 */
export function usePromoDashboardData(
  campaignsData: CampaignData[] | CampaignDummyData[],
  deletedCampaigns: string[]
) {
  const [numberOfActiveCampaigns, setNumberOfActiveCampaigns] = useState<
    number | undefined
  >();
  const [sortedCampaignsData, setSortedCampaignsData] = useState<
    CampaignSortedData[]
  >([]);
  useEffect(() => {
    if (typeof campaignsData !== 'undefined') {
      setSortedCampaignsData(
        replaceDataParamForChartData(
          sortCampaignDataOnIsActiveAndReceiptIdByDate(campaignsData)
        )
      );
    }
  }, [campaignsData]);
  useEffect(() => {
    if (sortedCampaignsData?.length) {
      setNumberOfActiveCampaigns(
        numActiveCampaigns(sortedCampaignsData, deletedCampaigns)
      );
    }
  }, [sortedCampaignsData, deletedCampaigns]);
  return { sortedCampaignsData, numberOfActiveCampaigns };
}
