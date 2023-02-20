import { testPromoApiTimeseriesData } from '../cms.data';
import { coercePromoApiDataForChartJs } from '../../src/lib/coerce';

describe('coercePromoApiDataForChartJs', () => {
  it('coerces data without crashing', () => {
    const coerced = coercePromoApiDataForChartJs(
      testPromoApiTimeseriesData.data.totals
    );
    expect(coerced.updatedTime[0]).toBe('2023-02-19 14:40:40.002385+00:00');
  });
});
