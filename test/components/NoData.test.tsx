import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NoData } from '../../src/components/NoData';

describe('<NoData />', () => {
  const mockCampaignTypes = [
    { name: 'Type1', description: 'Description1', icon: 'Icon1', color: 'Color1' },
    { name: 'Type2' },
  ];

  const mockHandleCampaignTypeButtonClick = jest.fn();

  it('renders without crashing', () => {
    render(<NoData campaignTypes={[]} />);
    expect(screen.getByText('Create a campaign')).toBeDefined();
    expect(screen.getByText("Press a campaign type to start the easiest ad campaign you've ever run.")).toBeDefined();
  });

  it('displays campaign types correctly', () => {
    render(<NoData campaignTypes={mockCampaignTypes} />);
    expect(screen.getByText('Type1')).toBeDefined();
    expect(screen.getByText('Type2')).toBeDefined();
  });

  it('calls handleCampaignTypeButtonClick when a campaign type button is clicked', () => {
    render(<NoData campaignTypes={mockCampaignTypes} handleCampaignTypeButtonClick={mockHandleCampaignTypeButtonClick} />);
    
    // Assuming CampaignType renders a button or clickable element with the campaign name
    fireEvent.click(screen.getByText('Type1'));
    expect(mockHandleCampaignTypeButtonClick).toHaveBeenCalledWith(expect.anything(), 'type1');
  });
});
