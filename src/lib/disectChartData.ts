/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export function disectChartData(
  labels: (string | null)[],
  data: (string | number | null)[],
  length: number
) {
  const endLabelIdx = labels.length - 1;
  const endDataIdx = data.length - 1;
  const startLabelIdx = Math.max(0, endLabelIdx - length);
  const startDataIdx = Math.max(0, endDataIdx - length);
  return {
    labels: labels.slice(startLabelIdx, endLabelIdx),
    data: data.slice(startDataIdx, endDataIdx),
  };
}
