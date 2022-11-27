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
    let campaign = screen.getByRole('button');
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
      >
        TestChildren
      </Campaign>
    );
    let campaign = screen.getByRole('button');
    const testChildren = screen.getByText(/TestChildren/i);
    expect(testChildren).toBeDefined();
    fireEvent.click(campaign);
    expect(campaign).toBeDefined();
  });
});
