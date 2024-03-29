import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';
import { generateStringDateRanges } from './date';
import { getIconForMetric } from './metricsDisplay';
import {
  CampaignData,
  DownloadableCampaignStatsSample,
  DownloadableCampaignMetadataSample,
  CampaignStatsData,
  PromoApiCampaignStatsSample,
  CampaignDummyData,
  CampaignSortedData,
  CampaignMetrics,
} from '@tincre/promo-types';

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
  let result: number;
  if (typeof last !== 'number') last = Number(last);
  if (data.length > 1) {
    let nextToLast = data[data.length - 2];
    if (typeof nextToLast !== 'number') nextToLast = Number(nextToLast);
    result = nextToLast !== null ? last - nextToLast : 0;
    return Number.isNaN(result) ? 0 : result;
  }
  return 0;
}
export function computeChangeType(
  changeAmount: number,
  isOpposite: boolean = false
) {
  if (changeAmount !== 0) {
    if (!isOpposite) {
      return changeAmount < 0 ? 'decrease' : 'increase';
    }
    return changeAmount < 0 ? 'increase' : 'decrease';
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
      changeType: computeChangeType(computeChange(chartJsData.cpm), true),
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
      changeType: computeChangeType(computeChange(chartJsData.cpc), true),
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
      changeType: computeChangeType(computeChange(chartJsData.cpv), true),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpv,
      },
    },
  ];
}
/*
 * Return the value of the chartData.data parameter at the given ISO date string.
 */
function getChartDataValueAtDate(pckg: CampaignStatsData, date: string) {
  return pckg.chartData.data[pckg.chartData.labels.indexOf(date)];
}
/*
 * Given some value cast it to a Number, no matter what.
 */
function castChartDataValueToNumber(value: string | number | null) {
  if (typeof value !== 'number') {
    if (typeof value !== 'string') {
      return 0;
    }
    return Number(value);
  }
  return value;
}

/* Given a metric and campaign data, return the aggregated value of that metric
 * for the given data.
 *
 */
export function aggregateChartData(
  campaignsData: CampaignSortedData[],
  metric?: CampaignMetrics,
  id?: number
): CampaignStatsData {
  let dates: string[] = [];
  campaignsData.forEach((pckg: CampaignSortedData) => {
    const { data } = pckg;
    if (typeof data !== 'undefined') {
      data.forEach((metricData) => {
        metricData.chartData.labels.forEach((date) => {
          if (date !== null) {
            dates.push(date);
          }
        });
      });
    }
  });
  let uniqueDates = Array.from(new Set([...dates])).sort();
  // get full dates for time length selected
  let allDates = generateStringDateRanges(
    uniqueDates[0],
    uniqueDates[uniqueDates.length - 1],
    true
  );
  // loop through each date in allDates via
  // loop through each campaign in campaignsData w/truthy isActive
  // loop through metric in campaignsData, for each campaign
  // if matched in uniqueDates, aggregate metric
  let localMetric = metric || 'Spend';
  let localId = id || 0;
  let spendWeightedMetrics = ['CPC', 'CPM', 'CTR', 'CPV'];
  let aggregateChartData: {
    labels: string[];
    data: number[];
  } = {
    labels: allDates,
    data: new Array(allDates.length).fill(0),
  };
  allDates.forEach((date, index) => {
    let dateIndex = uniqueDates.indexOf(date);

    if (dateIndex > -1) {
      let totalSpend: number = 0;

      campaignsData.forEach((dailyCampaignData) => {
        if (typeof dailyCampaignData?.data?.length !== 'undefined') {
          dailyCampaignData?.data.forEach((pckg) => {
            if (pckg.name === 'Spend') {
              let value = getChartDataValueAtDate(pckg, date);
              if (value) {
                totalSpend += castChartDataValueToNumber(value);
              }
            }
          });
        }
      });
      campaignsData.forEach((dailyCampaignData) => {
        let dailyCampaignSpend: number = 0;
        let spendProportion = 0;

        if (typeof dailyCampaignData?.data?.length !== 'undefined') {
          dailyCampaignData?.data?.forEach((pckg) => {
            if (pckg.name === 'Spend') {
              let value = getChartDataValueAtDate(pckg, date);
              dailyCampaignSpend += castChartDataValueToNumber(value);
              if (value) {
                spendProportion = !totalSpend
                  ? 0
                  : dailyCampaignSpend / totalSpend;
              }
            }
          });
          dailyCampaignData?.data.forEach((pckg) => {
            if (pckg.name === localMetric) {
              let value = getChartDataValueAtDate(pckg, date);
              if (value) {
                value = castChartDataValueToNumber(value);
                if (spendWeightedMetrics.includes(localMetric)) {
                  aggregateChartData.data[index] += value * spendProportion;
                } else {
                  aggregateChartData.data[index] +=
                    castChartDataValueToNumber(value);
                }
              }
            }
          });
        }
      });
    }
  });
  let change = computeChange([
    aggregateChartData.data[aggregateChartData.data.length - 2],
    aggregateChartData.data[aggregateChartData.data.length - 1],
  ]);
  return {
    id: localId,
    name: localMetric,
    stat: `${aggregateChartData.data[aggregateChartData.data.length - 1]}`,
    icon: getIconForMetric(localMetric),
    change: change.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }),
    changeType: computeChangeType(
      change,
      ['CPC', 'CPV', 'CPM'].includes(localMetric)
    ),
    chartData: { ...aggregateChartData },
  };
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
          : pckg?.stats || (pckg?.data as CampaignStatsData[]),
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
