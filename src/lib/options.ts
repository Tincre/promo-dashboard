/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export const options = {
  defaultStatName: 'Spend', // CPC, CPM, Clicks, Views, CTR, or Spend
  timePeriods: ['1 month', '3 months', '6 months', '12 months'],
  timePeriodDayLengths: new Map([
    ['1 month', 30],
    ['3 months', 90],
    ['6 months', 180],
    ['12 months', 365],
  ]),
  campaignTypes: [
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
  ],
};
