/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Profile } from './components/Profile';
import { CampaignDetail } from './components/CampaignDetail';
import { Toaster } from 'react-hot-toast';
import { successToast, failureToast, infoToast } from './lib/notifications';
import {
  CampaignData,
  Settings,
  CampaignStatsData,
  DownloadableCampaignStats,
  DownloadableCampaignMetadataSample,
  PromoApiCampaignStatsData,
  DashboardOptions,
} from './lib/types';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import {
  sortCampaignDataOnIsActiveAndReceiptId,
  numActiveCampaigns,
} from './lib/sort';
import { replaceDataParamForChartData } from './lib/coerce';
import { options } from './lib/options';
import { DownloadAllCampaignsButton } from './components/DownloadButton';
import { tourSteps } from './lib/tourSteps';

export function PromoDashboard({
  campaignsData = [],
  campaignDetailData,
  profileSettingsData,
  handleRepeatButtonClick,
  handleSettingsSaveButtonClick,
  handleGeneratePaymentLinkButtonClick,
  handleDeleteButtonClick,
  dashboardOptions,
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
  handleGeneratePaymentLinkButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignData: CampaignData
  ) => void;
  handleDeleteButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignData: CampaignData
  ) => void;
  dashboardOptions?: DashboardOptions;
}) {
  const [promoData, setPromoData] = useState<CampaignData | undefined>(
    undefined
  );
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] =
    useState<boolean>(false);
  const [isPaymentButtonClicked, setIsPaymentButtonClicked] =
    useState<boolean>(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState<boolean>(false);
  const [hasUpdatedSettings, setHasUpdatedSettings] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [sortedCampaignsData, setSortedCampaignsData] = useState<
    CampaignData[]
  >([]);
  const [numberOfActiveCampaigns, setNumberOfActiveCampaigns] = useState<
    number | undefined
  >(undefined);
  const [statsHighlightTimeseries, setStatsHighlightTimeseries] = useState<
    CampaignStatsData | undefined
  >(undefined);
  const [clickedStatsClassName, setClickedStatsClassName] = useState<string>(
    options.defaultStatName
  );
  const [profileData, setProfileData] = useState<undefined | Settings>(
    profileSettingsData
  );
  const [dbOptions, setDbOptions] = useState<undefined | DashboardOptions>(
    dashboardOptions
  );
  const [deletedCampaigns, setDeletedCampaigns] = useState<string[]>([]);
  useEffect(() => {
    if (typeof campaignsData !== 'undefined') {
      setSortedCampaignsData(
        replaceDataParamForChartData(
          sortCampaignDataOnIsActiveAndReceiptId(campaignsData)
        )
      );
    }
  }, [campaignsData, setSortedCampaignsData]);

  useEffect(() => {
    if (typeof campaignDetailData !== 'undefined') {
      setPromoData(campaignDetailData);
    }
  }, [campaignDetailData, setPromoData]);

  useEffect(() => {
    if (sortedCampaignsData?.length) {
      setNumberOfActiveCampaigns(
        numActiveCampaigns(sortedCampaignsData, deletedCampaigns)
      );
    }
  }, [sortedCampaignsData, deletedCampaigns]);

  useEffect(() => {
    if (hasUpdatedSettings) successToast('Settings successfully updated.');
  }, [hasUpdatedSettings]);

  const handleStatsHighlightClick = (campaignData: CampaignStatsData) => {
    setStatsHighlightTimeseries(campaignData);
    setClickedStatsClassName(campaignData.name || 'Spend');
  };

  const handleRepeatButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => {
    setPromoData({
      adTitle: data?.adTitle,
      budget: data?.budget,
      description: data?.description,
      target: data?.target,
      adCopy: data?.adCopy || data?.description,
      adCallToAction: data?.adCallToAction,
      buttonText: data?.buttonText,
    });
    if (typeof setIsRepeatButtonClicked !== 'undefined') {
      setIsRepeatButtonClicked(!isRepeatButtonClicked);
    }
  };
  const handleGeneratePaymentLinkButtonOnClick = async (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => {
    event.preventDefault();
    try {
      if (!data?.pid)
        throw new Error(
          'Payment ID pid not present therefore no payment link can be generated.'
        );
      const response = await fetch('/api/promo-pay', {
        body: JSON.stringify({
          budget: data?.budget || null,
          pid: data.pid,
          isFlat: data?.isFlat,
          usageFee: data?.usageFee,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });
      if (response?.status === 200) {
      } else {
        console.warn(
          `promo-dashboard::PromoDashboard::Payment link for ${data.pid} not received`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`promo-dashboard::PromoDashboard::${error.message}`);
      } else {
        console.warn(
          `promo-dashboard::PromoDashboard::Unknown error after payment link generator handler.`
        );
      }
      failureToast(
        'The payment link was not generated. Please reach out to support.'
      );
    }
    successToast('Emailing you a payment link.');
    if (typeof setIsPaymentButtonClicked !== 'undefined') {
      setIsPaymentButtonClicked(!isPaymentButtonClicked);
    }
  };
  const handleCampaignClick = (data: CampaignData) => {
    setPromoData(data);
    setIsCampaignClicked(true);
    if (data?.data?.length) {
      data.data.map((campaignStats: CampaignStatsData) => {
        if (campaignStats.name === options.defaultStatName) {
          setStatsHighlightTimeseries(campaignStats);
        }
      });
    }
  };

  const handleCampaignDetailBackOnClick = () => {
    setIsCampaignClicked(false);
    setClickedStatsClassName(options.defaultStatName); // default
  };
  const handleSettingsSaveButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: Settings
  ) => {
    setProfileData({ ...data });
    setHasUpdatedSettings(true);
    setTimeout(async () => {
      setHasUpdatedSettings(false);
    }, 2000);
  };
  const handleDeleteButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => {
    event.preventDefault();
    setDeletedCampaigns((current) => [...current, `${data.pid}`]);
  };
  return (
    <>
      <DashboardContainer>
        {!isCampaignClicked ? (
          <>
            <div className="inline-flex w-full pb-4">
              {!numberOfActiveCampaigns ? null : (
                <h1 className="mt-auto mx-2 w-full text-left align-text-middle text-2xl font-bold">
                  {numberOfActiveCampaigns} active campaigns
                </h1>
              )}
              <span className="mt-auto mx-2">
                <DownloadAllCampaignsButton
                  campaignsData={sortedCampaignsData}
                />
              </span>
            </div>

            {!sortedCampaignsData ? null : (
              <CampaignList
                data={sortedCampaignsData}
                handleRepeatButtonOnClick={
                  typeof handleRepeatButtonClick !== 'undefined'
                    ? handleRepeatButtonClick
                    : handleRepeatButtonOnClick
                }
                handleCampaignClick={handleCampaignClick}
                handleGeneratePaymentLinkButtonClick={
                  typeof handleGeneratePaymentLinkButtonClick !== 'undefined'
                    ? handleGeneratePaymentLinkButtonClick
                    : handleGeneratePaymentLinkButtonOnClick
                }
                handleDeleteButtonOnClick={
                  typeof handleDeleteButtonClick !== 'undefined'
                    ? handleDeleteButtonClick
                    : handleDeleteButtonOnClick
                }
                deletedCampaigns={deletedCampaigns}
                dashboardOptions={dbOptions}
              />
            )}
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
          email={profileData?.email}
        />
      </DashboardContainer>
      <Toaster position="bottom-center" />
    </>
  );
}
export {
  tourSteps as promoDashboardTourSteps,
  successToast,
  infoToast,
  failureToast,
};
export type {
  CampaignData,
  Settings,
  DownloadableCampaignStats,
  DownloadableCampaignMetadataSample,
  PromoApiCampaignStatsData,
  CampaignStatsData,
  DashboardOptions,
};
