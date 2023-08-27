/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useState } from 'react';
import { MouseEventHandler } from 'react';
import {
  CampaignData,
  CampaignDummyData,
  PromoApiCampaignStatsSample,
  CampaignStatsData,
} from '../lib/types';
import { CampaignsStatsHighlights } from './CampaignsStatsHighlights';
import { CampaignsChart } from './CampaignsChart';

export function CampaignsSummaryStats({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  handleCampaignDetailBackOnClick,
  handleStatsHighlightClick,
}: {
  data?: CampaignDummyData[] | CampaignData[];
  statsHighlightTimeseries?: CampaignStatsData;
  statsHighlightMetricName?: string;
  handleCampaignDetailBackOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function;
}) {
  return (
    <>
      {!data ? null : (
        <>
          <CampaignsChart
            data={data[0]}
            statsHighlightTimeseries={statsHighlightTimeseries}
          />
          <CampaignsStatsHighlights /* @ts-ignore */
            stats={data[0]?.data || data[0]?.stats || []}
            handleStatsHighlightClick={handleStatsHighlightClick}
            statsHighlightMetricsName={statsHighlightMetricName || 'Spend'}
          />
        </>
      )}
    </>
  );
}
