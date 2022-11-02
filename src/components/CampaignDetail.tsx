import { Button } from './Button';
import { LineChart } from './LineChart';
import { MouseEventHandler } from 'react';
import { CampaignData } from '../lib/types';
import { StatsHighlights } from './StatsHighlights';

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

