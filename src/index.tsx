import { useState, ReactNode } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { CampaignData } from './lib/types';
import { CampaignList } from './components/CampaignList';

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
  const sortedCampaignsData = sortCampaignDataOnIsActive(campaignsData);
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
        ) : (
          <CampaignDetail
            data={promoData}
            handleCampaignDetailOnClick={handleCampaignDetailOnClick}
          />
        )}
      </DashboardContainer>
    </>
  );
}
export function DashboardContainer({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {children}
    </div>
  );
}

function sortCampaignDataOnIsActive(data: CampaignData[]) {
  if (!Array.isArray(data)) {
    throw new Error('Data in sortCampaignDataOnIsActive is not an array!');
  }
  let newArray = data.sort((campaign: CampaignData) =>
    campaign?.isActive ? -1 : 1
  );
  return newArray;
}
