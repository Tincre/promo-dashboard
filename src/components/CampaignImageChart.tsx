/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { AdPreviewDetailImage } from './AdPreviewDetailImage';
import { LineChart } from './LineChart';
import {
  CampaignData,
  CampaignDummyData,
  CampaignStatsData,
} from '../lib/types';

export function CampaignImageChart({
  data,
  statsHighlightTimeseries,
}: {
  data: CampaignData | CampaignDummyData;
  statsHighlightTimeseries?: CampaignStatsData;
}) {
  const defaultData = Array.isArray(data?.data) ? data.data[0] : undefined;
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-700 px-4 py-5 shadow sm:px-6 sm:py-6">
        <AdPreviewDetailImage
          creativeUrl={
            data && data?.creativeUrls && data.creativeUrls.length !== 0
              ? data.creativeUrls[0]
              : '' /* TODO update w/cloudinary array */
          }
        />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6 dark:bg-slate-700">
        {!data?.data || !statsHighlightTimeseries ? null : (
          <LineChart info={statsHighlightTimeseries || defaultData} />
        )}
      </div>
    </div>
  );
}
