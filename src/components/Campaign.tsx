import { useState, useEffect } from 'react';
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { IsActivePill } from './IsActivePill';
import { CampaignData } from '../lib/types';

const supportDomain = 'tincre.dev';
const getSupportLink = (data: any) =>
  `mailto:team@${supportDomain}?cc=${data.email}&subject=${data.pid}%20-%20Support%20request%20from%20${supportDomain}&body=Hi!%20I%20am%20reaching%20out%20to%20request%20support%20for%20campaign%20${data.pid}.%0A%0AMy%20issue%3A%0A%0A%0A%0ACampaign%20input%20data%3A%0A%20%20Ad%20Title%3A%20${data.adTitle}%0A%20%20Target%20link%3A%20${data.target}%0A%20%20Budget%3A%20${data.budget}%0A%20%20Ad%20Copy%3A%20${data.adCopy}%0A%20%20Call%20to%20action%3A%20${data.callToAction}%0A%20%20Button%20Text%3A%20${data.buttonText}`;

export function Campaign({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
}: {
  data: CampaignData;
  handleRepeatButtonOnClick: Function;
  handleCampaignClick: Function;
}) {
  const [isActive, setIsActive] = useState<boolean>(data?.isActive || false);
  const [imageUrl, setImageUrl] = useState<string>(data?.imageUrl || '');
  const [promoId, setPromoId] = useState<string>(data?.pid || '');
  const [budget, setBudget] = useState<string | number>(data?.budget || '250');
  const [adTitle, setAdTitle] = useState<string>(data?.adTitle || '');
  const [adCopy, setAdCopy] = useState<string>(data?.adCopy || '');
  const [isActiveClassName, setIsActiveClassName] = useState<string>('');
  const [dollarAmount, setDollarAmount] = useState<string>('');
  const [supportLink, setSupportLink] = useState<string>('');

  useEffect(() => {
    if (data?.isActive && typeof data?.isActive) {
      setIsActive(data?.isActive);
    }
    if (data?.imageUrl && typeof data?.imageUrl !== 'undefined') {
      setImageUrl(data.imageUrl);
    }
    if (data?.pid && typeof data?.pid !== 'undefined') {
      setPromoId(data.pid);
    }
    if (data?.budget && typeof data?.budget !== 'undefined') {
      setBudget(data.budget);
    }
    if (data?.adTitle && typeof data?.adTitle !== 'undefined') {
      setAdTitle(data.adTitle);
    }
    if (data?.adCopy && typeof data?.adCopy !== 'undefined') {
      setAdCopy(data.adCopy);
    }
    if (
      typeof data?.budget !== 'undefined' &&
      typeof data?.budget !== 'undefined' &&
      data?.budget &&
      data?.currency
    ) {
      setDollarAmount(`${data.budget} ${data.currency}`);
    }

    setSupportLink(getSupportLink(data));
  }, [data]);
  useEffect(() => {
    setIsActiveClassName(
      isActive
        ? 'group col-span-1 flex flex-col divide-y divide-slate-200 rounded-b-lg rounded-t-sm bg-slate-100 text-center shadow-md'
        : 'group col-span-1 flex flex-col divide-y divide-slate-200 rounded-b-lg rounded-t-sm bg-slate-50 text-center shadow-md'
    );
  }, [isActive]);
  return (
    <li key={data.email} className={isActiveClassName}>
      <button onClick={() => handleCampaignClick(data)}>
        <div className="relative flex flex-1 flex-col px-2 pt-10 pb-6 group-hover:rounded-tr-md group-hover:rounded-tl-sm group-hover:bg-slate-900">
          <IsActivePill isActive={isActive} />
          <img
            className="mx-auto h-32 w-full flex-shrink-0 rounded-b-md rounded-t-sm object-cover px-2"
            src={imageUrl}
            alt={adTitle}
          />
          <h3 className="mt-6 text-sm font-medium text-slate-900 group-hover:text-slate-200">
            {adTitle}
          </h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Ad Description</dt>
            <dd className="text-sm text-slate-500">{adCopy}</dd>
            <span className="grid grid-cols-2">
              {' '}
              <dt className="sr-only">Promo ID</dt>
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {promoId}
                </span>
              </dd>
              {dollarAmount !== '' ? (
                <>
                  <dt className="sr-only">Budget</dt>
                  <dd className="mt-3">
                    <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {dollarAmount}{' '}
                    </span>
                  </dd>
                </>
              ) : null}
            </span>
          </dl>
        </div>
      </button>
      <div>
        <div className="-mt-px flex divide-x divide-slate-200 group-hover:divide-slate-300 group-hover:bg-slate-200">
          <div className="flex w-0 flex-1">
            <a
              href={supportLink}
              target="_blank"
              rel="noreferrer"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-slate-700 hover:bg-slate-300 hover:text-slate-500 group-hover:text-slate-800"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-slate-400 group-hover:text-slate-500"
                aria-hidden="true"
              />
              <span className="ml-3">Support</span>
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              onClick={() => handleRepeatButtonOnClick(data)}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-slate-700 hover:bg-slate-300 hover:text-slate-500 group-hover:text-slate-800"
            >
              <ArrowPathIcon
                className="h-5 w-5 text-slate-400 group-hover:text-slate-500"
                aria-hidden="true"
              />
              <span className="ml-3">Repeat</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
