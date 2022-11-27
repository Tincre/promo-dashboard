import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignList } from '../../src/components/CampaignList';
import { campaignStubData } from '../cms.data';

describe('CampaignList', () => {
  it('renders full data without crashing', () => {
    render(
      <CampaignList
        data={campaignStubData}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
      />
    );
    const campaignListItem = screen.getByText(campaignStubData[0].pid);
    expect(campaignListItem).toBeDefined();
    fireEvent.click(campaignListItem);
  });
});
