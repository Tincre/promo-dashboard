import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DashboardContainer } from '../../src/components/DashboardContainer';

describe('DashboardContainer', () => {
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<DashboardContainer>This is a child</DashboardContainer>);
    root.unmount();
  });
});
