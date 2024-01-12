/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

const campaignTypes = [
  { name: 'Social growth' },
  { name: 'Video release' },
  { name: 'Purchase conversion' },
];

export function CampaignType({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  return (
    <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-slate-100">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
        {/*<item.icon className="h-6 w-6 text-white" aria-hidden="true" />*/}
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-900">
          <a
            onClick={() => alert(`${name} clicked`)}
            className="focus:outline-none cursor-pointer"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            <span className="cursor-pointer">{name}</span>
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
export function NoData({}) {
  return (
    <div className="">
      <h3 className="leading-5 text-base font-bold text-slate-900">
        Create a campaign
      </h3>
      <p>{`Press a campaign type to start the easiest ad campaign you've ever run.`}</p>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-8 border-b border-t border-gray-200 py-8 sm:grid-cols-2"
      >
        {campaignTypes.map((campaignType, index) => {
          const campaignKey = `${campaignType.name}-${index}`;
          return (
            <li key={campaignKey} className="flow-root">
              <CampaignType {...campaignType} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
