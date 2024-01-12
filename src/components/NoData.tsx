/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  CalendarIcon,
  NewspaperIcon,
  ArrowUturnLeftIcon,
  UserGroupIcon,
  VideoCameraIcon,
  TagIcon,
  HeartIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
const campaignTypes = [
  {
    name: 'Lead Generation',
    description: 'Attract and acquire potential customers',
    icon: 'magnifying-glass',
    color: 'bg-violet-500',
  },
  {
    name: 'Product Launch',
    description: 'Introduce new products to market',
    icon: 'rocket-launch',
    color: 'bg-orange-500',
  },
  {
    name: 'Event Promotion',
    description: 'Advertise events to increase attendance',
    icon: 'calendar',
    color: 'bg-zinc-500',
  },
  {
    name: 'Content Marketing',
    description: 'Engage audience with valuable content',
    icon: 'newspaper',
    color: 'bg-teal-500',
  },
  {
    name: 'Retargeting Ads',
    description: 'Re-engage visitors with targeted ads',
    icon: 'arrow-uturn-left',
    color: 'bg-yellow-400',
  },
  {
    name: 'Video Engagement',
    description: 'Create engaging video content ads',
    icon: 'video-camera',
    color: 'bg-green-500',
  },
  {
    name: 'Flash Sales',
    description: 'Promote limited-time discount offers',
    icon: 'tag',
    color: 'bg-red-600',
  },
  {
    name: 'Brand Awareness',
    description: 'Boost brand recognition and visibility',
    icon: 'eye',
    color: 'bg-blue-500',
  },
];
function NoDataBaseCampaignButton() {
  return (
    <div className="mt-4 flex text-indigo-600 hover:text-indigo-500">
      <button
        onClick={() => alert('Base campaign button clicked')}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:scale-105 transition ease-in-out duration-300"
      >
        Or run any type of ad campaign <Arrow />
      </button>
    </div>
  );
}
export function Arrow() {
  return <span aria-hidden="true"> &rarr;</span>;
}

const iconMap = new Map([
  ['eye', EyeIcon],
  ['magnifying-glass', MagnifyingGlassIcon],
  ['rocket-launch', RocketLaunchIcon],
  ['calendar', CalendarIcon],
  ['newspaper', NewspaperIcon],
  ['arrow-uturn-left', ArrowUturnLeftIcon],
  ['user-group', UserGroupIcon],
  ['video-camera', VideoCameraIcon],
  ['tag', TagIcon],
  ['heart', HeartIcon],
  ['megaphone', MegaphoneIcon],
]);

export function CampaignType({
  name,
  description,
  color,
  icon,
}: {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}) {
  const iconClassName = color
    ? `${color} flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg`
    : `flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500`;
  const Icon = iconMap.get(icon || 'megaphone') || MegaphoneIcon;
  return (
    <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-slate-100 hover:scale-105 transition ease-in-out duration-300">
      <div className={iconClassName}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-900 cursor-pointer">
          <button
            onClick={() => alert(`${name} clicked`)}
            className="focus:outline-none cursor-pointer"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            <span className="cursor-pointer">{name}</span>
            <Arrow />
          </button>
        </h4>
        <p className="mt-1 text-sm text-slate-600 cursor-pointer">
          {description}
        </p>
      </div>
    </div>
  );
}
export function NoData({}) {
  return (
    <>
      <h3 className="leading-5 text-base font-bold text-slate-900">
        Create a campaign
      </h3>
      <p className="pb-6">{`Press a campaign type to start the easiest ad campaign you've ever run.`}</p>
      <div className="border-t border-gray-200 pb-6 pt-6">
        <ul
          role="list"
          className="mt-2 grid grid-cols-1 gap-8 pb-6 sm:grid-cols-2"
        >
          {campaignTypes.map((campaignType, index) => {
            const campaignKey = `${campaignType.name}-${index}`;
            return (
              <li key={campaignKey} className="flow-root">
                <CampaignType
                  name={campaignType.name}
                  description={campaignType?.description}
                  icon={campaignType?.icon}
                  color={campaignType?.color}
                />
              </li>
            );
          })}
        </ul>
        <NoDataBaseCampaignButton />
      </div>
    </>
  );
}
