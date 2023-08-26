/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent, ReactNode } from 'react';
import { CampaignData, CampaignDummyData } from '../lib/types';
import { CreditCardIcon } from '@heroicons/react/20/solid';

export function CampaignPaymentButton({
  data,
  handleGeneratePaymentLinkButtonClick,
  id,
  children,
}: {
  data: CampaignData | CampaignDummyData;
  handleGeneratePaymentLinkButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="-ml-px flex w-0 flex-1 promo-dashboard-campaign-repeat-button">
      <button
        aria-label={`campaign-${data.pid}-payment-button`}
        type="button"
        id={`${id}-payment-button`}
        onClick={(event) =>
          typeof handleGeneratePaymentLinkButtonClick !== 'undefined'
            ? handleGeneratePaymentLinkButtonClick(event, data)
            : console.warn(
                `promo-dashboard::CampaignPaymentButton::Undefined handleGeneratePaymentLinkButtonClick. Please contact the application developer and report this error, thanks!`
              )
        }
        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-300 hover:text-slate-500 group-hover:text-slate-800"
      >
        <CreditCardIcon
          className="h-5 w-5 text-slate-400 group-hover:text-slate-500"
          aria-hidden="true"
        />
        <span className="ml-3">{children || 'Payment'}</span>
      </button>
    </div>
  );
}
