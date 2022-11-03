import { Button } from './Button';
import { MouseEventHandler } from 'react';
import { CampaignData } from '../lib/types';
import { StatsHighlights } from './StatsHighlights';
import { CampaignImageChart } from './CampaignImageChart';

export function CampaignDetail({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  handleCampaignDetailOnClick,
  handleStatsHighlightClick,
}: {
  data: CampaignData;
  statsHighlightTimeseries?: object;
  statsHighlightMetricName?: string;
  handleCampaignDetailOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function;
}) {
  return (
    <>
      <div className="inline-flex w-full">
        <Button
          className="mx-2 mt-2 inline"
          onClick={handleCampaignDetailOnClick}
        >
          Back
        </Button>
        <h1 className="mt-auto mr-2 w-full text-right align-text-bottom text-2xl font-bold">
          {data.pid}
        </h1>
      </div>
      <CampaignImageChart
        data={data}
        statsHighlightTimeseries={statsHighlightTimeseries}
      />
      <StatsHighlights
        stats={data?.stats || []}
        handleStatsHighlightClick={handleStatsHighlightClick}
        statsHighlightMetricsName={statsHighlightMetricName || 'Spend'}
      />
      {/*@ts-ignore*/}
      <Button
        className="mx-2 mt-4 mb-2 sm:hidden"
        onClick={handleCampaignDetailOnClick}
      >
        Back
      </Button>
    </>
  );
}
