import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Campaign } from '../../src/components/Campaign';
import { campaignStubData } from '../cms.data';

describe('Campaign', () => {
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <Campaign
        data={campaignStubData[0]}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
      />
    );
    root.unmount();
  });
});
