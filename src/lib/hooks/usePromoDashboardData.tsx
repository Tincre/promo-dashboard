import { useState, useEffect } from 'react';
import {
  CampaignData,
  CampaignDummyData,
  CampaignStatsData,
  CampaignSortedData,
} from '@tincre/promo-types';
import { sortCampaignDataOnIsActiveAndReceiptIdByDate } from '../sort';
import { replaceDataParamForChartData, aggregateChartData } from '../coerce';
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
  const [statsCampaignsData, setStatsCampaignsData] = useState<
    CampaignStatsData[] | undefined
  >();

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
  useEffect(() => {
    // set initial timeseries aggregated data
    if (typeof sortedCampaignsData !== 'undefined') {
      let localStats: CampaignStatsData[] = [];
      ['Spend', 'Views', 'Clicks', 'CPM', 'CPC', 'CTR', 'CPV'].forEach(
        (metric, index) => {
          localStats.push(
            aggregateChartData(sortedCampaignsData, metric, index)
          );
        }
      );
      setStatsCampaignsData(localStats);
    }
  }, [sortedCampaignsData]);
  return { sortedCampaignsData, statsCampaignsData, numberOfActiveCampaigns };
}
