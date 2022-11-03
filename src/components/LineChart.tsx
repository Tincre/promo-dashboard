import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export const buildData = ({ chartData }: { chartData: any }) => ({
  labels: chartData.labels,
  datasets: [
    {
      label: '',
      data: chartData.data,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 1)',
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      fill: 'start',
      tension: 0.4,
    },
  ],
});

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      ticks: {
        color: 'rgba(255, 255, 255, 1)',
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },

    xAxes: {
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

export function LineChart({ info }: { info: any }) {
  console.debug(`Line chart raw data: ${JSON.stringify(info)}`);
  const data = buildData(info);
  console.debug(`Line chart data: ${JSON.stringify(data)}`);
  return (
    <>
      <div className="h-full w-full overflow-hidden sm:flex pb-4 sm:pb-0">
        <div className="flex w-full items-center rounded-lg bg-blue-600 px-5 pb-4 pt-8 text-white">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}
