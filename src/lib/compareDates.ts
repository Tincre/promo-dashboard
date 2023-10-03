/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { CampaignData, CampaignDummyData } from './types';

/*
 * Given data packages compare their dates.
 *
 */
export function compareDates(
  a: CampaignData | CampaignDummyData,
  b: CampaignData | CampaignDummyData,
  isAscending: boolean = true
) {
  let today = new Date();
  let aStartDate =
    typeof a.startDate !== 'undefined' ? new Date(a.startDate) : today;
  let bStartDate =
    typeof b.startDate !== 'undefined' ? new Date(b.startDate) : today;
  return !isAscending
    ? aStartDate.getTime() - bStartDate.getTime()
    : bStartDate.getTime() - aStartDate.getTime();
}
