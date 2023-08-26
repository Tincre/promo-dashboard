/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {
  CampaignData,
  CampaignDummyData,
  DownloadableCampaignStatsSample,
  DownloadableCampaignMetadataSample,
} from '../lib/types';
import { useState, useEffect } from 'react';
import CsvDownload from 'react-json-to-csv';
import { now } from '../lib/date';
import {
  modifySingleCampaignDataForDownload,
  modifyMultiCampaignsDataForDownload,
} from '../lib/coerce';

const baseClassName =
  'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600';

const SINGLE_CAMPAIGN_DOWNLOAD_HEADERS = [
  'pid',
  'updatedTime',
  'spend',
  'views',
  'clicks',
  'cpc',
  'cpm',
  'ctr',
  'cpv',
];

export function DownloadAllCampaignsButton({
  campaignsData,
}: {
  campaignsData: CampaignData[] | CampaignDummyData[];
}) {
  const [localCampaignsData, setLocalCampaignsData] = useState<
    DownloadableCampaignMetadataSample[] | undefined
  >();
  const [filename, setFileName] = useState<string | undefined>(undefined);
  useEffect(() => {
    const modified = modifyMultiCampaignsDataForDownload(campaignsData);
    setLocalCampaignsData(modified);
  }, [setLocalCampaignsData, campaignsData]);
  useEffect(() => {
    setFileName(`all-campaigns_${now()}.csv`);
  }, []);
  return (
    <div className="mt-12">
      {typeof localCampaignsData !== 'undefined' ? (
        <CsvDownload
          className={baseClassName}
          data={localCampaignsData}
          delimiter=","
          id="download-all-campaigns-button"
          style={{ display: 'inline' }}
          filename={filename}
        >
          Download Data
        </CsvDownload>
      ) : null}
    </div>
  );
}
export function DownloadCampaignButton({
  campaignData,
}: {
  campaignData: CampaignData;
}) {
  const [localCampaignData, setLocalCampaignData] = useState<
    DownloadableCampaignStatsSample[] | undefined
  >();
  const [filename, setFilename] = useState<string | undefined>();
  useEffect(() => {
    const modifiedCampaignData =
      modifySingleCampaignDataForDownload(campaignData);
    setLocalCampaignData(modifiedCampaignData);
  }, [setLocalCampaignData, campaignData]);
  useEffect(() => {
    if (typeof campaignData !== 'undefined') {
      setFilename(`${campaignData.pid}_${now()}.csv`);
    }
  }, [campaignData]);
  return typeof localCampaignData !== 'undefined' ? (
    <CsvDownload
      className={baseClassName}
      data={localCampaignData}
      style={{ display: 'inline' }}
      filename={filename}
      headers={SINGLE_CAMPAIGN_DOWNLOAD_HEADERS}
      id="promo-dashboard-download-campaign-button"
    >
      Download
    </CsvDownload>
  ) : null;
}
