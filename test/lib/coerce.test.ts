import { testPromoApiCampaignData, campaignStubData } from '../cms.data';
import {
  coercePromoApiDataForChartJs,
  prepareChartData,
  replaceDataParamForChartData,
} from '../../src/lib/coerce';

describe('coercePromoApiDataForChartJs', () => {
  it('coerces data without crashing', () => {
    const coerced = coercePromoApiDataForChartJs(
      testPromoApiCampaignData[0].data.totals
    );
    expect(coerced.updatedTime[coerced.updatedTime.length - 1]).toBe(
      '2023-07-20'
    );
  });
});

describe('prepareChartData', () => {
  it('prepars data without crashing', () => {
    const coerced = coercePromoApiDataForChartJs(
      testPromoApiCampaignData[0].data.totals
    );
    const prepared = prepareChartData(coerced);
    expect(prepared.length).toBe(7);
    const spend = prepared[0];
    expect(spend.id).toBe(1);
    expect(spend.name).toBe('Spend');
    expect(spend.change).toBe('598.44');
    expect(spend.chartData.labels.length > 0).toBeTruthy();
  });
});

describe('prepareChartData', () => {
  it('prepars data without crashing', () => {
    const replaced = replaceDataParamForChartData(campaignStubData);
    expect(replaced.length > 0).toBeTruthy();
  });
});
