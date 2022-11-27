import React from 'react';
import { screen, render } from '@testing-library/react';
import { LineChart } from '../../src/components/LineChart';
import { campaignStubData } from '../cms.data';

global.ResizeObserver = require('resize-observer-polyfill');

describe('LineChart', () => {
  it('renders full data without crashing', () => {
    render(<LineChart info={campaignStubData[0]} />);
    const chart = screen.getByRole('img');
    expect(chart).toBeDefined()
  });
});
