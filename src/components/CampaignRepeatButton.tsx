import { MouseEvent, ReactNode } from 'react';
import { CampaignData } from '../lib/types';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

export function CampaignRepeatButton({
  data,
  handleRepeatButtonOnClick,
  children,
}: {
  data: CampaignData;
  handleRepeatButtonOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
  children?: ReactNode;
}) {
  return (
    <div className="-ml-px flex w-0 flex-1 promo-dashboard-campaign-repeat-button">
      <button
        aria-label={`campaign-${data.pid}-repeat-button`}
        type="button"
        onClick={(event) =>
          typeof handleRepeatButtonOnClick !== 'undefined'
            ? handleRepeatButtonOnClick(event, data)
            : console.debug(
                `promo-dashboard::CampaignRepeatButton::Undefined handleRepeatButtonOnClick`
              )
        }
        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-slate-700 hover:bg-slate-300 hover:text-slate-500 group-hover:text-slate-800"
      >
        <ArrowPathIcon
          className="h-5 w-5 text-slate-400 group-hover:text-slate-500"
          aria-hidden="true"
        />
        <span className="ml-3">{children || 'Repeat'}</span>
      </button>
    </div>
  );
}
