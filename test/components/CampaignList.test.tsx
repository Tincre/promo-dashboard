import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignList } from '../../src/components/CampaignList';
import { campaignStubData } from '../cms.data';
import {
  mockAllIsIntersecting,
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';

window.scrollTo = jest.fn();

beforeEach(() => {
  setupIntersectionMocking(jest.fn);
});
afterEach(() => {
  resetIntersectionMocking();
});
afterAll(() => {
  jest.clearAllMocks();
});

describe('CampaignList', () => {
  it('renders full data without crashing', () => {
    mockAllIsIntersecting(true); 
    render(
      <CampaignList
        data={campaignStubData}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
        handleGeneratePaymentLinkButtonClick={() => null}
        handleDeleteButtonOnClick={() => null}
        deletedCampaigns={[campaignStubData[1].pid]}
      />
    );
    const campaignListItem = screen.getByText(campaignStubData[0].pid);
    expect(campaignListItem).toBeDefined();
    fireEvent.click(campaignListItem);
  });
});
