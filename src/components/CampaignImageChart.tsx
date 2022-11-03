import { AdPreviewDetailImage } from './AdPreviewDetailImage';
import { LineChart } from './LineChart';

export function CampaignImageChart({
  data,
  statsHighlightTimeseries,
}: {
  data: any; // TODO add typing
  statsHighlightTimeseries?: object; // TODO add typing
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 shadow sm:px-6 sm:py-6">
        <AdPreviewDetailImage
          imageUrl={data.imageUrl /* TODO update w/cloudinary array */}
        />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-slate-50 px-4 py-5 pb-0 shadow sm:px-6 sm:py-6">
        <LineChart info={statsHighlightTimeseries || data.stats[0]} />
      </div>
    </div>
  );
}
