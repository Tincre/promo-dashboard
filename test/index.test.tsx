import React, { useState, useEffect, MouseEvent } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { PromoDashboard } from '../src/index';
import { campaignStubData } from './cms.data';
import { CampaignData, Settings } from '../src/lib/types';

global.ResizeObserver = require('resize-observer-polyfill');

describe('PromoDashboard', () => {
  it('renders empty array prop without crashing', () => {
    render(<PromoDashboard campaignsData={[]} />);
  });
  it('renders full data without crashing', () => {
    render(
      <PromoDashboard
        campaignsData={campaignStubData}
        handleGeneratePaymentLinkButtonClick={() => null}
      />
    );
    const dashboard = screen.getByLabelText('campaign-fghijklm');
    expect(dashboard).toBeDefined();
    const dashboardButton = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-button`
    );
    expect(dashboardButton).toBeDefined();
    fireEvent.click(dashboardButton);
  });
  it('renders the dashboard payment button without crashing', () => {
    let isDeleteButtonClicked = false;
    const handleDeleteButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      data: CampaignData
    ) => {
      isDeleteButtonClicked = true;
    };

    render(
      <PromoDashboard
        campaignsData={campaignStubData}
        handleGeneratePaymentLinkButtonClick={() => null}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    );
    const dashboard = screen.getByLabelText('campaign-fghijklm');
    expect(dashboard).toBeDefined();
    const dashboardPaymentButton = screen.getByLabelText(
      `campaign-${campaignStubData[1].pid}-payment-button`
    );
    expect(dashboardPaymentButton).toBeDefined();
    fireEvent.click(dashboardPaymentButton);
    // find campaign with no receiptId parameter
    const dashboardInactiveDeleteButton = screen.getByLabelText(
      `campaign-delete-${campaignStubData[1].pid}-button`
    );
    // delete button
    expect(dashboardInactiveDeleteButton).toBeDefined();
    fireEvent.click(dashboardInactiveDeleteButton);
    expect(isDeleteButtonClicked).toBeTruthy();
  });
  it('renders full data without crashing', () => {
    let testEvent: MouseEvent<HTMLButtonElement> | undefined = undefined;
    let testData: Settings | undefined = undefined;
    const setPromoData = (data: any) => data;
    const isRepeatButtonClicked = false;
    const setIsRepeatButtonClicked = (tf: boolean) => tf;
    const handleSettingsSaveButtonOnClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: Settings
    ) => {
      testEvent = event;
      testData = data;
    };
    const handleRepeatButtonOnClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      data: CampaignData
    ) => {
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
    const addedReceiptIdsCampaignData: CampaignData[] = [];
    campaignStubData.forEach((pckg) => {
      addedReceiptIdsCampaignData.push({ ...pckg, receiptId: 'blahblahblah' });
    });
    render(
      <PromoDashboard
        campaignsData={addedReceiptIdsCampaignData}
        handleRepeatButtonClick={handleRepeatButtonOnClick}
        handleSettingsSaveButtonClick={handleSettingsSaveButtonOnClick}
        dashboardOptions={{
          emailDomain: 'tincre.com',
          emailLocalPart: 'test-team',
        }}
      />
    );
    const repeatButton = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-repeat-button`
    );
    expect(repeatButton).toBeDefined();
    fireEvent.click(repeatButton);
    const dashboardButton = screen.getByLabelText(
      `campaign-${campaignStubData[0].pid}-button`
    );
    expect(dashboardButton).toBeDefined();
    fireEvent.click(dashboardButton);
    const clicksButton = screen.getByText('Clicks', { exact: false });
    expect(clicksButton).toBeDefined();
    fireEvent.click(clicksButton);
    // go back
    const backButton = screen.getAllByText(/Back/i)[0];
    expect(backButton).toBeDefined();
    fireEvent.click(backButton);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDefined();
    fireEvent.click(saveButton);
    expect(testData).toBeDefined();
    expect(testEvent).toBeDefined();
  });

  it('renders full data and settings data without crashing', () => {
    let testEvent: MouseEvent<HTMLButtonElement> | undefined = undefined;
    let testData: Settings | undefined = undefined;
    const setPromoData = (data: any) => data;
    const isRepeatButtonClicked = false;
    const setIsRepeatButtonClicked = (tf: boolean) => tf;
    let isCampaignClicked = false;
    let isCampaignDetailBackClicked = false;
    const handleSettingsSaveButtonOnClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: Settings
    ) => {
      testEvent = event;
      testData = data;
    };
    const handleCampaignClick = (
      event: MouseEvent<HTMLButtonElement>,
      data: Settings
    ) => {
      testEvent = event;
      testData = data;
      isCampaignClicked = true;
    };

    const handleCampaignDetailBackClick = (
      event: MouseEvent<HTMLButtonElement>
    ) => {
      testEvent = event;
      isCampaignDetailBackClicked = true;
    };

    render(
      <PromoDashboard
        campaignsData={campaignStubData}
        handleSettingsSaveButtonClick={handleSettingsSaveButtonOnClick}
        handleCampaignClick={handleCampaignClick}
        handleCampaignDetailBackClick={handleCampaignDetailBackClick}
        profileSettingsData={{
          userName: 'testUserName',
          fullName: 'Test McTesterson',
          image: 'favicon.ico',
        }}
      />
    );
    let campaign = screen.getByLabelText(
      `campaign-${campaignStubData[5].pid}-button`
    );
    const imageInput = screen.getByRole('textbox', { name: 'Avatar' });
    expect(imageInput).toBeDefined();
    // @ts-ignore
    expect(imageInput.value).toBe('favicon.ico');
    const userNameInput = screen.getByRole('textbox', { name: 'User name' });
    expect(userNameInput).toBeDefined();
    // @ts-ignore
    expect(userNameInput.value).toBe('testUserName');
    const fullNameInput = screen.getByRole('textbox', {
      name: 'Your full name',
    });
    expect(fullNameInput).toBeDefined();
    // @ts-ignore
    expect(fullNameInput.value).toBe('Test McTesterson');
    fireEvent.click(campaign);
    expect(campaign).toBeDefined();
    expect(isCampaignClicked).toBeTruthy();

    let campaignDetailBackButton = screen.getAllByRole('button', {
      name: 'Back',
    })[0];
    fireEvent.click(campaignDetailBackButton);
    expect(campaignDetailBackButton).toBeDefined();
    expect(isCampaignDetailBackClicked).toBeTruthy();
  });
});
