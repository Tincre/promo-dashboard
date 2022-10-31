import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { PromoDashboard } from '../src/index';
import { campaignStubData } from './cms.data';

describe('PromoDashboard', () => {
  it('renders empty array prop without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<PromoDashboard campaignsData={[]} />);
    root.unmount();
  });
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<PromoDashboard campaignsData={campaignStubData} />);
    root.unmount();
  });
});
