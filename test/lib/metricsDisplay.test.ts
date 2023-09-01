import { getIconForMetric } from '../../src/lib/metricsDisplay';

describe('metricsDisplay', () => {
  it('returns the icon given a metric', () => {
    const metric = 'Spend';
    const testIcon = getIconForMetric(metric);
    expect(testIcon).toBeDefined();
  });
});
