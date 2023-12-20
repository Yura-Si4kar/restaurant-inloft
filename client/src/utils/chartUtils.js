import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);
export const generateChartConfig = (labels, data, label, backgroundColorFn) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: backgroundColorFn,
        borderColor: backgroundColorFn,
        borderWidth: 1,
      },
    ],
  };
};
