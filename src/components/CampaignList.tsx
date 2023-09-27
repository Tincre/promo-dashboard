/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent } from 'react';
import { Campaign } from './Campaign';
import {
  CampaignData,
  CampaignDummyData,
  DashboardOptions,
} from '../lib/types';

export function CampaignList({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
  handleGeneratePaymentLinkButtonClick,
  handleDeleteButtonOnClick,
  deletedCampaigns,
  dashboardOptions,
}: {
  data: CampaignData[] | CampaignDummyData[];
  handleRepeatButtonOnClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleCampaignClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleGeneratePaymentLinkButtonClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  handleDeleteButtonOnClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
  deletedCampaigns: string[];
  dashboardOptions?: DashboardOptions;
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      id="promo-campaign-list"
    >
      {data.map((campaignData: CampaignData | CampaignDummyData, index) => {
        const pid = `${campaignData.pid}`;
        if (!deletedCampaigns.includes(pid)) {
          const key = `${index}-${pid}`;
          const shouldShowCampaign = index < 4 ? true : false;
          return (
            <Campaign
              key={key}
              id={`campaign-${index}`}
              data={campaignData}
              handleRepeatButtonOnClick={handleRepeatButtonOnClick}
              handleCampaignClick={handleCampaignClick}
              handleGeneratePaymentLinkButtonClick={
                handleGeneratePaymentLinkButtonClick
              }
              handleDeleteButtonOnClick={handleDeleteButtonOnClick}
              emailDomain={dashboardOptions?.emailDomain}
              emailLocalPart={dashboardOptions?.emailLocalPart}
              shouldShowCampaign={shouldShowCampaign}
            />
          );
        }
      })}
    </ul>
  );
}
