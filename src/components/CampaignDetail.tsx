/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { MouseEventHandler } from 'react';
import {
  CampaignData,
  CampaignDummyData,
  CampaignStatsData,
  CampaignMetrics,
} from '../lib/types';
import { StatsHighlights } from './StatsHighlights';
import { CampaignImageChart } from './CampaignImageChart';
import { DownloadCampaignButton } from './DownloadButton';
import { copyToast, failureToast } from '../lib/notifications';

export function CampaignDetail({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  handleCampaignDetailBackOnClick,
  handleStatsHighlightClick,
}: {
  data?: CampaignDummyData | CampaignData;
  statsHighlightTimeseries?: CampaignStatsData;
  statsHighlightMetricName?: CampaignMetrics;
  handleCampaignDetailBackOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function;
}) {
  const [hasClickedPid, setHasClickedPid] = useState<boolean>(false);
  const copyToClipboardEffect = async (toCopy: string) => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setHasClickedPid(false);
    } catch (err) {
      setHasClickedPid(false);
      failureToast(
        `Oh no! Something went wrong and your campaign ID was not copied to your clipboard.`
      );
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (hasClickedPid === true && typeof data?.pid !== 'undefined') {
      copyToClipboardEffect(data?.pid);
      copyToast(`Campaign ID successfully copied to your clipboard.`);
    }
  }, [hasClickedPid]);

  return (
    <>
      <div className="inline-flex w-full">
        <Button
          className="mx-2 mt-2 inline"
          onClick={handleCampaignDetailBackOnClick}
          aria-label="promo-dashboard-campaign-detail-back-button"
          id="promo-dashboard-campaign-detail-back-button"
        >
          Back
        </Button>
        <h1 className="mt-auto mx-2 w-full text-center align-text-bottom text-2xl font-bold">
          <button
            className="hover:cursor-copy hover:text-bold hover:text-gray-50 dark:text-slate-200 dark:hover:text-slate-100"
            onClick={() => setHasClickedPid(true)}
            id="promo-dashboard-campaign-detail-pid-button"
          >
            {data?.pid || ''}
          </button>
        </h1>
        <span className="mt-auto mx-2">
          {!data ? null : <DownloadCampaignButton campaignData={data} />}
        </span>
      </div>
      {!data ? null : (
        <CampaignImageChart
          data={data}
          statsHighlightTimeseries={statsHighlightTimeseries}
        />
      )}
      <StatsHighlights /* @ts-ignore */
        stats={
          Array.isArray(data?.data)
            ? data?.data || data?.stats
            : data?.stats || data?.stats || []
        }
        handleStatsHighlightClick={handleStatsHighlightClick}
        statsHighlightMetricsName={statsHighlightMetricName || 'Spend'}
      />
      <Button
        className="mx-2 mt-4 mb-2 sm:hidden"
        onClick={handleCampaignDetailBackOnClick}
      >
        Back
      </Button>
    </>
  );
}
