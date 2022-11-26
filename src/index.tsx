import { useState, useEffect, MouseEvent } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { CampaignData } from './lib/types';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import { sortCampaignDataOnIsActive } from './lib/sort';
import { options } from './lib/options';
import { DownloadAllCampaignsButton } from './components/DownloadButton';

export function PromoDashboard({
  campaignsData,
  campaignDetailData,
  handleRepeatButtonClick,
}: {
  campaignsData: CampaignData[];
  campaignDetailData?: CampaignData;
  handleRepeatButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignDetailData: CampaignData
  ) => void;
}) {
  const [promoData, setPromoData] = useState<CampaignData | undefined>(
    undefined
  );
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

  const handleStatsHighlightClick = (campaignData: any) => {
    setStatsHighlightTimeseries(campaignData);
    setClickedStatsClassName(campaignData.name || 'Spend');
  };

  const handleRepeatButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
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

  const handleCampaignClick = (data: CampaignData) => {
    setPromoData(data);
    setIsCampaignClicked(true);
    if (typeof data?.stats !== 'undefined') {
      data.stats.map((campaignStats: any) => {
        if (campaignStats.name === options.defaultStatName) {
          setStatsHighlightTimeseries(campaignStats);
        }
      });
    }
    console.debug(`Set isCampaignClicked to true`);
  };

  const handleCampaignDetailBackOnClick = () => {
    setIsCampaignClicked(false);
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
              handleRepeatButtonOnClick={
                typeof handleRepeatButtonClick !== 'undefined'
                  ? handleRepeatButtonClick
                  : handleRepeatButtonOnClick
              }
              handleCampaignClick={handleCampaignClick}
            />
            <DownloadAllCampaignsButton campaignsData={sortedCampaignsData} />
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
export type { CampaignData };
