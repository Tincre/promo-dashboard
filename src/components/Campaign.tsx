/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useState, useEffect, MouseEvent, ReactNode } from 'react';
import { IsActivePill } from './IsActivePill';
import { IsPaidPill } from './IsPaidPill';
import { CampaignData } from '../lib/types';
import { CampaignRepeatButton } from './CampaignRepeatButton';
import { CampaignSupportButton } from './CampaignSupportButton';
import { CampaignPaymentButton } from './CampaignPaymentButton';

const supportDomain = 'tincre.dev';
const getSupportLink = (data: any) =>
  `mailto:team@${supportDomain}?subject=${
    data.pid
  }%20-%20Support%20request%20from%20${supportDomain}&body=Hi!%20I%20am%20reaching%20out%20to%20request%20support%20for%20campaign%20${
    data.pid
  }.%0A%0AMy%20issue%3A%0A%0A%0A%0ACampaign%20input%20data%3A%0A%20%20Ad%20Title%3A%20${
    data?.adTitle || ''
  }%0A%20%20Target%20link%3A%20${data?.target || ''}%0A%20%20Budget%3A%20${
    data?.budget || ''
  }%0A%20%20Ad%20Copy%3A%20${
    data?.adCopy || ''
  }%0A%20%20Call%20to%20action%3A%20${
    data?.callToAction || ''
  }%0A%20%20Button%20Text%3A%20${data?.buttonText || ''}`;

export function Campaign({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
  handleGeneratePaymentLinkButtonClick,
  id,
  children,
}: {
  data: CampaignData;
  handleRepeatButtonOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
  handleCampaignClick: Function;
  handleGeneratePaymentLinkButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
  id?: string;
  children?: ReactNode;
}) {
  const [isActive, setIsActive] = useState<boolean>(data?.isActive || false);
  const [creativeUrl, setCreativeUrl] = useState<string>(
    data?.creativeUrls && data.creativeUrls.length !== 0
      ? data.creativeUrls[0]
      : ''
  );
  const [promoId, setPromoId] = useState<string>('');
  const [budget, setBudget] = useState<string | number>(data?.budget || '250');
  const [adTitle, setAdTitle] = useState<string>(data?.adTitle || '');
  const [isPaid, setIsPaid] = useState<boolean>(data?.receiptId ? true : false);
  const [adCopy, setAdCopy] = useState<string>(data?.adCopy || '');
  const [isActiveClassName, setIsActiveClassName] = useState<string>('');
  const [dollarAmount, setDollarAmount] = useState<string>('');
  const [supportLink, setSupportLink] = useState<string>('');

  useEffect(() => {
    if (data?.isActive && typeof data?.isActive) {
      setIsActive(data?.isActive);
    }
    if (data?.creativeUrls && data.creativeUrls.length !== 0) {
      setCreativeUrl(data.creativeUrls[0]);
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
    if (data?.budget && data?.currency) {
      setDollarAmount(`${data.budget} ${data.currency}`);
    }
    if (data?.receiptId) {
      setIsPaid(true);
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
    <li
      key={`campaign-${data.pid}`}
      id={id || `campaign-${data.pid}`}
      aria-label={`campaign-${data.pid}`}
      className={isActiveClassName}
    >
      <button
        onClick={() => handleCampaignClick(data)}
        aria-label={`campaign-${data?.pid || 'default'}-button`}
      >
        <div className="relative flex flex-1 flex-col px-2 pt-10 pb-6 group-hover:rounded-tr-md group-hover:rounded-tl-sm group-hover:bg-slate-900">
          <IsActivePill isActive={isActive} />
          <IsPaidPill isPaid={isPaid} />
          <img
            suppressHydrationWarning={true}
            className="mx-auto h-32 w-full flex-shrink-0 rounded-b-md rounded-t-sm object-cover px-2"
            src={creativeUrl}
            alt={adTitle}
          />
          <h3 className="mt-6 text-sm font-medium text-slate-900 group-hover:text-slate-200 truncate">
            {adTitle}
          </h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Ad Description</dt>
            <dd className="text-sm text-slate-500 h-24 text-elipsis">
              {adCopy}
            </dd>
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
          <CampaignSupportButton id={id} supportLink={supportLink}>
            Support
          </CampaignSupportButton>
          {!!isPaid ? (
            <CampaignRepeatButton
              handleRepeatButtonOnClick={handleRepeatButtonOnClick}
              id={id}
              data={data}
            >
              {children}
            </CampaignRepeatButton>
          ) : (
            <CampaignPaymentButton
              handleGeneratePaymentLinkButtonClick={
                handleGeneratePaymentLinkButtonClick
              }
              id={id}
              data={data}
            >
              {children}
            </CampaignPaymentButton>
          )}
        </div>
      </div>
    </li>
  );
}
