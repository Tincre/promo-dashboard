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
  const endLabelSliceIdx = labels.length;
  const endDataSliceIdx = data.length;
  const startLabelIdx = Math.max(0, endLabelSliceIdx - length);
  const startDataIdx = Math.max(0, endDataSliceIdx - length);
  return {
    labels: labels.slice(startLabelIdx, endLabelSliceIdx),
    data: data.slice(startDataIdx, endDataSliceIdx),
  };
}
