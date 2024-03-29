/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useState, useEffect, MouseEvent, FunctionComponent } from 'react';
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
  CampaignDummyData,
  CampaignMetrics,
  CampaignSortedData,
} from '@tincre/promo-types';
import { usePromoDashboardData } from './lib/hooks/usePromoDashboardData';
import { CampaignsSummaryStats } from './components/CampaignsSummaryStats';
import { Spinner } from './components/Spinner';
import { NoData } from './components/NoData';
import { CampaignList } from './components/CampaignList';
import { DashboardContainer } from './components/DashboardContainer';
import { options } from './lib/options';
import { DownloadAllCampaignsButton } from './components/DownloadButton';
import { tourSteps } from './lib/tourSteps';

export function PromoDashboard({
  campaignsData,
  campaignDetailData,
  profileSettingsData,
  isLoading,
  handleRepeatButtonClick,
  handleCampaignTypeButtonClick,
  handleSettingsSaveButtonClick,
  handleGeneratePaymentLinkButtonClick,
  handleDeleteButtonClick,
  handleCampaignClick,
  handleCampaignDetailBackClick,
  PromoChat,
  dashboardOptions,
}: {
  campaignsData?: CampaignData[] | CampaignDummyData[];
  campaignDetailData?: CampaignData | CampaignDummyData;
  profileSettingsData?: Settings;
  isLoading?: boolean;
  handleRepeatButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignDetailData: CampaignData | CampaignDummyData
  ) => void;
  handleCampaignTypeButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    campaignType?: string
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
  PromoChat: FunctionComponent<any>;
  dashboardOptions?: DashboardOptions;
}) {
  const [promoData, setPromoData] = useState<
    CampaignData | CampaignDummyData | undefined
  >(undefined);
  const [isRepeatButtonClicked, setIsRepeatButtonClicked] =
    useState<boolean>(false);
  const [isPaymentButtonClicked, setIsPaymentButtonClicked] =
    useState<boolean>(false);
  const [isCampaignClicked, setIsCampaignClicked] = useState<boolean>(false);
  const [hasUpdatedSettings, setHasUpdatedSettings] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [statsHighlightTimeseries, setStatsHighlightTimeseries] = useState<
    CampaignStatsData | undefined
  >(undefined);
  const [defaultCampaignTypeContent] = useState<
    { name: string; description?: string; icon?: string; color?: string }[]
  >([...options.campaignTypes, ...(dashboardOptions?.campaignTypes || [])]);
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
  const [deletedCampaigns, setDeletedCampaigns] = useState<string[]>([]);
  let { sortedCampaignsData, statsCampaignsData, numberOfActiveCampaigns } =
    usePromoDashboardData(campaignsData, deletedCampaigns);

  useEffect(() => {
    if (typeof campaignDetailData !== 'undefined') {
      setPromoData(campaignDetailData);
    }
  }, [campaignDetailData, setPromoData]);
  useEffect(() => {
    // set initial Spend timeseries aggregated data
    if (typeof statsCampaignsData !== 'undefined') {
      setStatsHighlightCampaignsTimeseries(statsCampaignsData[0]);
    }
  }, [statsCampaignsData]);
  useEffect(() => {
    if (isUpdatingSettings) infoToast('Settings are being updated.');
  }, [isUpdatingSettings]);
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
  const handleCampaignTypeButtonOnClick = (
    event: MouseEvent<HTMLButtonElement>,
    eventType?: string
  ) => {};
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
      if (response?.status !== 200) {
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
      data.data.forEach((campaignStats: CampaignStatsData) => {
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
        {typeof campaignsData !== 'undefined' ? (
          <>
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
                      statsHighlightTimeseries={
                        statsHighlightCampaignsTimeseries
                      }
                      statsHighlightMetricName={clickedStatsCampaignsClassName}
                      campaignData={sortedCampaignsData}
                      isTableCollapsed={dashboardOptions?.isTableCollapsed}
                      handleCampaignClick={handleCampaignOnClick}
                      handleCampaignDetailBackOnClick={
                        handleCampaignDetailBackOnClick
                      }
                      handleStatsHighlightClick={
                        handleStatsHighlightCampaignsClick
                      }
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
                        typeof handleGeneratePaymentLinkButtonClick !==
                        'undefined'
                          ? handleGeneratePaymentLinkButtonClick
                          : handleGeneratePaymentLinkButtonOnClick
                      }
                      handleDeleteButtonOnClick={
                        typeof handleDeleteButtonClick !== 'undefined'
                          ? handleDeleteButtonClick
                          : handleDeleteButtonOnClick
                      }
                      deletedCampaigns={deletedCampaigns}
                      dashboardOptions={dashboardOptions}
                    />
                    {typeof campaignsData !== 'undefined' ? (
                      <div className=""></div>
                    ) : null}
                  </>
                )}
              </>
            ) : typeof promoData !== 'undefined' ? (
              <>
                <CampaignDetail
                  data={promoData}
                  statsHighlightTimeseries={statsHighlightTimeseries}
                  statsHighlightMetricName={clickedStatsClassName}
                  handleCampaignDetailBackOnClick={
                    handleCampaignDetailBackOnClick
                  }
                  handleStatsHighlightClick={handleStatsHighlightClick}
                />
              </>
            ) : null}
          </>
        ) : (
          <>
            <NoData
              campaignTypes={defaultCampaignTypeContent}
              handleCampaignTypeButtonClick={
                handleCampaignTypeButtonClick || handleCampaignTypeButtonOnClick
              }
            />
          </>
        )}
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
      {!isCampaignClicked ? (
        <PromoChat
          promoData={sortedCampaignsData}
          apiRoute={dashboardOptions?.promoChatApiRoute || '/api/chat'}
          startingAgentMessage={dashboardOptions?.promoChatStartingAgentMessage}
          agentName={dashboardOptions?.promoChatAgentName}
          inputMessagePlaceholder={
            dashboardOptions?.promoChatInputMessagePlaceholder
          }
          executeRecaptcha={dashboardOptions?.promoChatExecuteRecaptcha}
          supportEmail={`${dashboardOptions?.emailLocalPart}@${dashboardOptions?.emailDomain}`}
        />
      ) : typeof promoData !== 'undefined' ? (
        <PromoChat
          promoData={promoData}
          apiRoute={dashboardOptions?.promoChatApiRoute || '/api/chat'}
          startingAgentMessage={dashboardOptions?.promoChatStartingAgentMessage}
          agentName={dashboardOptions?.promoChatAgentName}
          inputMessagePlaceholder={
            dashboardOptions?.promoChatInputMessagePlaceholder
          }
          executeRecaptcha={dashboardOptions?.promoChatExecuteRecaptcha}
        />
      ) : null}
      <Toaster position="bottom-center" />
    </>
  );
}
export {
  tourSteps as promoDashboardTourSteps,
  successToast,
  infoToast,
  failureToast,
  options,
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
