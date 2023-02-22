/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export interface DownloadableCampaignStatsSample
  extends PromoApiCampaignStatsSample {
  pid: string;
}
export interface PromoApiCampaignStatsSample {
  updatedTime: string;
  spend?: number | null;
  reach?: number | null;
  views?: number | null;
  clicks?: number | null;
  cpc?: number | null;
  ctr?: number | null;
  cpm?: number | null;
  cpv?: number | null;
}
export interface CampaignStatsSample {
  name: string;
}
export interface PromoApiCampaignStatsData {
  totals?: CampaignStatsSample[];
  google?: CampaignStatsSample[];
  meta?: CampaignStatsSample[];
}
export interface CampaignStatsData {
  id: number;
  name: string;
  stat: string;
  change: string | number;
  changeType: string;
  chartData: {
    labels: (string | null)[];
    data: (string | number | null)[];
  };
}

export interface DownloadableCampaignStats {
  updatedTime: (string | null)[];
  spend: (number | null)[];
  reach?: (number | null)[];
  views: (number | null)[];
  clicks: (number | null)[];
  cpc: (number | null)[];
  cpm: (number | null)[];
  ctr: (number | null)[];
  cpv: (number | null)[];
  pid: (string | null)[];
}
export interface CampaignData {
  pid?: string;
  email?: string;
  adTitle?: string;
  budget?: string | number;
  description?: string;
  target?: string;
  adCopy?: string;
  creativeUrls?: string[];
  adCallToAction?: string;
  buttonText?: string;
  isActive?: boolean;
  currency?: string;
  stats?: object[];
  data?: CampaignStatsData[];
}
export interface Settings {
  fullName?: string;
  image?: string;
  userName?: string;
  email?: string;
}
