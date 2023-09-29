/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent, useState } from 'react';
import { CampaignsLineChart } from './CampaignsLineChart';
import { ChartButton } from './ChartButton';
import { CampaignStatsData } from '../lib/types';

export function CampaignsChart({
  timePeriods,
  statsHighlightTimeseries,
  selectedChartButton,
  handleChartButtonOnClick,
}: {
  timePeriods: Array<string>;
  statsHighlightTimeseries?: CampaignStatsData;
  selectedChartButton: string;
  handleChartButtonOnClick: (
    event: MouseEvent<HTMLButtonElement>,
    timePeriod: string
  ) => void;
}) {
  return (
    <>
      <div className="inline-flex flex-nowrap w-full justify-center sm:justify-start">
        {timePeriods.map((timePeriod, index) => (
          <ChartButton
            key={`${timePeriod}-${index}`}
            isSelected={selectedChartButton === timePeriod}
            onClick={handleChartButtonOnClick}
          >
            {timePeriod}
          </ChartButton>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6 dark:bg-slate-700">
          {!statsHighlightTimeseries ? null : (
            <CampaignsLineChart info={statsHighlightTimeseries} />
          )}
        </div>
      </div>
    </>
  );
}
