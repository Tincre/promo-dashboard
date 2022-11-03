import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart } from '../../src/components/LineChart';
import { campaignStubData } from '../cms.data';

describe('LineChart', () => {
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    div.id = 'testing';
    const root = createRoot(div);
    root.render(<LineChart info={campaignStubData[0]} />);
    expect(div.id).toBe('testing');
    root.unmount();
  });
});
