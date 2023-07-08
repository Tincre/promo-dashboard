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
  data?: {
    updated_time?: string;
    spend?: number;
    reach?: number;
    views?: number;
    clicks?: number;
    cpc?: number;
    ctr?: number;
    cpm?: number;
    cpv?: number;
  }[]
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
  return changeAmount < 0 ? 'decrease' : 'increase';
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
  return [
    {
      id: 1,
      name: 'Spend',
      stat: `$${chartJsData.spend[chartJsData.spend.length - 1] || '0'}`,
      icon: CurrencyDollarIcon,
      change: computeChange(chartJsData.spend),
      changeType: computeChangeType(computeChange(chartJsData.spend)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.spend,
      },
    },
    {
      id: 2,
      name: 'Clicks',
      stat: `${chartJsData.clicks[chartJsData.clicks.length - 1] || '0'}`,
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
      stat: `${chartJsData.views[chartJsData.views.length - 1] || '0'}`,
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
      stat: `$${chartJsData.cpm[chartJsData.cpm.length - 1] || '0'}`,
      icon: EnvelopeOpenIcon,
      change: computeChange(chartJsData.cpm),
      changeType: computeChangeType(computeChange(chartJsData.cpm)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpm,
      },
    },
    {
      id: 5,
      name: 'CTR',
      stat: `${chartJsData.ctr[chartJsData.ctr.length - 1] || '0'}%`,
      icon: UsersIcon,
      change: computeChange(chartJsData.ctr),
      changeType: computeChangeType(computeChange(chartJsData.ctr)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.ctr,
      },
    },
    {
      id: 6,
      name: 'CPC',
      stat: `$${chartJsData.cpc[chartJsData.cpc.length - 1] || '0'}`,
      icon: CursorArrowRaysIcon,
      change: computeChange(chartJsData.cpc),
      changeType: computeChangeType(computeChange(chartJsData.cpc)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpc,
      },
    },
    {
      id: 7,
      name: 'CPV',
      stat: `$${chartJsData.cpv[chartJsData.cpv.length - 1] || '0'}`,
      icon: VideoCameraIcon,
      change: computeChange(chartJsData.cpv),
      changeType: computeChangeType(computeChange(chartJsData.cpv)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpv,
      },
    },
  ];
}

export function replaceDataParamForChartData(campaignsData: CampaignData[]) {
  const resultArray: CampaignData[] = [];
  campaignsData.forEach((pckg) => {
    resultArray.push({
      ...pckg, // @ts-ignore
      data: pckg?.data?.totals
        ? prepareChartData(
            // @ts-ignore
            coercePromoApiDataForChartJs(pckg.data.totals)
          )
        : pckg?.data || pckg?.stats,
    });
  });

  return resultArray;
}

export function modifyMultiCampaignsDataForDownload(
  campaignsData: CampaignData[]
) {
  let modifiedData: DownloadableCampaignMetadataSample[] = [];
  campaignsData.forEach((pckg) => {
    let data = modifySingleCampaignDataForDownload(pckg);
    if (typeof data !== 'undefined') {
      let { updatedTime, spend, views, clicks, cpc, cpm, ctr, cpv } = data[0];
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
  campaignData: CampaignData
) {
  let data: CampaignStatsData[] | undefined =
    campaignData?.data || campaignData?.stats;
  let pid: string[] = [];
  let chartJsData = generateEmptyPromoApiDataForChartJs();
  let modifiedData: DownloadableCampaignStatsSample[] = [];
  if (typeof data !== 'undefined') {
    data.forEach((pckg: CampaignStatsData) => {
      const chartData = pckg?.chartData;
      chartJsData.updatedTime = chartData.labels;
      pid.push(campaignData.pid || '');
      if (pckg.name === 'Spend') {
        chartJsData.spend = chartData.data;
        return;
      }
      if (pckg.name === 'Reach') {
        chartJsData.reach = chartData.data;
        return;
      }
      if (pckg.name === 'Views') {
        chartJsData.views = chartData.data;
        return;
      }
      if (pckg.name === 'Clicks') {
        chartJsData.clicks = chartData.data;
        return;
      }
      if (pckg.name === 'CPC') {
        chartJsData.cpc = chartData.data;
        return;
      }
      if (pckg.name === 'CPM') {
        chartJsData.cpm = chartData.data;
        return;
      }
      if (pckg.name === 'CTR') {
        chartJsData.ctr = chartData.data;
        return;
      }
      if (pckg.name === 'CPV') {
        chartJsData.cpv = chartData.data;
        return;
      }
    });
    let modifiedObject = {
      ...chartJsData,
      pid,
    };

    pid.forEach((pid, index) => {
      modifiedData.push({
        pid: pid,
        updatedTime: modifiedObject.updatedTime[index] || '',
        spend: modifiedObject.spend[index],
        views: modifiedObject?.views[index],
        clicks: modifiedObject?.clicks[index],
        cpc: modifiedObject?.cpc[index],
        cpm: modifiedObject?.cpm[index],
        ctr: modifiedObject?.ctr[index],
        cpv: modifiedObject?.cpv[index],
      });
    });
    return modifiedData;
  }
}
