import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Campaign } from '../../src/components/Campaign';
import { campaignStubData } from '../cms.data';

describe('Campaign', () => {
  it('renders full data active without crashing', () => {
    expect(campaignStubData[0].isActive).toBeTruthy();

    render(
      <Campaign
        data={campaignStubData[0]}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
      >
        TestChildren
      </Campaign>
    );
    let campaign = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-button`
    );
    const testChildren = screen.getByText(/TestChildren/i);
    expect(testChildren).toBeDefined();
    fireEvent.click(campaign);
    expect(campaign).toBeDefined();
  });
  it('renders full data inactive without crashing', () => {
    expect(campaignStubData[5].isActive).toBeFalsy();

    render(
      <Campaign
        data={campaignStubData[5]}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
        id="test-campaign-id"
        emailDomain="tincre.com"
        emailLocalPart="teamage"
      >
        TestChildren
      </Campaign>
    );
    let campaign = screen.getByLabelText(
      `campaign-${campaignStubData[5].pid}-button`
    );

    const testChildren = screen.getByText(/TestChildren/i);
    expect(testChildren).toBeDefined();
    fireEvent.click(campaign);
    expect(campaign).toBeDefined();
  });
  it('renders campaignClick without crashing', () => {
    expect(campaignStubData[5].isActive).toBeFalsy();
    let isCampaignClicked = false;
    const testCampaignClick = (event: any, data: any) => {
      isCampaignClicked = true;
    };
    render(
      <Campaign
        data={campaignStubData[5]}
        handleCampaignClick={testCampaignClick}
        handleRepeatButtonOnClick={() => null}
        id="test-campaign-id"
        emailDomain="tincre.com"
        emailLocalPart="teamage"
      >
        TestChildren
      </Campaign>
    );
    let campaign = screen.getByLabelText(
      `campaign-${campaignStubData[5].pid}-button`
    );

    const testChildren = screen.getByText(/TestChildren/i);
    expect(testChildren).toBeDefined();
    fireEvent.click(campaign);
    expect(campaign).toBeDefined();
    expect(isCampaignClicked).toBeTruthy();
  });
});
