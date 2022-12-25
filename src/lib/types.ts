/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export interface CampaignData {
  pid?: string;
  email?: string;
  adTitle?: string;
  budget?: string | number;
  description?: string;
  target?: string;
  adCopy?: string;
  imageUrl?: string;
  adCallToAction?: string;
  buttonText?: string;
  isActive?: boolean;
  currency?: string;
  stats?: object[];
}
export interface Settings {
  fullName?: string;
  image?: string;
  userName?: string;
  email?: string;
}
