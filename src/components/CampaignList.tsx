import { Campaign } from './Campaign';
import { CampaignData } from '../lib/types';

export function CampaignList({
  data,
  handleRepeatButtonOnClick,
  handleCampaignClick,
}: {
  data: CampaignData[];
  handleRepeatButtonOnClick: Function;
  handleCampaignClick: Function;
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {data.map((campaignData: CampaignData, index) => {
        const key = `${index}-${campaignData.pid}`;
        return (
          <Campaign
            key={key}
            data={campaignData}
            handleRepeatButtonOnClick={handleRepeatButtonOnClick}
            handleCampaignClick={handleCampaignClick}
          />
        );
      })}
    </ul>
  );
}