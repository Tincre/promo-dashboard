import React, { MouseEvent } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignRepeatButton } from '../../src/components/CampaignRepeatButton';
import { testPromoApiCampaignData, campaignStubData } from '../cms.data';
import { CampaignData, CampaignDummyData } from '../../src/lib/types';

describe('CampaignRepeatButton', () => {
  it('renders without crashing', () => {
    render(
      <CampaignRepeatButton
        data={testPromoApiCampaignData}
      ></CampaignRepeatButton>
    );
    const button = screen.getByText(/Repeat/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with children without crashing', () => {
    render(
      <CampaignRepeatButton data={campaignStubData[0]}>
        Do not repeat
      </CampaignRepeatButton>
    );
    const button = screen.getByText(/Do not repeat/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with handleRepeatButtonOnClick without crashing', () => {
    let testData: CampaignData | CampaignDummyData | undefined = undefined;
    let testEvent: MouseEvent<HTMLButtonElement> | undefined = undefined;
    let testFlag: boolean = false;
    const handleRepeatButtonOnClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: CampaignData | CampaignDummyData
    ) => {
      testFlag = true;
      testData = data;
      testEvent = event;
    };
    render(
      <CampaignRepeatButton
        data={campaignStubData[0]}
        handleRepeatButtonOnClick={handleRepeatButtonOnClick}
      ></CampaignRepeatButton>
    );
    const button = screen.getByText(/Repeat/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
    expect(testFlag).toBeTruthy();
    expect(testEvent).toBeDefined();
    expect(testData).toMatchObject(campaignStubData[0]);
  });
});
