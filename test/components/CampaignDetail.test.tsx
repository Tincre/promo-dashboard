import React from 'react';
import { screen, render } from '@testing-library/react';
import { CampaignDetail } from '../../src/components/CampaignDetail';
import { campaignStubData } from '../cms.data';

global.ResizeObserver = require('resize-observer-polyfill');

describe('CampaignDetail', () => {
  it('renders without crashing', () => {
    render(
      <CampaignDetail
        data={campaignStubData[0]}
        handleCampaignDetailBackOnClick={() => null}
      />
    );
    const campaignDetail = screen.getByText(`${campaignStubData[0].pid}`);
    expect(campaignDetail).toBeDefined();
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
});
