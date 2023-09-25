/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export function now() {
  const event = new Date();
  return event.toISOString().slice(0, 10); // don't include time
}

export function generateDateRange(
  startDate: Date,
  endDate?: Date,
  includeEndDate?: boolean
) {
  const dates = [];
  const currentDate = startDate;
  if (typeof endDate === 'undefined') endDate = new Date();
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
}

export function generateStringDateRanges(
  startDate: string,
  endDate?: string,
  includeEndDate?: boolean
) {
  const tmpDates: Date[] =
    typeof endDate !== 'undefined'
      ? generateDateRange(
          new Date(startDate),
          new Date(endDate),
          includeEndDate
        )
      : generateDateRange(new Date(startDate), undefined, includeEndDate);
  return tmpDates.map((date) => {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (!Number.isNaN(date.valueOf())) {
        return date.toISOString().slice(0, 10);
      }
    }
    return new Date().toISOString().slice(0, 10);
  });
}
export function generateDates(length: number, endDate?: Date) {
  const dates: string[] = [];
  const currentDate = endDate || new Date();
  for (let i: number = length; i > 0; i--) {
    let tmpDate = new Date(currentDate);
    dates.push(tmpDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return dates.reverse();
}
