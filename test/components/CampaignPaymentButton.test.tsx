import React, { MouseEvent } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignPaymentButton } from '../../src/components/CampaignPaymentButton';
import { campaignStubData } from '../cms.data';
import { CampaignData, CampaignDummyData } from '@tincre/promo-types';

describe('CampaignPaymentButton', () => {
  let testData = campaignStubData[0];
  it('renders without crashing', () => {
    testData.receiptId = undefined;
    render(<CampaignPaymentButton data={testData}></CampaignPaymentButton>);
    const button = screen.getByText(/Payment/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with children without crashing', () => {
    testData.receiptId = '';
    render(
      <CampaignPaymentButton data={campaignStubData[0]}>
        Payment
      </CampaignPaymentButton>
    );
    const button = screen.getByText(/Payment/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with handleGeneratePaymentLinkButtonClick without crashing', () => {
    let testLocalData: CampaignData | CampaignDummyData | undefined = undefined;
    let testEvent: MouseEvent<HTMLButtonElement> | undefined = undefined;
    let testFlag: boolean = false;
    testData.receiptId = undefined;
    const handleGeneratePaymentLinkButtonClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: CampaignData | CampaignDummyData
    ) => {
      testFlag = true;
      testLocalData = data;
      testEvent = event;
    };
    render(
      <CampaignPaymentButton
        data={campaignStubData[0]}
        handleGeneratePaymentLinkButtonClick={
          handleGeneratePaymentLinkButtonClick
        }
      ></CampaignPaymentButton>
    );
    const button = screen.getByText(/Payment/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
    expect(testFlag).toBeTruthy();
    expect(testEvent).toBeDefined();
    expect(testLocalData).toMatchObject(testData);
  });
});
