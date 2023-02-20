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
