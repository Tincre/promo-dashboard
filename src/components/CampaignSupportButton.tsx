/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { ReactNode } from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

export function CampaignSupportButton({
  supportLink,
  children,
  id,
}: {
  supportLink: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div
      className="flex w-0 flex-1 promo-dashboard-campaign-support-button"
      id={`${id}-support-button`}
    >
      <a
        href={supportLink}
        target="_blank"
        rel="noreferrer"
        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-300 hover:text-slate-500 group-hover:text-slate-800"
      >
        <EnvelopeIcon
          className="h-5 w-5 text-slate-400 group-hover:text-slate-500"
          aria-hidden="true"
        />
        <span className="ml-3">{children || 'Support'}</span>
      </a>
    </div>
  );
}
