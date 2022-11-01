import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Profile } from '../../src/components/Profile';
import { campaignStubData } from '../cms.data';

describe('Profile', () => {
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <Profile
        image={campaignStubData[0].imageUrl}
        fullName="Test"
        userName="tester"
        setHasUpdatedSettings={undefined}
        setIsUpdatingSettings={undefined}
      />
    );
    root.unmount();
  });
});
