import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { CampaignSupportButton } from '../../src/components/CampaignSupportButton';

describe('CampaignSupportButton', () => {
  it('renders without crashing', () => {
    render(
      <CampaignSupportButton supportLink="https://community.tincre.dev"></CampaignSupportButton>
    );
    const button = screen.getByText(/Support/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it('renders with children without crashing', () => {
    render(
      <CampaignSupportButton supportLink="https://community.tincre.dev">{`Do not click.`}</CampaignSupportButton>
    );
    const button = screen.getByText(/Do not click/i, { exact: true });
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
});
