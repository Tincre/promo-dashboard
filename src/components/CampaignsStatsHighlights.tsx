/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

/* @ts-ignore */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const isHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-200 p-1 shadow sm:px-2 sm:py-2 hover:bg-slate-200 hover:shadow-lg border border-1 border-slate-700 dark:border-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:border-slate-200';
const isNotHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-50 p-1 shadow sm:px-2 sm:py-2 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600';

export function CampaignsStatsHighlights({
  stats,
  handleStatsHighlightClick,
  statsHighlightMetricsName,
}: {
  stats: any[];
  handleStatsHighlightClick?: Function;
  statsHighlightMetricsName: string;
}) {
  return (
    <div>
      <dl className="pt-5 grid grid-cols-3 gap-5 sm:grid-cols-6 pb-5">
        {stats.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
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
              <dt className="">
                <div
                  className="absolute rounded-md bg-blue-600 dark:bg-slate-700 h-8 w-8 top-1/2 -translate-y-1/2"
                  id="promo-dashboard-stats-highlights-icon-container"
                >
                  <item.icon
                    id="promo-dashboard-stats-highlights-icon"
                    className="inline-block pt-1 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white text-center align-middle"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-6 lg:ml-12 truncate text-xs font-medium md:text-sm lg:text-md xl:text-lg text-gray-600 text-left bg:text-slate-200 dark:text-slate-400 -pt-2">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-6 lg:ml-12 flex items-baseline pb-1 sm:pb-2">
                <p className="text-md font-semibold text-gray-900 dark:text-slate-200">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : item.changeType !== 'same'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-slate-400',
                    'ml-2 flex items-baseline text-xs font-semibold md:text-sm lg:text-md xl:text-lg'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="h-3 w-3 flex-shrink-0 self-center text-green-600 dark:text-green-400"
                      aria-hidden="true"
                    />
                  ) : item.changeType !== 'same' ? (
                    <ArrowDownIcon
                      className="h-3 w-3 flex-shrink-0 self-center text-red-600 dark:text-red-400"
                      aria-hidden="true"
                    />
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
                  {item.change}
                </p>
              </dd>
            </button>
          );
        })}
      </dl>
    </div>
  );
}
