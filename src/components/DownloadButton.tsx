import { CampaignData } from '../lib/types';
import { useState, useEffect } from 'react';
import CsvDownload from 'react-json-to-csv';
import { now } from '../lib/date';

const baseClassName =
  'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600';

export function DownloadAllCampaignsButton({
  campaignsData,
}: {
  campaignsData: CampaignData[];
}) {
  const [localCampaignsData, setLocalCampaignsData] = useState<object>({});
  useEffect(() => {
    console.debug(
      `DownloadCampaignButton component data: ${JSON.stringify(campaignsData)}`
    );
    setLocalCampaignsData(campaignsData);
  }, [setLocalCampaignsData, campaignsData]);
  /* @ts-ignore */
  const filename = `all-campaigns_${now()}.csv`;

  return (
    <div className="mt-12">
      <CsvDownload
        className={baseClassName}
        data={[localCampaignsData]}
        style={{ display: 'inline' }}
        filename={filename}
      >
        Download Data
      </CsvDownload>
    </div>
  );
}
export function DownloadCampaignButton({
  campaignData,
}: {
  campaignData: CampaignData;
}) {
  const [localCampaignData, setLocalCampaignData] = useState<object>({});
  useEffect(() => {
    console.debug(
      `DownloadCampaignButton component data: ${JSON.stringify(campaignData)}`
    );
    setLocalCampaignData(campaignData);
  }, [setLocalCampaignData, campaignData]);
  /* @ts-ignore */
  const filename = `${localCampaignData.pid}_${now()}.csv`;
  return (
    <CsvDownload
      className={baseClassName}
      data={[localCampaignData]}
      style={{ display: 'inline' }}
      filename={filename}
    >
      Download
    </CsvDownload>
  );
}
