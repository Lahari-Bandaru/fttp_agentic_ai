import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CostChart({ result }) {

  if (!result) return null;

  const data = {
    labels: ["Estimated Cost"],
    datasets: [
      {
        label: "Cost",
        data: [result.estimated_cost],
        backgroundColor: ["blue"]
      }
    ]
  };

  return <Bar data={data} />;
}

export default CostChart;