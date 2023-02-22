/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { CampaignData, DownloadableCampaignStatsSample } from '../lib/types';
import { useState, useEffect } from 'react';
import CsvDownload from 'react-json-to-csv';
import { now } from '../lib/date';
import { modifySingleCampaignDataForDownload } from '../lib/coerce';

const baseClassName =
  'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600';

export function DownloadAllCampaignsButton({
  campaignsData,
}: {
  campaignsData: CampaignData[];
}) {
  const [localCampaignsData, setLocalCampaignsData] = useState<
    object | undefined
  >();
  const [filename, setFileName] = useState<string | undefined>(undefined);
  useEffect(() => {
    console.debug(
      `DownloadCampaignButton component data: ${JSON.stringify(campaignsData)}`
    );
    // TODO manipulate what needs manipulating
    // https://gitlab.com/tincre/promo-dashboard/-/issues/9#note_1288818082
    setLocalCampaignsData(campaignsData);
  }, [setLocalCampaignsData, campaignsData]);
  useEffect(() => {
    setFileName(`all-campaigns_${now()}.csv`);
  }, []);
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
  const [localCampaignData, setLocalCampaignData] = useState<
    DownloadableCampaignStatsSample[] | undefined
  >();
  const [filename, setFilename] = useState<string | undefined>();
  useEffect(() => {
    // TODO manipulate what needs manipulating
    // https://gitlab.com/tincre/promo-dashboard/-/issues/9#note_1288818082
    const modifiedCampaignData =
      modifySingleCampaignDataForDownload(campaignData);
    console.debug(
      `DownloadCampaignButton component data: ${JSON.stringify(
        modifiedCampaignData
      )}`
    );
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
      headers={[
        'pid',
        'updatedTime',
        'spend',
        'reach',
        'views',
        'clicks',
        'cpc',
        'cpm',
        'ctr',
        'cpv',
      ]}
    >
      Download
    </CsvDownload>
  ) : null;
}
