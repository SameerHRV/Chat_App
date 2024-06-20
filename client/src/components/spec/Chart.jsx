import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "../../lib/features";

ChartJS.register(Tooltip, CategoryScale, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ dataArray = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "revenue",
        data: dataArray,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
      },
      {
        label: "expenses",
        data: dataArray,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 90,
};

const DoughnutChart = ({ dataArray = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataArray,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        hoverBackgroundColor: ["rgba(255, 99, 132, 0.4)", "rgba(54, 162, 235, 0.4)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
        offset: 40,
      },
    ],
  };

  return (
    <Doughnut
      style={{
        zIndex: 100,
      }}
      data={data}
      options={DoughnutChartOptions}
    />
  );
};

export { DoughnutChart, LineChart };
