/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { CampaignData, Settings } from './lib/types';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import { sortCampaignDataOnIsActive, numActiveCampaigns } from './lib/sort';
import { options } from './lib/options';
import { DownloadAllCampaignsButton } from './components/DownloadButton';

export function PromoDashboard({
  campaignsData,
  campaignDetailData,
  profileSettingsData,
  handleRepeatButtonClick,
  handleSettingsSaveButtonClick,
}: {
  campaignsData: CampaignData[];
  campaignDetailData?: CampaignData;
  profileSettingsData?: Settings;
  handleRepeatButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignDetailData: CampaignData
  ) => void;
  handleSettingsSaveButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    settingsData: Settings
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
  const [profileData, setProfileData] = useState<undefined | Settings>(
    profileSettingsData
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
  const handleSettingsSaveButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: Settings
  ) => {
    console.debug(`handleSettingsSaveButtonOnClick::type ${event.type}`);
    setProfileData({ ...data });
    console.debug(
      `handleSettingsSaveButtonOnClick::data ${JSON.stringify(data)}`
    );
  };
  return (
    <>
      <DashboardContainer>
        {!isCampaignClicked ? (
          <>
            <div className="inline-flex w-full pb-4">
              <h1 className="mt-auto mx-2 w-full text-left align-text-middle text-2xl font-bold">
                {numActiveCampaigns(sortedCampaignsData)} active campaigns
              </h1>
              <span className="mt-auto mx-2">
                <DownloadAllCampaignsButton
                  campaignsData={sortedCampaignsData}
                />
              </span>
            </div>

            <CampaignList
              data={sortedCampaignsData}
              handleRepeatButtonOnClick={
                typeof handleRepeatButtonClick !== 'undefined'
                  ? handleRepeatButtonClick
                  : handleRepeatButtonOnClick
              }
              handleCampaignClick={handleCampaignClick}
            />
          </>
        ) : typeof promoData !== 'undefined' ? (
          <>
            <CampaignDetail
              data={promoData}
              statsHighlightTimeseries={statsHighlightTimeseries}
              statsHighlightMetricName={clickedStatsClassName}
              handleCampaignDetailBackOnClick={handleCampaignDetailBackOnClick}
              handleStatsHighlightClick={handleStatsHighlightClick}
            />
          </>
        ) : null}
        <Profile
          setHasUpdatedSettings={setHasUpdatedSettings}
          setIsUpdatingSettings={setIsUpdatingSettings}
          handleSettingsSaveButtonClick={
            typeof handleSettingsSaveButtonClick !== 'undefined'
              ? handleSettingsSaveButtonClick
              : handleSettingsSaveButtonOnClick
          }
          image={profileData?.image}
          fullName={profileData?.fullName}
          userName={profileData?.userName}
        />
      </DashboardContainer>
    </>
  );
}
export type { CampaignData, Settings };
