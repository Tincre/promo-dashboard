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

export interface DownloadableCampaignMetadataSample
  extends DownloadableCampaignStatsSample {
  adTitle?: string;
  budget?: number | string;
  target?: string;
  isActive?: boolean;
  adCallToAction?: string;
  buttonText?: string;
  creativeUrl: string;
}

export interface PromoApiCampaignStatsSample {
  updatedTime: string;
  spend?: number | string | null;
  reach?: number | string | null;
  views?: number | string | null;
  clicks?: number | string | null;
  cpc?: number | string | null;
  ctr?: number | string | null;
  cpm?: number | string | null;
  cpv?: number | string | null;
}

export interface CampaignStatsSample {
  name: string;
}

export interface PromoApiCampaignStatsData {
  totals?: CampaignStatsSample[];
  google?: CampaignStatsSample[];
  meta?: CampaignStatsSample[];
}

export interface DownloadableCampaignStats {
  updatedTime: (string | null)[];
  spend?: (number | string | null)[];
  reach?: (number | string | null)[];
  views?: (number | string | null)[];
  clicks?: (number | string | null)[];
  cpc?: (number | string | null)[];
  cpm?: (number | string | null)[];
  ctr?: (number | string | null)[];
  cpv?: (number | string | null)[];
  pid: (string | null)[];
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
  receiptId?: string;
  currency?: string;
  isFlat?: boolean;
  usageFee?: string | number;
  stats?: CampaignStatsData[];
  data?: CampaignStatsData[];
}

export interface Settings {
  fullName?: string;
  image?: string;
  userName?: string;
  email?: string;
}
