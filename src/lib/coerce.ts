import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
function generateEmptyPromoApiDataForChartJs(): {
  updatedTime: (string | null)[];
  spend: (number | null)[];
  reach: (number | null)[];
  views: (number | null)[];
  clicks: (number | null)[];
  cpc: (number | null)[];
  cpm: (number | null)[];
  ctr: (number | null)[];
  cpv: (number | null)[];
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
    data.forEach((pckg) => {
      chartJsData.updatedTime.push(pckg?.updated_time || null);
      chartJsData.spend.push(pckg?.spend || null);
      chartJsData.reach.push(pckg?.reach || null);
      chartJsData.cpc.push(pckg?.cpc || null);
      chartJsData.cpm.push(pckg?.cpm || null);
      chartJsData.ctr.push(pckg?.ctr || null);
      chartJsData.cpv.push(pckg?.cpv || null);
      chartJsData.views.push(pckg?.views || null);
      chartJsData.clicks.push(pckg?.clicks || null);
    });
  }
  return chartJsData;
}
export function computeChange(data: (number | null)[]) {
  let last = data[data.length - 1];
  if (length > 1) {
    let nextToLast = data[data.length - 2];
    if (last !== null) {
      return nextToLast !== null ? last - nextToLast : 0;
    }
  }
  return 0;
}
export function computeChangeType(changeAmount: number) {
  return changeAmount < 0 ? 'decrease' : 'increase';
}
export function prepareChartData(chartJsData: {
  updatedTime: (string | null)[];
  spend: (number | null)[];
  reach: (number | null)[];
  views: (number | null)[];
  clicks: (number | null)[];
  cpc: (number | null)[];
  cpm: (number | null)[];
  ctr: (number | null)[];
  cpv: (number | null)[];
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
      stat: `$${chartJsData.clicks[chartJsData.clicks.length - 1] || '0'}`,
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
      stat: `$${chartJsData.views[chartJsData.views.length - 1] || '0'}`,
      icon: CursorArrowRaysIcon,
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
      stat: `$${chartJsData.ctr[chartJsData.ctr.length - 1] || '0'}`,
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
      icon: CursorArrowRaysIcon,
      change: computeChange(chartJsData.cpv),
      changeType: computeChangeType(computeChange(chartJsData.cpv)),
      chartData: {
        labels: chartJsData.updatedTime,
        data: chartJsData.cpv,
      },
    },
  ];
}
