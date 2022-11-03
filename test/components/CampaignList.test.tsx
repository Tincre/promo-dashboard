import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CampaignList } from '../../src/components/CampaignList';
import { campaignStubData } from '../cms.data';

describe('CampaignList', () => {
  it('renders full data without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <CampaignList
        data={campaignStubData}
        handleCampaignClick={() => null}
        handleRepeatButtonOnClick={() => null}
      />
    );
    root.unmount();
  });
});
