/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
//import { CampaignData } from '../lib/types';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export function CampaignsLineChart({ info }: { info: any }) {
  const [data, setData] = useState<any | undefined>();
  useEffect(() => {
    if (typeof info !== 'undefined') {
      setData(buildData(info));
    }
  }, [info]);
  return (
    <>
      <div className="h-full w-full overflow-hidden sm:flex pb-4 sm:pb-0">
        <div
          id="promo-dashboard-line-chart"
          className="flex h-64 w-full items-center rounded-lg bg-blue-600 px-5 pb-4 pt-8 text-white dark:bg-slate-800 dark:text-slate-50"
        >
          {typeof data !== 'undefined' ? (
            <Line data={data} options={options} />
          ) : null}
        </div>
      </div>
    </>
  );
}
export const buildData = ({ chartData }: { chartData: any }) => ({
  labels: chartData?.labels,
  datasets: [
    {
      label: '',
      data: chartData?.data,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 1)',
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      fill: 'start',
      tension: 0.4,
    },
  ],
});

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },

    x: {
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
      grid: {
        circular: true,
        borderColor: 'rgba(255, 255, 255, .2)',
        color: 'rgba(255, 255, 255, .2)',
        borderDash: [5, 5],
      },
    },
  },
  layout: {
    padding: {
      right: 8,
    },
  },
};