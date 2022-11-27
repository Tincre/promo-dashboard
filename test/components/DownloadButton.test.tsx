import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {
  DownloadAllCampaignsButton,
  DownloadCampaignButton,
} from '../../src/components/DownloadButton';
import { campaignStubData } from '../cms.data';

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(),
});
describe('DownloadCampaignButton', () => {
  it('renders without crashing', () => {
    render(<DownloadCampaignButton campaignData={campaignStubData[0]} />);
    const downloadButton = screen.getByRole('button');
    expect(downloadButton).toBeDefined();
    fireEvent.click(downloadButton);
  });
});

describe('DownloadAllCampaignButton', () => {
  it('renders without crashing', () => {
    render(<DownloadAllCampaignsButton campaignsData={campaignStubData} />);
    const downloadButton = screen.getByRole('button');
    expect(downloadButton).toBeDefined();
    fireEvent.click(downloadButton);
  });
});
