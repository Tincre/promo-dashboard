import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { Button } from './Button';
import { LineChart } from './LineChart';
import { MouseEventHandler } from 'react';
import { CampaignData } from '../lib/types';

/* @ts-ignore */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function CampaignDetail({
  data,
  handleCampaignDetailOnClick,
}: {
  data: CampaignData;
  handleCampaignDetailOnClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <>
      <div className="inline-flex w-full">
        <Button
          className="mx-2 mt-2 inline"
          onClick={handleCampaignDetailOnClick}
        >
          Back
        </Button>
        <h1 className="mt-auto mr-2 w-full text-right align-text-bottom text-2xl font-bold">
          {data.pid}
        </h1>
      </div>
      <CampaignImageChart data={data} />
      <StatsHighlights stats={data?.stats || []} />
      {/*@ts-ignore*/}
      <Button
        className="mx-2 mt-4 mb-2 sm:hidden"
        onClick={handleCampaignDetailOnClick}
      >
        Back
      </Button>
    </>
  );
}
export function AdPreviewDetailImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative ">
      {' '}
      <img
        src={imageUrl}
        className="rounded-lg object-cover w-full h-56 sm:h-72 md:h-96"
        alt=""
      />
    </div>
  );
}
export function CampaignImageChart({ data }: { data: any }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 shadow sm:px-6 sm:py-6">
        <AdPreviewDetailImage
          imageUrl={data.imageUrl /* TODO update w/cloudinary array */}
        />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6">
        <LineChart info={data.stats[0]} />
      </div>
    </div>
  );
}
export function StatsHighlights({ stats }: { stats: any[] }) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-0 shadow sm:px-6 sm:pt-6"
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
          </div>
        ))}
      </dl>
    </div>
  );
}
