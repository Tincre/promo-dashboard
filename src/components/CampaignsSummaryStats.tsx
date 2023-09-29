/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react';
import { CampaignStatsData, CampaignData } from '../lib/types';
import { CampaignsStatsHighlights } from './CampaignsStatsHighlights';
import { CampaignsChart } from './CampaignsChart';
import { merge } from '../lib/merge';
import { options } from '../lib/options';
import { disectChartData } from '../lib/disectChartData';
import { CampaignsTable } from './CampaignsTable';
export function CampaignsSummaryStats({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  campaignData,
  handleStatsHighlightClick,
}: {
  data?: CampaignStatsData[];
  statsHighlightTimeseries?: CampaignStatsData;
  statsHighlightMetricName?: string;
  campaignData: CampaignData[];
  handleCampaignDetailBackOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function /* TODO type this */;
}) {
  const [selectedChartButton, setSelectedChartButton] = useState(
    options.timePeriods[0]
  );
  const [
    internalStatsHighlightTimeseries,
    setInternalStatsHighlightTimeseries,
  ] = useState<CampaignStatsData | undefined>();
  useEffect(() => {
    if (typeof statsHighlightTimeseries !== 'undefined') {
      setInternalStatsHighlightTimeseries(
        merge(statsHighlightTimeseries, {
          chartData: disectChartData(
            statsHighlightTimeseries?.chartData?.labels as (string | null)[],
            statsHighlightTimeseries?.chartData?.data as (
              | string
              | null
              | number
            )[],
            options.timePeriodDayLengths.get(selectedChartButton) || 30
          ),
        }) as CampaignStatsData
      );
    }
  }, [statsHighlightTimeseries]);
  const handleChartButtonOnClick = async (
    event: MouseEvent<HTMLButtonElement>,
    buttonType: string
  ) => {
    event.preventDefault();
    setSelectedChartButton(buttonType);
    setInternalStatsHighlightTimeseries(
      merge(internalStatsHighlightTimeseries || {}, {
        chartData: disectChartData(
          statsHighlightTimeseries?.chartData?.labels || [],
          statsHighlightTimeseries?.chartData?.data || [],
          options.timePeriodDayLengths.get(buttonType) || 30
        ),
      }) as CampaignStatsData
    );
  };
  return (
    <>
      {!data ? null : (
        <>
          <CampaignsChart
            timePeriods={options.timePeriods}
            statsHighlightTimeseries={internalStatsHighlightTimeseries}
            selectedChartButton={selectedChartButton}
            handleChartButtonOnClick={handleChartButtonOnClick}
          />
          <CampaignsStatsHighlights
            stats={data}
            handleStatsHighlightClick={handleStatsHighlightClick}
            statsHighlightMetricsName={statsHighlightMetricName || 'Spend'}
          />
          <CampaignsTable data={campaignData} />
        </>
      )}
    </>
  );
}
