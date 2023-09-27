import React from 'react';
import {
  mockAllIsIntersecting,
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import { screen, render, fireEvent } from '@testing-library/react';
import { Campaign } from '../../src/components/Campaign';
import { campaignStubData } from '../cms.data';

beforeEach(() => {
  setupIntersectionMocking(jest.fn);
});
afterEach(() => {
  resetIntersectionMocking();
});
describe('Campaign', () => {
  it('renders full data active without crashing', () => {
    mockAllIsIntersecting(true);
    expect(campaignStubData[0].isActive).toBeTruthy();
    render(
      <Campaign
        data={campaignStubData[0]}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
        shouldShowCampaign={true}
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
        shouldShowCampaign={true}
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
        shouldShowCampaign={true}
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
