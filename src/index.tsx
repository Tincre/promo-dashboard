import { useState } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { CampaignData } from './lib/types';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import { sortCampaignDataOnIsActive } from './lib/sort';

export function PromoDashboard({
  campaignsData,
  campaignDetailData,
}: {
  campaignsData: CampaignData[];
  campaignDetailData?: CampaignData;
}) {
  const [promoData, setPromoData] = useState<CampaignData | undefined>(
    campaignDetailData || undefined
  );
  const [isPromoButtonOpen, setIsPromoButtonOpen] = useState<boolean>(false);
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] =
    useState<boolean>(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState<boolean>(false);
  const [hasUpdatedSettings, setHasUpdatedSettings] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [sortedCampaignsData] = useState<CampaignData[]>(
    sortCampaignDataOnIsActive(campaignsData)
  );

  const handleRepeatButtonOnClick = (data: CampaignData) => {
    setPromoData({
      adTitle: data?.adTitle,
      budget: data?.budget,
      description: data?.description,
      target: data?.target,
      adCopy: data?.adCopy || data?.description,
      adCallToAction: data?.adCallToAction,
      buttonText: data?.buttonText,
    });
    console.debug(`Repeat campaign in process for ${data?.adTitle || ''}.`);

    if (typeof setIsRepeatButtonClicked !== 'undefined') {
      setIsRepeatButtonClicked(!isRepeatButtonClicked);
      console.debug(`Repeat button was set to ${!isRepeatButtonClicked}.`);
    }
  };

  const handleCampaignClick = (data: CampaignData) => {
    setPromoData(data);
    setIsCampaignClicked(true);
    console.debug(`Set isCampaignClicked to true`);
  };

  const handleCampaignDetailOnClick = () => {
    setIsCampaignClicked(false);
    console.debug(`Set isCampaignClicked to false`);
  };
  return (
    <>
      <DashboardContainer>
        {!isCampaignClicked ? (
          <>
            <CampaignList
              data={sortedCampaignsData}
              handleRepeatButtonOnClick={handleRepeatButtonOnClick}
              handleCampaignClick={handleCampaignClick}
            />
            <Profile
              setHasUpdatedSettings={setHasUpdatedSettings}
              setIsUpdatingSettings={setIsUpdatingSettings}
            />
          </>
        ) : typeof promoData !== 'undefined' ? (
          <CampaignDetail
            data={promoData}
            handleCampaignDetailOnClick={handleCampaignDetailOnClick}
          />
        ) : null}
      </DashboardContainer>
    </>
  );
}
