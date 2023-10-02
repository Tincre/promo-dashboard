import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignsChart } from '../../src/components/CampaignsChart';
import { campaignStubData } from '../cms.data';
import { options } from '../../src/lib/options';
import {
  mockAllIsIntersecting,
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';

window.scrollTo = jest.fn();

beforeEach(() => {
  setupIntersectionMocking(jest.fn);
});
afterEach(() => {
  resetIntersectionMocking();
});
afterAll(() => {
  jest.clearAllMocks();
});

describe('CampaignsChart', () => {
  it('renders full data without crashing', () => {
    mockAllIsIntersecting(true);
    render(
      <CampaignsChart
        timePeriods={options.timePeriods}
        selectedChartButton="1 month"
        statsHighlightTimeseries={campaignStubData[0].stats[0]}
        handleChartButtonOnClick={() => null}
      />
    );
    const campaignsTableItem = screen.getByText(campaignStubData[0].pid);
    expect(campaignsTableItem).toBeDefined();
    fireEvent.click(campaignsTableItem);
  });
});
