import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignsChart } from '../../src/components/CampaignsChart';
import { CampaignsTable } from '../../src/components/CampaignsTable';
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
  const handleCampaignClick = jest.fn();

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

  it('renders the table with data and handles toggle', () => {
    render(
      <CampaignsTable
        data={campaignStubData}
        handleCampaignClick={handleCampaignClick}
      />
    );

    // Check for table visibility
    expect(screen.getByText('Collapse table')).toBeDefined();
    expect(screen.getByText('Ad 1')).toBeDefined();
    expect(screen.getByText('Ad 2')).toBeDefined();

    // Simulate toggle
    fireEvent.click(screen.getByText('Collapse table'));
    expect(screen.getByText('Show table')).toBeDefined();

    fireEvent.click(screen.getByText('Show table'));
    expect(screen.getByText('Collapse table')).toBeDefined();
    fireEvent.click(screen.getByText(`${campaignStubData[0].adTitle}-${0}`));
  });

  it('handles row click event', () => {
    render(
      <CampaignsTable
        data={campaignStubData}
        handleCampaignClick={handleCampaignClick}
      />
    );

    // Simulate clicking on a table row
    fireEvent.click(screen.getByText('Ad 1'));
    expect(handleCampaignClick).toHaveBeenCalled();
  });

  it('renders correctly when isCollapsed is true', () => {
    render(
      <CampaignsTable
        data={campaignStubData}
        isCollapsed={true}
        handleCampaignClick={handleCampaignClick}
      />
    );
    expect(screen.getByText('Show table')).toBeDefined();
  });
});
