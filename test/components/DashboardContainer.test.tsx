import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardContainer } from '../../src/components/DashboardContainer';

describe('DashboardContainer', () => {
  it('renders full data without crashing', () => {
    render(<DashboardContainer>This is a child</DashboardContainer>);
    const db = screen.getByText(/This is a child/i);
    expect(db).toBeDefined();
  });
});
