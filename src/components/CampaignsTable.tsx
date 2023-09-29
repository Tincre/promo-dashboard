import { CampaignMetadata } from '../lib/types';

export function CampaignsTable({ data }: { data: CampaignMetadata[] }) {
  return (
    <>
      <div className="h-[400px] overflow-y-auto overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 block">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Campaigns
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the campaigns to which your account has access.
              </p>
            </div>
          </div>
          <div className="-mx-4 mt-8 sm:-mx-0">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="">
                <tr className="">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 sticky top-0 bg-white border-b border-gray-400"
                  >
                    Ads
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell sticky top-0 bg-white border-b border-gray-400"
                  >
                    Start date
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell sticky top-0 bg-white border-b border-gray-400"
                  >
                    Budget
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white border-b border-gray-400"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
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
      <div className="pb-12" />
    </>
  );
}
