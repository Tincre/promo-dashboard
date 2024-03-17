/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useState, useEffect, MouseEvent, ReactNode } from 'react';
import { IsActivePill } from './IsActivePill';
import { IsPaidPill } from './IsPaidPill';
import { CampaignData, CampaignDummyData } from '@tincre/promo-types';
import { CampaignRepeatButton } from './CampaignRepeatButton';
import { CampaignSupportButton } from './CampaignSupportButton';
import { CampaignDeleteButton } from './CampaignDeleteButton';
import { CampaignPaymentButton } from './CampaignPaymentButton';
import { getSupportLink } from '../lib/support';
import { InView } from 'react-intersection-observer';
import { useCreative } from '../lib/hooks/useCreative';

export function Campaign({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
  handleGeneratePaymentLinkButtonClick,
  handleDeleteButtonOnClick,
  id,
  emailDomain,
  emailLocalPart,
  shouldShowCampaign = false,
  children,
}: {
  data: CampaignData | CampaignDummyData;
  handleRepeatButtonOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleCampaignClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleGeneratePaymentLinkButtonClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleDeleteButtonOnClick?: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  id?: string;
  emailDomain?: string;
  emailLocalPart?: string;
  shouldShowCampaign?: boolean;
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
  const [shouldShowCampaignInternal, setShouldShowCampaignInternal] =
    useState<boolean>(shouldShowCampaign || false);
  const { isVideo, videoPosterUrl } = useCreative(creativeUrl);
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
    setSupportLink(getSupportLink(data, emailDomain, emailLocalPart));
  }, [data, emailDomain, emailLocalPart]);
  useEffect(() => {
    setIsActiveClassName(
      isActive
        ? 'group col-span-1 flex flex-col rounded-b-lg rounded-t-sm bg-slate-100 dark:bg-slate-700 text-center shadow-md relative'
        : 'group col-span-1 flex flex-col rounded-b-lg rounded-t-sm bg-slate-50 dark:bg-slate-800 text-center shadow-md relative'
    );
  }, [isActive]);

  return (
    <InView
      onChange={(inView) => {
        if (inView) setShouldShowCampaignInternal(true);
      }}
      triggerOnce={true}
      as="li"
      key={`campaign-${data.pid}`}
      id={id || `campaign-${data.pid}`}
      aria-label={`campaign-${data.pid}`}
      className={isActiveClassName}
    >
      {shouldShowCampaignInternal ? (
        <>
          <button
            onClick={(event) => handleCampaignClick(event, data)}
            aria-label={`campaign-${data?.pid || 'default'}-button`}
          >
            <div className="relative flex flex-1 flex-col px-2 pt-10 pb-6 group-hover:rounded-tr-md group-hover:rounded-tl-sm group-hover:bg-slate-900">
              <IsActivePill isActive={isActive} />
              <IsPaidPill isPaid={isPaid} />
              {!isVideo ? (
                <img
                  suppressHydrationWarning={true}
                  className="mx-auto h-32 w-full flex-shrink-0 rounded-b-md rounded-t-sm object-cover px-2"
                  src={creativeUrl}
                  alt={adTitle}
                  loading="lazy"
                />
              ) : (
                <video
                  muted
                  preload="none"
                  controls
                  className="mx-auto h-32 w-full flex-shrink-0 rounded-b-md rounded-t-sm object-cover px-2"
                  poster={videoPosterUrl}
                >
                  <source src={creativeUrl} type="video/mp4" />
                  {creativeUrl.endsWith('.mov') ? (
                    <source
                      src={creativeUrl.replace('.mov', '.mp4') || ''}
                      type="video/mp4"
                    />
                  ) : null}
                </video>
              )}
              <h3 className="mt-6 text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-slate-200 truncate">
                {adTitle}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Ad Description</dt>
                <dd className="text-sm text-slate-500 dark:text-slate-400 h-24 text-ellipsis overflow-hidden">
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
                      <dt className="sr-only">{`Budget ${budget || ''}`}</dt>
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
          <div className="divide-y divide-slate-200 group-hover:bg-slate-900">
            {isPaid ? (
              <div className="invisible text-transparent h-8">
                {`${data?.adTitle}`.slice(0, 4)}
              </div>
            ) : (
              <CampaignDeleteButton
                handleDeleteButtonOnClick={handleDeleteButtonOnClick}
                data={data}
                id={`promo-dashboard-campaign-delete-${
                  data?.pid || 'default'
                }-button`}
              />
            )}
            <div>
              <div className="-mt-px flex divide-x divide-slate-200 group-hover:divide-slate-300 group-hover:bg-slate-200">
                <CampaignSupportButton id={id} supportLink={supportLink}>
                  Support
                </CampaignSupportButton>
                {isPaid ? (
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
          </div>
        </>
      ) : null}
    </InView>
  );
}
