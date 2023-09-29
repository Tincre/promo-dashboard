/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export const options = {
  defaultStatName: 'Spend', // CPC, CPM, Clicks, Views, CTR, or Spend
  timePeriods: ['1 month', '3 months', '6 months', '12 months'],
  timePeriodDayLengths: new Map([
    ['1 month', 30],
    ['3 months', 90],
    ['6 months', 180],
    ['12 months', 365],
  ]),
};
