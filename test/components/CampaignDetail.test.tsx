import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { CampaignDetail } from '../../src/components/CampaignDetail';
import { campaignStubData, testPromoApiCampaignData } from '../cms.data';
import {
  CampaignData,
  CampaignStatsData,
  CampaignMetrics,
} from '@tincre/promo-types'; // Update the import path as needed
import { sortCampaignDataOnIsActiveAndReceiptIdByDate } from '../../src/lib/sort';
import {
  aggregateChartData,
  replaceDataParamForChartData,
} from '../../src/lib/coerce';

global.ResizeObserver = require('resize-observer-polyfill');

// Mocking named exports
jest.mock('../../src/components/Button', () => {
  return {
    Button: ({ children, onClick, className, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  };
});
jest.mock('../../src/components/StatsHighlights', () => {
  return {
    StatsHighlights: ({ ...props }) => (
      <div data-testid="stats-highlights" {...props}>
        StatsHighlights
      </div>
    ),
  };
});
jest.mock('../../src/components/CampaignImageChart', () => {
  return {
    CampaignImageChart: ({ ...props }) => (
      <div data-testid="campaign-image-chart" {...props}>
        CampaignImageChart
      </div>
    ),
  };
});
jest.mock('../../src/components/DownloadButton', () => {
  return {
    DownloadCampaignButton: ({ campaignData }: any) => (
      <button data-testid="download-button">Download</button>
    ),
  };
});

jest.mock('../../src/lib/notifications', () => ({
  copyToast: jest.fn(),
  failureToast: jest.fn(),
}));
describe('CampaignDetail', () => {
  const mockData: CampaignData = {
    pid: '123',
    adTitle: 'Sample Campaign',
    // ... other data
  };
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
  const mockMetrics: CampaignMetrics = 'Spend';
  const handleBackClick = jest.fn();
  const handleStatsClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });
  it('renders without crashing', () => {
    render(
      <CampaignDetail
        data={campaignStubData[0]}
        statsHighlightMetricName={campaignStubData[0].stats[0].name}
        statsHighlightTimeseries={campaignStubData[0].stats[0]}
        handleCampaignDetailBackOnClick={() => null}
      />
    );
    const campaignDetail = screen.getByText(`${campaignStubData[0].pid}`);
    expect(campaignDetail).toBeDefined();
  });

  it('renders the component with data', () => {
    render(
      <CampaignDetail
        data={mockData}
        statsHighlightTimeseries={mockStatsData[0]}
        statsHighlightMetricName={mockMetrics}
        handleCampaignDetailBackOnClick={handleBackClick}
        handleStatsHighlightClick={handleStatsClick}
      />
    );

    expect(screen.getAllByText('Back')[0]).toBeDefined();
    expect(screen.getByTestId('campaign-image-chart')).toBeDefined();
    expect(screen.getByTestId('stats-highlights')).toBeDefined();
    expect(screen.getByTestId('download-button')).toBeDefined();
  });

  it('handles pid button click and clipboard copy', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);

    render(
      <CampaignDetail
        data={mockData}
        handleCampaignDetailBackOnClick={handleBackClick}
      />
    );

    fireEvent.click(screen.getByText('123'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.pid);
  });

  it('handles pid button click and clipboard copy failure', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error('Copy failed')
    );

    render(
      <CampaignDetail
        data={mockData}
        handleCampaignDetailBackOnClick={handleBackClick}
      />
    );

    fireEvent.click(screen.getByText('123'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.pid);
    // Check for failureToast call if needed
  });

  it('handles back button click', () => {
    render(
      <CampaignDetail
        data={mockData}
        handleCampaignDetailBackOnClick={handleBackClick}
      />
    );

    fireEvent.click(screen.getAllByText('Back')[0]);
    expect(handleBackClick).toHaveBeenCalled();
  });

  // Additional tests for scenarios where data is not provided, etc.
});
