import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { PromoDashboard } from '../src/index';
import { campaignStubData } from './cms.data';
import { CampaignData } from '../src/lib/types';

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
  it('renders full data without crashing', () => {
    const setPromoData = (data: any) => data;
    const isRepeatButtonClicked = false;
    const setIsRepeatButtonClicked = (tf: boolean) => tf;
    const handleRepeatButtonOnClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      data: CampaignData
    ) => {
      console.debug(`handleRepeatButtonOnClick::type ${event.type}`);
      setPromoData({
        adTitle: data?.adTitle,
        budget: data?.budget,
        description: data?.description,
        target: data?.target,
        adCopy: data?.adCopy || data?.description,
        adCallToAction: data?.adCallToAction,
        buttonText: data?.buttonText,
      });
      console.debug(
        `handleRepeatButtonOnClick::Campaign in process for ${
          data?.adTitle || ''
        }.`
      );

      if (typeof setIsRepeatButtonClicked !== 'undefined') {
        setIsRepeatButtonClicked(!isRepeatButtonClicked);
        console.debug(
          `handleRepeatButtonOnClick::isRepeatButtonClicked set to ${!isRepeatButtonClicked}.`
        );
      }
    };

    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <PromoDashboard
        campaignsData={campaignStubData}
        handleRepeatButtonClick={handleRepeatButtonOnClick}
      />
    );
    root.unmount();
  });
});
