import { Button } from './Button';
import { MouseEventHandler } from 'react';
import { CampaignData } from '../lib/types';
import { StatsHighlights } from './StatsHighlights';
import { CampaignImageChart } from './CampaignImageChart';
import { DownloadCampaignButton } from './DownloadButton';

export function CampaignDetail({
  data,
  statsHighlightTimeseries,
  statsHighlightMetricName,
  handleCampaignDetailBackOnClick,
  handleStatsHighlightClick,
}: {
  data: CampaignData;
  statsHighlightTimeseries?: object;
  statsHighlightMetricName?: string;
  handleCampaignDetailBackOnClick: MouseEventHandler<HTMLButtonElement>;
  handleStatsHighlightClick?: Function;
}) {
  return (
    <>
      <div className="inline-flex w-full">
        <Button
          className="mx-2 mt-2 inline"
          onClick={handleCampaignDetailBackOnClick}
        >
          Back
        </Button>
        <h1 className="mt-auto mx-2 w-full text-center align-text-bottom text-2xl font-bold">
          {data.pid}
        </h1>
        <span className="mt-auto mx-2">
          <DownloadCampaignButton campaignData={data} />
        </span>
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
        onClick={handleCampaignDetailBackOnClick}
      >
        Back
      </Button>
    </>
  );
}
