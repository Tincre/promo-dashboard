import { useState, MouseEvent } from 'react';
import { CampaignDummyData, CampaignData } from '../lib/types';

export function CampaignsTable({
  data,
  isCollapsed,
  handleCampaignClick,
}: {
  data: CampaignData[] | CampaignDummyData[];
  isCollapsed?: boolean;
  handleCampaignClick: (
    event: MouseEvent<HTMLButtonElement>,
    data: CampaignData | CampaignDummyData
  ) => void;
}) {
  const [isShowing, setIsShowing] = useState<boolean>(
    typeof isCollapsed !== 'undefined' ? !isCollapsed : true
  );
  return (
    <>
      <div className="w-full text-left">
        <button
          className="relative overflow-hidden rounded-md bg-slate-50 px-2 py-1 text-xs md:text-sm shadow sm:px-3 sm:py-2 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 mb-2"
          onClick={() => {
            setIsShowing(!isShowing);
          }}
        >
          {!isShowing ? 'Show table' : `Collapse table`}
        </button>
      </div>
      {isShowing ? (
        <>
          <div className="group rounded-md">
            <div
              className={
                'h-[380px] overflow-y-auto overflow-x-hidden border border-gray-50 bg-gray-50 shadow-lg rounded-md group-hover:bg-gray-100 group-hover:shadow-lg'
              }
            >
              <div className={'px-4 sm:px-6 lg:px-8 block'}>
                <div className="-mx-4 mt-8 sm:-mx-0">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="">
                      <tr className="">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 pb-2 text-left text-sm font-semibold text-gray-900 sm:pl-0 sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md select-none"
                        >
                          Ads
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 pb-2 text-left text-sm font-semibold text-gray-900 md:table-cell sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md select-none"
                        >
                          Campaign ID
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 pb-2 text-left text-sm font-semibold text-gray-900 sm:table-cell sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md select-none"
                        >
                          Budget
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 pb-2 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md select-none"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-gray-50 group-hover:bg-gray-100 rounded-md">
                      {data.map((campaign, index) => (
                        <tr
                          className="cursor-pointer hover:text-gray-200"
                          key={`${campaign.adTitle}-${index}`}
                          onClick={(e) => {
                            e.preventDefault();
                            /* @ts-ignore */
                            handleCampaignClick(e, campaign);
                          }}
                        >
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-normal text-gray-800 sm:w-auto sm:max-w-none sm:pl-0 text-left">
                            {campaign.adTitle}
                            <dl className="font-normal md:hidden">
                              <dt className="sr-only">Campaign ID</dt>
                              <dd className="mt-1 truncate text-gray-700 text-left md:hidden">
                                {campaign.pid}
                              </dd>
                              <dt className="sr-only sm:hidden">Budget</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {campaign.budget}
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell text-left">
                            {campaign.pid}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell text-left">
                            {campaign.budget}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 text-left">
                            {campaign.isActive
                              ? 'Running'
                              : campaign.receiptId
                              ? 'Completed'
                              : 'Inactive'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-12" />
        </>
      ) : null}
    </>
  );
}
