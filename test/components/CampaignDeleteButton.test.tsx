import React, { MouseEvent } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignDeleteButton } from '../../src/components/CampaignDeleteButton';
import { campaignStubData } from '../cms.data';
import { CampaignData, CampaignDummyData } from '@tincre/promo-types';

describe('CampaignDeleteButton', () => {
  let testData = campaignStubData[0];
  it('renders without crashing', () => {
    testData.receiptId = undefined;
    render(<CampaignDeleteButton data={testData} />);
    const button = screen.getByLabelText(/campaign-delete/i);
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with children without crashing', () => {
    testData.receiptId = '';
    render(
      <CampaignDeleteButton
        data={campaignStubData[0]}
        id="test-id-delete-button"
      />
    );
    const button = screen.getByLabelText(/campaign-delete/i);
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with handleDeleteButtonOnClick without crashing', () => {
    let testLocalData: CampaignData | CampaignDummyData | undefined = undefined;
    let testEvent: MouseEvent<HTMLButtonElement> | undefined = undefined;
    let testFlag: boolean = false;
    testData.receiptId = undefined;
    const handleDeleteButtonOnClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: CampaignData | CampaignDummyData
    ) => {
      testFlag = true;
      testLocalData = data;
      testEvent = event;
    };
    render(
      <CampaignDeleteButton
        data={campaignStubData[0]}
        handleDeleteButtonOnClick={handleDeleteButtonOnClick}
        id="test-id-delete-button"
      />
    );
    const button = screen.getByLabelText(/campaign-delete/i);
    fireEvent.click(button);
    expect(button).toBeDefined();
    expect(testFlag).toBeTruthy();
    expect(testEvent).toBeDefined();
    expect(testLocalData).toMatchObject(testData);
  });
});
