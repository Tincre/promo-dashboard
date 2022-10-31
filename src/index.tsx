import { useState, ReactNode } from 'react';
import { Campaign } from './components/Campaign';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';

interface CampaignData {
  pid?: string;
  adTitle?: string;
  budget?: string | number;
  description?: string;
  target?: string;
  adCopy?: string;
  adCallToAction?: string;
  buttonText?: string;
  isActive?: boolean;
}

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
  };

  const handleCampaignDetailOnClick = () => {
    setIsCampaignClicked(false);
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

export function CampaignList({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
}: {
  data: CampaignData[];
  handleRepeatButtonOnClick: Function;
  handleCampaignClick: Function;
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {data.map((campaignData: CampaignData, index) => {
        const key = `${index}-${campaignData.pid}`;
        return (
          <Campaign
            key={key}
            data={campaignData}
            handleRepeatButtonOnClick={handleRepeatButtonOnClick}
            handleCampaignClick={handleCampaignClick}
          />
        );
      })}
    </ul>
  );
}
