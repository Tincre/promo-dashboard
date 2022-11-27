import React from 'react';
import { screen, render } from '@testing-library/react';
import { IsActivePill } from '../../src/components/IsActivePill';

describe('IsActivePill', () => {
  it('renders false without crashing', () => {
    render(<IsActivePill isActive={false} />);
    const pill = screen.getByText('inactive', { exact: false });
    expect(pill).toBeDefined();
  });
  it('renders true without crashing', () => {
    render(<IsActivePill isActive={true} />);
    const pill = screen.getByText('active', { exact: false });
    expect(pill).toBeDefined();
  });
});
