/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { ReactNode } from 'react';

export function DashboardContainer({
  children,
  isLoading,
}: {
  children?: ReactNode;
  isLoading?: boolean;
}) {
  return isLoading ? (
    <div
      className="transition ease-out duration-300 animate-pulse opacity-25 mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
      id="promo-dashboard-container"
    >
      {children}
    </div>
  ) : (
    <div
      className="transition ease-in-out duration-500 mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
      id="promo-dashboard-container"
    >
      {children}
    </div>
  );
}
