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

const DonutChart = ({ languages }: { languages: ChartData<"doughnut"> }) => {
   // Define types for data and options
   const data: ChartData<"doughnut"> = languages;

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
