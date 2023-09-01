/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEventHandler } from 'react';
import { CampaignStatsData } from '../lib/types';
import { CampaignsStatsHighlights } from './CampaignsStatsHighlights';
import { CampaignsChart } from './CampaignsChart';

export function CampaignsSummaryStats({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  handleStatsHighlightClick,
}: {
  data?: CampaignStatsData[];
  statsHighlightTimeseries?: CampaignStatsData;
  statsHighlightMetricName?: string;
  handleCampaignDetailBackOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function;
}) {
  return (
    <>
      {!data ? null : (
        <>
          <CampaignsChart statsHighlightTimeseries={statsHighlightTimeseries} />
          <CampaignsStatsHighlights
            stats={data}
            handleStatsHighlightClick={handleStatsHighlightClick}
            statsHighlightMetricsName={statsHighlightMetricName || 'Spend'}
          />
        </>
      )}
    </>
  );
}
