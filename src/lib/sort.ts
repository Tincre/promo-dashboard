/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { CampaignData } from './types';

export function sortCampaignDataOnIsActive(data: CampaignData[]) {
  let newArray = data.sort((campaign: CampaignData) =>
    campaign?.isActive ? -1 : 1
  );
  return newArray;
}
export function sortCampaignDataOnIsActiveAndReceiptId(data: CampaignData[]) {
  let newArray = data.sort((campaign: CampaignData) =>
    campaign?.isActive && campaign?.receiptId
      ? -1
      : campaign?.isActive
      ? campaign?.receiptId
        ? -1
        : 1
      : 1
  );
  return newArray;
}
export const numActiveCampaigns = (
  sortedCampaignsData: CampaignData[],
  exclusions: string[] = []
) => {
  let activeCampaigns = 0;
  sortedCampaignsData.map((campaign) => {
    const pid = `${campaign.pid}`;
    if (!exclusions.includes(pid)) {
      campaign.isActive ? (activeCampaigns += 1) : null;
    }
  });
  return activeCampaigns;
};
