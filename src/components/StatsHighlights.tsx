import { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

/* @ts-ignore */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const isHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-200 px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6 hover:bg-slate-200 hover:shadow-lg border border-1 border-blue-700';
const isNotHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent';

export function StatsHighlights({
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
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          return (
            <button
              key={item.id}
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
                <div className="absolute rounded-md bg-blue-600 p-3">
                  <item.icon
                    className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 lg:ml-20 truncate text-sm font-medium md:text-lg lg:text-xl xl:text-2xl text-gray-600 text-left">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 lg:ml-20 flex items-baseline pb-3 sm:pb-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600',
                    'ml-2 flex items-baseline text-sm font-semibold sm:text-md md:text-lg lg:text-xl xl:text-2xl'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-green-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-red-600"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {' '}
                    {item.changeType === 'increase'
                      ? 'Increased'
                      : 'Decreased'}{' '}
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
