import React, { useState, useEffect } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { PromoDashboard } from '../src/index';
import { campaignStubData } from './cms.data';
import { CampaignData } from '../src/lib/types';

global.ResizeObserver = require('resize-observer-polyfill');

describe('PromoDashboard', () => {
  it('renders empty array prop without crashing', () => {
    render(<PromoDashboard campaignsData={[]} />);
  });
  it('renders full data without crashing', () => {
    render(<PromoDashboard campaignsData={campaignStubData} />);
    const dashboard = screen.getByLabelText('campaign-fghijklm');
    expect(dashboard).toBeDefined();
    const dashboardButton = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-button`
    );
    expect(dashboardButton).toBeDefined();
    fireEvent.click(dashboardButton);
  });
  it('renders full data without crashing', () => {
    const setPromoData = (data: any) => data;
    const isRepeatButtonClicked = false;
    const setIsRepeatButtonClicked = (tf: boolean) => tf;
    const handleRepeatButtonOnClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      data: CampaignData
    ) => {
      console.debug(`handleRepeatButtonOnClick::type ${event.type}`);
      setPromoData({
        adTitle: data?.adTitle,
        budget: data?.budget,
        description: data?.description,
        target: data?.target,
        adCopy: data?.adCopy || data?.description,
        adCallToAction: data?.adCallToAction,
        buttonText: data?.buttonText,
      });

      if (typeof setIsRepeatButtonClicked !== 'undefined') {
        setIsRepeatButtonClicked(!isRepeatButtonClicked);
      }
    };

    render(
      <PromoDashboard
        campaignsData={campaignStubData}
        handleRepeatButtonClick={handleRepeatButtonOnClick}
      />
    );
    const repeatButton = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-repeat-button`
    );
    expect(repeatButton).toBeDefined();
    fireEvent.click(repeatButton);
    const dashboardButton = screen.getByLabelText(
      `campaign-${campaignStubData[5].pid}-button`
    );
    expect(dashboardButton).toBeDefined();
    fireEvent.click(dashboardButton);
    const clicksButton = screen.getByText('Clicks', { exact: false });
    expect(clicksButton).toBeDefined();
    fireEvent.click(clicksButton);
  });
});
