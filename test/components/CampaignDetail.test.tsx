import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CampaignDetail } from '../../src/components/CampaignDetail';
import { campaignStubData } from '../cms.data';

describe('CampaignDetail', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <CampaignDetail
        data={campaignStubData[0]}
        handleCampaignDetailBackOnClick={() => null}
      />
    );
    root.unmount();
  });
});
