import { Doughnut } from "react-chartjs-2";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   ChartOptions,
   ChartData
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
   // Define types for data and options
   const data: ChartData<"doughnut"> = {
      labels: ["JavaScript", "Python", "Java", "C++", "Go"],
      datasets: [
         {
            label: "Usage",
            data: [40, 25, 15, 10, 10],
            backgroundColor: [
               "#f1e05a",
               "#3572A5",
               "#b07219",
               "#f34b7d",
               "#00ADD8"
            ],
            borderWidth: 1
         }
      ]
   };

   const options: ChartOptions<"doughnut"> = {
      responsive: true,
      cutout: "50%", // Creates the donut hole
      plugins: {
         legend: {
            position: "top"
         }
      }
   };

   return <Doughnut data={data} options={options} className="w-full" />;
};

export { DonutChart };
