import React from "react";
import { Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   BarElement,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
   ChartOptions,
   ChartData
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart: React.FC = () => {
   // Define types for data and options
   const data: ChartData<"bar"> = {
      labels: [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December"
      ],
      datasets: [
         {
            label: "Commits per Month",
            data: [15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50, 48], // Example data
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
         }
      ]
   };

   const options: ChartOptions<"bar"> = {
      responsive: true,
      plugins: {
         legend: {
            position: "top"
         },
         tooltip: {
            callbacks: {
               label: (context) => `Commits: ${context.raw}`
            }
         }
      },
      scales: {
         y: {
            beginAtZero: true,
            title: {
               display: true,
               text: "Number of Commits"
            }
         },
         x: {
            title: {
               display: true,
               text: "Months"
            }
         }
      }
   };

   return <Bar data={data} options={options} />;
};

export { BarChart };
