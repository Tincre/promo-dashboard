import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { Button } from './Button';
import { LineChart } from './LineChart';

const tsData = {
  stockFullName: 'SW Limited.',
  stockShortName: 'ASX:SFW',
  price: {
    current: 2.32,
    open: 2.23,
    low: 2.215,
    high: 2.325,
    cap: 93765011,
    ratio: 20.1,
    dividend: 1.67,
  },
  chartData: {
    labels: [
      '10:00',
      '',
      '',
      '',
      '12:00',
      '',
      '',
      '',
      '2:00',
      '',
      '',
      '',
      '4:00',
    ],
    data: [
      2.23, 2.215, 2.22, 2.25, 2.245, 2.27, 2.28, 2.29, 2.3, 2.29, 2.325, 2.325,
      2.32,
    ],
  },
};
/* @ts-ignore */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function CampaignDetail({
  data,
  handleCampaignDetailOnClick,
}: {
  data: any;
  handleCampaignDetailOnClick: Function;
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
      <AdPreviewDetail data={data} />
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
    <div className="relative h-56 sm:h-72 md:h-96">
      {' '}
      <img src={imageUrl} className="rounded-lg object-contain" />
    </div>
  );
}
export function AdPreviewDetail({ data }: { data: any }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6">
        <AdPreviewDetailImage
          imageUrl={data.imageUrl /* TODO update w/cloudinary array */}
        />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6">
        <LineChart info={tsData} />
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
              <div className="absolute mt-1 rounded-md bg-blue-600 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-600">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-3 sm:pb-4">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
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
