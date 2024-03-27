/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { CampaignStatsData } from '@tincre/promo-types';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { YouTubeIcon } from './YouTubeIcon';

const costBasedMetrics = ['CPM', 'CPC', 'CPV'];
/* @ts-ignore */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const isHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-200 px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6 hover:bg-slate-200 hover:shadow-lg border border-1 border-slate-700 dark:border-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:border-slate-200';
const isNotHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600';

export function StatsHighlights({
  stats,
  handleStatsHighlightClick,
  statsHighlightMetricsName,
}: {
  stats: CampaignStatsData[];
  handleStatsHighlightClick?: Function;
  statsHighlightMetricsName: string;
}) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          return (
            <button
              key={item.id}
              id={`${item.id}`}
              className={
                item.name !== statsHighlightMetricsName
                  ? isNotHighlightedClassName
                  : isHighlightedClassName
              }
              onClick={() => {
                if (typeof handleStatsHighlightClick !== 'undefined') {
                  handleStatsHighlightClick(item);
                }
              }}
            >
              <dt>
                <div
                  className="absolute rounded-md bg-blue-600 dark:bg-slate-700 p-3"
                  id="promo-dashboard-stats-highlights-icon-container"
                >
                  <item.icon
                    id="promo-dashboard-stats-highlights-icon"
                    className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 lg:ml-20 truncate text-sm font-medium md:text-lg lg:text-xl xl:text-2xl text-gray-600 text-left bg:text-slate-200 dark:text-slate-400">
                  {item.name === 'Views' ? (
                    <span className="inline-flex">
                      Views <YouTubeIcon className="inline-flex h-8 w-8" />
                    </span>
                  ) : (
                    item.name
                  )}
                </p>
              </dt>
              <dd className="ml-16 lg:ml-20 flex items-baseline pb-3 sm:pb-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-slate-200">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : item.changeType !== 'same'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-slate-400',
                    'ml-2 flex items-baseline text-sm font-semibold sm:text-md md:text-lg lg:text-xl xl:text-2xl'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    !costBasedMetrics.includes(item.name) ? (
                      <ArrowUpIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-green-600 dark:text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-green-600 dark:text-green-400"
                        aria-hidden="true"
                      />
                    )
                  ) : item.changeType !== 'same' ? (
                    !costBasedMetrics.includes(item.name) ? (
                      <ArrowDownIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-red-600 dark:text-red-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-red-600 dark:text-red-400"
                        aria-hidden="true"
                      />
                    )
                  ) : null}

                  <span className="sr-only">
                    {' '}
                    {item.changeType === 'increase'
                      ? 'Increased'
                      : item.changeType !== 'same'
                      ? 'Decreased'
                      : 'Unchanged'}{' '}
                    by{' '}
                  </span>
                  {item.change.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 0,
                  })}
                </p>
              </dd>
            </button>
          );
        })}
      </dl>
    </div>
  );
}
