/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useState, useEffect } from 'react';

export function getIsPaidClassName(isPaid: boolean) {
  return !isPaid
    ? 'absolute top-0 left-0 rounded-br-lg rounded-tl-sm bg-red-300 px-2 py-1 text-xs font-medium text-gray-900 group-hover:bg-gray-700 group-hover:text-gray-200'
    : 'hidden absolute top-0 left-0 rounded-br-lg rounded-tl-sm bg-green-200 px-2 py-1 text-xs font-medium text-green-800 group-hover:bg-green-800 group-hover:text-green-200';
}
export function IsPaidPill({ isPaid }: { isPaid: boolean }) {
  const [isPaidPillClassName, setIsPaidPillClassName] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    setIsPaidPillClassName(getIsPaidClassName(isPaid));
  }, [isPaid]);

  return (
    <span className={isPaidPillClassName}>{isPaid ? 'PAID' : 'UNPAID'}</span>
  );
}
