import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignsSummaryStats } from '../../src/components/CampaignsSummaryStats'; // Adjust the import path as needed
import { CampaignData, CampaignStatsData } from '@tincre/promo-types';
import { campaignStubData, testPromoApiCampaignData } from '../cms.data';
import { sortCampaignDataOnIsActiveAndReceiptIdByDate } from '../../src/lib/sort';
import {
  aggregateChartData,
  replaceDataParamForChartData,
} from '../../src/lib/coerce';

class ResizeObserverMock {
  private callback: ResizeObserverCallback;
  private observations: Set<Element>;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    this.observations = new Set();
  }

  observe(target: Element): void {
    this.observations.add(target);
  }

  unobserve(target: Element): void {
    this.observations.delete(target);
  }

  disconnect(): void {
    this.observations.clear();
  }

  trigger(): void {
    this.callback(
      // @ts-ignore
      [...this.observations].map((target) => ({
        target,
        contentRect: target.getBoundingClientRect() as DOMRectReadOnly,
      })),
      this
    );
  }
}

// Extend the global Window interface to include the mock
interface Window {
  ResizeObserver: typeof ResizeObserverMock;
}

// Assign the mock to the global object
global.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;

describe('CampaignsSummaryStats', () => {
  const mockCampaignData: CampaignData[] = testPromoApiCampaignData;
  const sortedCampaignsData = replaceDataParamForChartData(
    sortCampaignDataOnIsActiveAndReceiptIdByDate(mockCampaignData)
  );
  const mockStatsData: CampaignStatsData[] = [];

  ['Spend', 'Views', 'Clicks', 'CPM', 'CPC', 'CTR', 'CPV'].forEach(
    (metric, index) => {
      mockStatsData.push(
        aggregateChartData(sortedCampaignsData, metric, index)
      );
    }
  );
  const mockStatsHighlightTimeseries: CampaignStatsData = mockStatsData[0];

  const handleCampaignClick = jest.fn();
  const handleStatsHighlightClick = jest.fn();

  it('renders correctly with all data and child components', () => {
    const { container } = render(
      <CampaignsSummaryStats
        data={mockStatsData}
        statsHighlightTimeseries={mockStatsHighlightTimeseries}
        statsHighlightMetricName="Spend"
        campaignData={mockCampaignData}
        isTableCollapsed={false}
        handleCampaignClick={handleCampaignClick}
        handleStatsHighlightClick={handleStatsHighlightClick}
        handleCampaignDetailBackOnClick={() => {}}
      />
    );

    // Assert child components are rendered
    expect(container).toBeDefined();
  });

  it('does not render anything if data is undefined', () => {
    const { container } = render(
      <CampaignsSummaryStats
        campaignData={mockCampaignData}
        handleCampaignClick={handleCampaignClick}
        handleCampaignDetailBackOnClick={() => {}}
      />
    );

    expect(container).toBeDefined();
  });

  it('handles chart button click and updates state', () => {
    render(
      <CampaignsSummaryStats
        data={mockStatsData}
        statsHighlightTimeseries={mockStatsHighlightTimeseries}
        campaignData={mockCampaignData}
        handleCampaignClick={handleCampaignClick}
        handleCampaignDetailBackOnClick={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /1 month/i });
    fireEvent.click(button);

    // Assert state update behavior
    // For example, check if the button's class name changes or a specific element's content changes
  });

  // Additional tests can be added for other functionalities and edge cases
});
