import { useState, useEffect } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { CampaignData } from './lib/types';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import { sortCampaignDataOnIsActive } from './lib/sort';
import { options } from './lib/options';

export function PromoDashboard({
  campaignsData,
  campaignDetailData,
  isPromoButtonOpen,
}: {
  campaignsData: CampaignData[];
  campaignDetailData?: CampaignData;
  isPromoButtonOpen?: boolean;
}) {
  const [promoData, setPromoData] = useState<CampaignData | undefined>(
    undefined
  );
  const [isPromoButtonOpenInternal, setIsPromoButtonOpenInternal] =
    useState<boolean>(false);
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] =
    useState<boolean>(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState<boolean>(false);
  const [hasUpdatedSettings, setHasUpdatedSettings] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [sortedCampaignsData, setSortedCampaignsData] = useState<
    CampaignData[]
  >(sortCampaignDataOnIsActive(campaignsData));
  const [statsHighlightTimeseries, setStatsHighlightTimeseries] = useState<
    object | undefined
  >(undefined);
  const [clickedStatsClassName, setClickedStatsClassName] = useState<string>(
    options.defaultStatName
  );
  useEffect(() => {
    if (typeof campaignsData !== 'undefined') {
      setSortedCampaignsData(campaignsData);
    }
  }, [campaignsData, setSortedCampaignsData]);

  useEffect(() => {
    if (typeof campaignDetailData !== 'undefined') {
      setPromoData(campaignDetailData);
    }
  }, [campaignDetailData, setPromoData]);

  useEffect(() => {
    if (typeof isPromoButtonOpen !== 'undefined') {
      setIsPromoButtonOpenInternal(isPromoButtonOpen);
    }
  }, [isPromoButtonOpen, setIsPromoButtonOpenInternal]);

  const handleStatsHighlightClick = (campaignData: any) => {
    setStatsHighlightTimeseries(campaignData);
    setClickedStatsClassName(campaignData.name || 'Spend');
  };

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
    if (typeof isPromoButtonOpen !== 'undefined') {
      setIsPromoButtonOpenInternal(true);
    }
  };

  const handleCampaignClick = (data: CampaignData) => {
    setPromoData(data);
    setIsCampaignClicked(true);
    setIsPromoButtonOpenInternal(false);
    console.debug(`Set isCampaignClicked to true`);
  };

  const handleCampaignDetailBackOnClick = () => {
    setIsCampaignClicked(false);
    setIsPromoButtonOpenInternal(false);
    setClickedStatsClassName(options.defaultStatName); // default
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
            statsHighlightTimeseries={statsHighlightTimeseries}
            statsHighlightMetricName={clickedStatsClassName}
            handleCampaignDetailBackOnClick={handleCampaignDetailBackOnClick}
            handleStatsHighlightClick={handleStatsHighlightClick}
          />
        ) : null}
      </DashboardContainer>
    </>
  );
}
