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
import { PromoChat } from '@tincre/promo-chat';
import { successToast, failureToast, infoToast } from './lib/notifications';
import { modifyMultiCampaignsDataForDownload } from './lib/coerce';
import {
  CampaignData,
  Settings,
  CampaignStatsData,
  DownloadableCampaignStats,
  DownloadableCampaignMetadataSample,
  PromoApiCampaignStatsData,
  DashboardOptions,
  CampaignDummyData,
  CampaignMetrics,
  CampaignSortedData,
} from './lib/types';
import { CampaignsSummaryStats } from './components/CampaignsSummaryStats';
import { Spinner } from './components/Spinner';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import {
  sortCampaignDataOnIsActiveAndReceiptIdByDate,
  numActiveCampaigns,
} from './lib/sort';
import { aggregateChartData, replaceDataParamForChartData } from './lib/coerce';
import { options } from './lib/options';
import { DownloadAllCampaignsButton } from './components/DownloadButton';
import { tourSteps } from './lib/tourSteps';

export function PromoDashboard({
  campaignsData = [],
  campaignDetailData,
  profileSettingsData,
  isLoading,
  handleRepeatButtonClick,
  handleSettingsSaveButtonClick,
  handleGeneratePaymentLinkButtonClick,
  handleDeleteButtonClick,
  handleCampaignClick,
  handleCampaignDetailBackClick,
  dashboardOptions,
}: {
  campaignsData: CampaignData[] | CampaignDummyData[];
  campaignDetailData?: CampaignData | CampaignDummyData;
  profileSettingsData?: Settings;
  isLoading?: boolean;
  handleRepeatButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignDetailData: CampaignData | CampaignDummyData
  ) => void;
  handleSettingsSaveButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    settingsData: Settings
  ) => void;
  handleGeneratePaymentLinkButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignData: CampaignData | CampaignDummyData
  ) => void;
  handleDeleteButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignData: CampaignData | CampaignDummyData
  ) => void;
  handleCampaignClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleCampaignDetailBackClick?: (
    event: MouseEvent<HTMLButtonElement>
  ) => void;
  dashboardOptions?: DashboardOptions;
}) {
  const [promoData, setPromoData] = useState<
    CampaignData | CampaignDummyData | undefined
  >(undefined);
  const [internalIsLoading, setInternalIsLoading] = useState<boolean>(
    isLoading || false
  );
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] =
    useState<boolean>(false);
  const [isPaymentButtonClicked, setIsPaymentButtonClicked] =
    useState<boolean>(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState<boolean>(false);
  const [hasUpdatedSettings, setHasUpdatedSettings] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [sortedCampaignsData, setSortedCampaignsData] = useState<
    CampaignSortedData[]
  >([]);
  const [numberOfActiveCampaigns, setNumberOfActiveCampaigns] = useState<
    number | undefined
  >(undefined);
  const [statsHighlightTimeseries, setStatsHighlightTimeseries] = useState<
    CampaignStatsData | undefined
  >(undefined);
  const [statsCampaignsData, setStatsCampaignsData] = useState<
    CampaignStatsData[] | undefined
  >();
  const [clickedStatsClassName, setClickedStatsClassName] = useState<string>(
    options.defaultStatName
  );
  const [
    statsHighlightCampaignsTimeseries,
    setStatsHighlightCampaignsTimeseries,
  ] = useState<CampaignStatsData | undefined>(undefined);
  const [clickedStatsCampaignsClassName, setClickedStatsCampaignsClassName] =
    useState<string>(options.defaultStatName);
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
          sortCampaignDataOnIsActiveAndReceiptIdByDate(campaignsData)
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
    // set initial timeseries aggregated data
    if (typeof sortedCampaignsData !== 'undefined') {
      let localStats: CampaignStatsData[] = [];
      ['Spend', 'Views', 'Clicks', 'CPM', 'CPC', 'CTR', 'CPV'].map(
        (metric, index) => {
          localStats.push(
            aggregateChartData(sortedCampaignsData, metric, index)
          );
        }
      );
      setStatsCampaignsData(localStats);
    }
  }, [sortedCampaignsData]);
  useEffect(() => {
    // set initial Spend timeseries aggregated data
    if (typeof statsCampaignsData !== 'undefined') {
      setStatsHighlightCampaignsTimeseries(statsCampaignsData[0]);
    }
  }, [statsCampaignsData]);
  useEffect(() => {
    if (hasUpdatedSettings) successToast('Settings successfully updated.');
  }, [hasUpdatedSettings]);

  const handleStatsHighlightClick = (campaignData: CampaignStatsData) => {
    setStatsHighlightTimeseries(campaignData);
    setClickedStatsClassName(campaignData.name || 'Spend');
  };
  const handleStatsHighlightCampaignsClick = (
    campaignData: CampaignStatsData
  ) => {
    setStatsHighlightCampaignsTimeseries(campaignData);
    setClickedStatsCampaignsClassName(campaignData.name || 'Spend');
  };
  const handleRepeatButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => {
    setPromoData({
      adTitle: data?.adTitle,
      budget: data?.budget,
      description: data?.description,
      target: data?.target,
      adCopy: data?.adCopy || data?.description,
      adCallToAction: data?.adCallToAction,
      buttonText: data?.buttonText,
      creativeUrls: data?.creativeUrls,
    });
    if (typeof setIsRepeatButtonClicked !== 'undefined') {
      setIsRepeatButtonClicked(!isRepeatButtonClicked);
    }
  };
  const handleGeneratePaymentLinkButtonOnClick = async (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
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
  const handleCampaignOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => {
    if (typeof handleCampaignClick !== 'undefined') {
      handleCampaignClick(event, data);
    }
    setPromoData(data);
    setIsCampaignClicked(true);
    if (Array.isArray(data?.data)) {
      data.data.map((campaignStats: CampaignStatsData) => {
        if (campaignStats.name === options.defaultStatName) {
          setStatsHighlightTimeseries(campaignStats);
        }
      });
    }
  };

  const handleCampaignDetailBackOnClick = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (typeof handleCampaignDetailBackClick !== 'undefined') {
      handleCampaignDetailBackClick(event);
    }
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
  const handleDeleteButtonOnClick = async (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => {
    event.preventDefault();
    try {
      if (!data?.pid)
        throw new Error(
          'Payment ID pid not present therefore no payment link can be generated.'
        );
      setDeletedCampaigns((current) => [...current, `${data.pid}`]);
      successToast(`${data.pid} successfully deleted.`);
      const response = await fetch('/api/promo', {
        body: JSON.stringify([data.pid]),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
      if (response?.status !== 200) {
        console.warn(
          `promo-dashboard::PromoDashboard::Delete for ${data.pid} failed.`
        );
        // reset the deleted campaign array by removing the failed pid request
        setDeletedCampaigns((current) =>
          current.map((pid) => (pid !== data?.pid ? pid : ''))
        );
        failureToast(`${data.pid} was not deleted. Try again.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`promo-dashboard::PromoDashboard::${error.message}`);
      } else {
        console.warn(
          `promo-dashboard::PromoDashboard::Unknown error after campaign delete request handler.`
        );
      }
    }
  };
  return (
    <>
      <DashboardContainer isLoading={isLoading}>
        {!isCampaignClicked ? (
          <>
            <div className="inline-flex w-full pb-4 justify-between">
              {!numberOfActiveCampaigns ? null : (
                <h1 className="mt-auto mx-2 text-left align-text-middle text-2xl font-bold dark:text-slate-200">
                  {numberOfActiveCampaigns} active campaigns
                </h1>
              )}
              {isLoading ? (
                <span className="mt-auto text-center text-2xl ">
                  <Spinner />
                </span>
              ) : null}
              <span className="mt-auto mx-2 text-center">
                <DownloadAllCampaignsButton
                  campaignsData={sortedCampaignsData}
                />
              </span>
            </div>

            {!sortedCampaignsData ? null : (
              <>
                <CampaignsSummaryStats
                  data={statsCampaignsData}
                  statsHighlightTimeseries={statsHighlightCampaignsTimeseries}
                  statsHighlightMetricName={clickedStatsCampaignsClassName}
                  campaignData={sortedCampaignsData}
                  isTableCollapsed={dashboardOptions?.isTableCollapsed}
                  handleCampaignClick={handleCampaignOnClick}
                  handleCampaignDetailBackOnClick={
                    handleCampaignDetailBackOnClick
                  }
                  handleStatsHighlightClick={handleStatsHighlightCampaignsClick}
                />
                <CampaignList
                  data={sortedCampaignsData}
                  handleRepeatButtonOnClick={
                    typeof handleRepeatButtonClick !== 'undefined'
                      ? handleRepeatButtonClick
                      : handleRepeatButtonOnClick
                  }
                  handleCampaignClick={handleCampaignOnClick}
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
                <PromoChat
                  promoData={
                    modifyMultiCampaignsDataForDownload(campaignsData)[0]
                  }
                  apiRoute="/api/chat"
                />
              </>
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
            {/* @ts-ignore */}
            <PromoChat promoData={promoData} apiRoute="/api/chat" />
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
  CampaignDummyData,
  CampaignSortedData,
  CampaignMetrics,
  Settings,
  DownloadableCampaignStats,
  DownloadableCampaignMetadataSample,
  PromoApiCampaignStatsData,
  CampaignStatsData,
  DashboardOptions,
};
