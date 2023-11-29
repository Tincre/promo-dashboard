/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { CampaignData, CampaignDummyData } from './types';
import { compareDates } from './compareDates';
export function sortCampaignDataOnIsActive(
  data: CampaignData[] | CampaignDummyData[]
) {
  let newArray = data.sort((campaign: CampaignData | CampaignDummyData) =>
    campaign?.isActive ? -1 : 1
  );
  return newArray;
}
export function sortCampaignDataOnIsActiveAndReceiptId(
  data: CampaignData[] | CampaignDummyData[]
) {
  let newArray = data.sort((campaign: CampaignData | CampaignDummyData) =>
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

export function sortCampaignDataOnIsActiveAndReceiptIdByDate(
  data: CampaignData[] | CampaignDummyData[],
  isAscending?: boolean
) {
  let runningCampaigns: CampaignData[] = [];
  let completedCampaigns: CampaignData[] = [];
  let inactiveCampaigns: CampaignData[] = [];
  let unpaidCampaigns: CampaignData[] = [];
  data.forEach((campaign: CampaignData | CampaignDummyData) => {
    if (campaign?.isActive && campaign?.receiptId) {
      // @ts-ignore
      runningCampaigns.push(campaign);
      return;
    }
    if (campaign?.isActive && !campaign?.receiptId) {
      // @ts-ignore
      unpaidCampaigns.push(campaign);
      return;
    }
    if (!campaign?.isActive && campaign?.receiptId) {
      // @ts-ignore
      completedCampaigns.push(campaign);
      return;
    } // @ts-ignore
    inactiveCampaigns.push(campaign);
  });

  return [
    ...runningCampaigns.sort((a, b) => compareDates(a, b, isAscending)),
    ...completedCampaigns.sort((a, b) => compareDates(a, b, isAscending)),
    ...unpaidCampaigns.sort((a, b) => compareDates(a, b, isAscending)),
    ...inactiveCampaigns.sort((a, b) => compareDates(a, b, isAscending)),
  ];
}

export const numActiveCampaigns = (
  sortedCampaignsData: CampaignData[] | CampaignDummyData[],
  exclusions: string[] = []
) => {
  let activeCampaigns = 0;
  sortedCampaignsData.forEach((campaign) => {
    const pid = `${campaign.pid}`;
    if (!exclusions.includes(pid)) {
      if (campaign.isActive) activeCampaigns += 1;
    }
  });
  return activeCampaigns;
};
