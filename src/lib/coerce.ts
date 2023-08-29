import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';
import {
  CampaignData,
  DownloadableCampaignStatsSample,
  DownloadableCampaignMetadataSample,
  CampaignStatsData,
  PromoApiCampaignStatsSample,
  PromoApiCampaignStatsData,
  CampaignDummyData,
  CampaignSortedData,
} from './types';

function generateEmptyPromoApiDataForChartJs(): {
  updatedTime: (string | null)[];
  spend: (number | string | null)[];
  reach: (number | string | null)[];
  views: (number | string | null)[];
  clicks: (number | string | null)[];
  cpc: (number | string | null)[];
  cpm: (number | string | null)[];
  ctr: (number | string | null)[];
  cpv: (number | string | null)[];
} {
  return {
    spend: [],
    reach: [],
    cpc: [],
    cpm: [],
    ctr: [],
    cpv: [],
    views: [],
    clicks: [],
    updatedTime: [],
  };
}
/*
 * @remarks
 * Return a formatted series for use with the chartDetail timeseries
 * display component with Chart.js under the hood. This should be
 * utilized for a single campaign.
 *
 * Each "series", e.g. 'totals', 'meta', 'google' or 'tiktok', should be
 * separately coerced via this function.
 */
export function coercePromoApiDataForChartJs(
  data?: PromoApiCampaignStatsSample[]
) {
  let chartJsData = generateEmptyPromoApiDataForChartJs();
  if (typeof data !== 'undefined') {
    for (let index = data.length - 1; index >= 0; index--) {
      let pckg = data[index];
      chartJsData.updatedTime.push(pckg?.updated_time?.slice(0, 10) || null);
      chartJsData.spend.push(
        typeof pckg?.spend !== 'undefined' ? pckg.spend : null
      );
      chartJsData.reach.push(
        typeof pckg?.reach !== 'undefined' ? pckg.reach : null
      );
      chartJsData.cpc.push(typeof pckg?.cpc !== 'undefined' ? pckg.cpc : null);
      chartJsData.cpm.push(typeof pckg?.cpm !== 'undefined' ? pckg.cpm : null);
      chartJsData.ctr.push(typeof pckg?.ctr !== 'undefined' ? pckg.ctr : null);
      chartJsData.cpv.push(typeof pckg?.cpv !== 'undefined' ? pckg.cpv : null);
      chartJsData.views.push(
        typeof pckg?.views !== 'undefined' ? pckg.views : null
      );
      chartJsData.clicks.push(
        typeof pckg?.clicks !== 'undefined' ? pckg.clicks : null
      );
    }
  }
  return chartJsData;
}
export function computeChange(data: (string | number | null)[]) {
  let last = data[data.length - 1];
  if (typeof last !== 'number') last = Number(last);
  if (data.length > 1) {
    let nextToLast = data[data.length - 2];
    if (typeof nextToLast !== 'number') nextToLast = Number(nextToLast);
    return nextToLast !== null ? last - nextToLast : 0;
  }
  return 0;
}
export function computeChangeType(changeAmount: number) {
  if (changeAmount !== 0) {
    return changeAmount < 0 ? 'decrease' : 'increase';
  }
  return 'same';
}
function getLatestStatValues(chartJsData: {
  updatedTime: (string | null)[];
  spend: (number | string | null)[];
  reach: (number | string | null)[];
  views: (number | string | null)[];
  clicks: (number | string | null)[];
  cpc: (number | string | null)[];
  cpm: (number | string | null)[];
  ctr: (number | string | null)[];
  cpv: (number | string | null)[];
}) {
  return {
    spendStat: `$${chartJsData.spend[chartJsData.spend.length - 1] || '0'}`,
    clickStat: `${chartJsData.clicks[chartJsData.clicks.length - 1] || '0'}`,
    viewStat: `${chartJsData.views[chartJsData.views.length - 1] || '0'}`,
    cpmStat:
      `$` +
      `${chartJsData.cpm[chartJsData.cpm.length - 1] || '0.00'}`.slice(0, 4),
    ctrStat:
      `${chartJsData.ctr[chartJsData.ctr.length - 1] || '0.00'}`.slice(0, 4) +
      '%',
    cpcStat:
      `$` +
      `${chartJsData.cpc[chartJsData.cpc.length - 1] || '0.00'}`.slice(0, 4),
    cpvStat:
      '$' +
      `${chartJsData.cpv[chartJsData.cpv.length - 1] || '0.00'}`.slice(0, 4),
  };
}
export function prepareChartData(chartJsData: {
  updatedTime: (string | null)[];
  spend: (number | string | null)[];
  reach: (number | string | null)[];
  views: (number | string | null)[];
  clicks: (number | string | null)[];
  cpc: (number | string | null)[];
  cpm: (number | string | null)[];
  ctr: (number | string | null)[];
  cpv: (number | string | null)[];
}) {
  const { spendStat, clickStat, viewStat, cpmStat, ctrStat, cpcStat, cpvStat } =
    getLatestStatValues(chartJsData);

  return [
    {
      id: 1,
      name: 'Spend',
      stat: spendStat,
      icon: CurrencyDollarIcon,
      change: computeChange(chartJsData.spend).toFixed(2),
      changeType: computeChangeType(computeChange(chartJsData.spend)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.spend,
      },
    },
    {
      id: 2,
      name: 'Clicks',
      stat: clickStat,
      icon: CursorArrowRaysIcon,
      change: computeChange(chartJsData.clicks),
      changeType: computeChangeType(computeChange(chartJsData.clicks)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.clicks,
      },
    },
    {
      id: 3,
      name: 'Views',
      stat: viewStat,
      icon: FilmIcon,
      change: computeChange(chartJsData.views),
      changeType: computeChangeType(computeChange(chartJsData.views)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.views,
      },
    },
    {
      id: 4,
      name: 'CPM',
      stat: cpmStat,
      icon: EnvelopeOpenIcon,
      change: computeChange(chartJsData.cpm).toFixed(2),
      changeType: computeChangeType(computeChange(chartJsData.cpm)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpm,
      },
    },
    {
      id: 5,
      name: 'CTR',
      stat: ctrStat,
      icon: UsersIcon,
      change: computeChange(chartJsData.ctr).toFixed(2),
      changeType: computeChangeType(computeChange(chartJsData.ctr)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.ctr,
      },
    },
    {
      id: 6,
      name: 'CPC',
      stat: cpcStat,
      icon: CursorArrowRaysIcon,
      change: computeChange(chartJsData.cpc).toFixed(2),
      changeType: computeChangeType(computeChange(chartJsData.cpc)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpc,
      },
    },
    {
      id: 7,
      name: 'CPV',
      stat: cpvStat,
      icon: VideoCameraIcon,
      change: computeChange(chartJsData.cpv).toFixed(2),
      changeType: computeChangeType(computeChange(chartJsData.cpv)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpv,
      },
    },
  ];
}

export function replaceDataParamForChartData(
  campaignsData: CampaignData[] | CampaignDummyData[]
) {
  const resultArray: CampaignSortedData[] = [];
  campaignsData.forEach((pckg) => {
    let totalsData: PromoApiCampaignStatsSample[] | undefined;
    if (!Array.isArray(pckg?.data)) {
      totalsData = pckg?.data?.totals;
    }
    resultArray.push({
      ...pckg,
      data:
        typeof totalsData !== 'undefined'
          ? prepareChartData(coercePromoApiDataForChartJs(totalsData))
          : pckg?.stats,
    });
  });

  return resultArray;
}

export function modifyMultiCampaignsDataForDownload(
  campaignsData: CampaignData[] | CampaignDummyData[]
) {
  let modifiedData: DownloadableCampaignMetadataSample[] = [];
  campaignsData.forEach((pckg) => {
    let data = modifySingleCampaignDataForDownload(pckg);
    if (typeof data !== 'undefined') {
      let { updatedTime, spend, views, clicks, cpc, cpm, ctr, cpv } =
        data[data.length - 1];
      let result = {
        pid: pckg?.pid || '',
        updatedTime: updatedTime,
        spend: spend,
        views: views,
        clicks: clicks,
        cpc: cpc,
        cpm: cpm,
        ctr: ctr,
        cpv: cpv,
        adTitle: pckg?.adTitle || '',
        creativeUrl:
          typeof pckg?.creativeUrls?.length !== 'undefined'
            ? pckg?.creativeUrls[0]
            : '',
        budget: pckg?.budget,
        target: pckg?.target,
        isActive: pckg?.isActive,
        adCallToAction: pckg?.adCallToAction,
        buttonText: pckg?.buttonText,
      };
      modifiedData.push(result);
    }
  });
  return modifiedData;
}

export function modifySingleCampaignDataForDownload(
  campaignData: CampaignData | CampaignDummyData
) {
  // @ts-ignore
  let data: CampaignStatsData[] | undefined =
    campaignData?.data || campaignData?.stats;
  let pid: string = campaignData.pid || '';
  let chartJsData = generateEmptyPromoApiDataForChartJs();
  let modifiedData: DownloadableCampaignStatsSample[] = [];
  if (typeof data !== 'undefined') {
    data.forEach((pckg: CampaignStatsData) => {
      const chartData = pckg?.chartData;
      chartJsData.updatedTime = chartData.labels;
      // @ts-ignore
      chartJsData[pckg.name.toLowerCase()] = chartData.data;
    });
    let modifiedObject = {
      ...chartJsData,
      pid,
    };
    let timestamps = modifiedObject.updatedTime;
    timestamps.forEach((timestamp, index) => {
      const mdtmp = {
        pid: pid || '',
        updatedTime: timestamp || '',
        spend: modifiedObject.spend[index],
        views: modifiedObject?.views[index],
        clicks: modifiedObject?.clicks[index],
        cpc: modifiedObject?.cpc[index],
        cpm: modifiedObject?.cpm[index],
        ctr: modifiedObject?.ctr[index],
        cpv: modifiedObject?.cpv[index],
      };
      modifiedData.push(mdtmp);
    });
    return modifiedData;
  }
}
