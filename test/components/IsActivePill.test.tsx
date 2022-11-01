import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { IsActivePill } from '../../src/components/IsActivePill';

describe('IsActivePill', () => {
  it('renders false without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<IsActivePill isActive={false} />);
    root.unmount();
  });
  it('renders true without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<IsActivePill isActive={true} />);
    root.unmount();
  });
});
