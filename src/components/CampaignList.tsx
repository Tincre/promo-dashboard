/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent } from 'react';
import { Campaign } from './Campaign';
import { CampaignData } from '../lib/types';

export function CampaignList({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
  handleGeneratePaymentLinkButtonClick,
}: {
  data: CampaignData[];
  handleRepeatButtonOnClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
  handleCampaignClick: Function;
  handleGeneratePaymentLinkButtonClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData
  ) => void;
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {data.map((campaignData: CampaignData, index) => {
        const key = `${index}-${campaignData.pid}`;
        return (
          <Campaign
            key={key}
            data={campaignData}
            handleRepeatButtonOnClick={handleRepeatButtonOnClick}
            handleCampaignClick={handleCampaignClick}
            handleGeneratePaymentLinkButtonClick={
              handleGeneratePaymentLinkButtonClick
            }
          />
        );
      })}
    </ul>
  );
}
