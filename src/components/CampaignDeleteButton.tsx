/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent, ReactNode } from 'react';
import { CampaignData } from '../lib/types';
import { XCircleIcon } from '@heroicons/react/20/solid';

export function CampaignDeleteButton({
  data,
  handleDeleteButtonOnClick,
  id,
}: {
  data: CampaignData;
  handleDeleteButtonOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
  id?: string;
}) {
  return (
    <button
      aria-label={`campaign-delete-${data?.pid || 'default'}-button`}
      type="button"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        return typeof handleDeleteButtonOnClick !== 'undefined'
          ? handleDeleteButtonOnClick(event, data)
          : console.warn(
              `promo-dashboard::CampaignDeleteButton::Undefined handleDeleteButtonOnClick. Please contact the developer of this application and report this error.`
            );
      }}
      id={id}
      className="absolute inset-x-0 bottom-2 sm:bottom-10 mx-auto z-10 promo-dashboard-campaign-delete-button"
    >
      <XCircleIcon
        className="h-8 w-8 sm:h-6 sm:w-6 text-red-500 hover:text-red-800 group-hover:text-red-200 group-hover:bg-slate-800 group-hover:rounded-full"
        id="promo-dashboard-campaign-delete-button-x-circle-icon"
        aria-hidden="true"
      />
    </button>
  );
}
