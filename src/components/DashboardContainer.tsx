/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { ReactNode } from 'react';

export function DashboardContainer({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {children}
    </div>
  );
}
