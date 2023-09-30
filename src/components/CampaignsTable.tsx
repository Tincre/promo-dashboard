import { useState } from 'react';
import { CampaignMetadata } from '../lib/types';

export function CampaignsTable({ data }: { data: CampaignMetadata[] }) {
  const [isShowing, setIsShowing] = useState(true);
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
                'h-[400px] overflow-y-auto overflow-x-hidden border border-gray-50 bg-gray-50 shadow-lg rounded-md group-hover:bg-gray-100 group-hover:shadow-lg'
              }
            >
              <div className={'px-4 sm:px-6 lg:px-8 block'}>
                <div className="-mx-4 mt-8 sm:-mx-0">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="">
                      <tr className="">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md"
                        >
                          Ads
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md"
                        >
                          Start date
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md"
                        >
                          Budget
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-gray-50 group-hover:bg-gray-100 rounded-md"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-gray-50 group-hover:bg-gray-100 rounded-md">
                      {data.map((campaign) => (
                        <tr key={campaign.adTitle}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-normal text-gray-800 sm:w-auto sm:max-w-none sm:pl-0 text-left">
                            {campaign.adTitle}
                            <dl className="font-normal md:hidden">
                              <dt className="sr-only">Start date</dt>
                              <dd className="mt-1 truncate text-gray-700 text-left md:hidden">
                                {new Date().toISOString().slice(0, 10)}
                              </dd>
                              <dt className="sr-only sm:hidden">Budget</dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {campaign.budget}
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell text-left">
                            {new Date().toISOString().slice(0, 10)}
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
