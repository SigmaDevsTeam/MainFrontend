import { useQuery } from "@tanstack/react-query";
import { DonutChart } from "./DonutDiagram";
import { apiWithCsrf } from "~/global/config/application.config";
import toast from "react-hot-toast";
import { LoadingPage } from "../LoadingPage";
import { ChartData } from "chart.js";

function AnalyticsPage() {
   const getAnalytics = async () => {
      try {
         // TODO:  charts url
         const res = await apiWithCsrf.get("open-ai/userAnalytics");
         return res.data as ChartData<"doughnut">;
      } catch (err) {
         toast.error(JSON.stringify(err).slice(0, 50));
         console.log(err);
      }
   };

   const { data, isPending } = useQuery({
      queryKey: ["analytics"],
      queryFn: getAnalytics
   });

   if (isPending) return <LoadingPage />;

   if (data)
      return (
         <>
            {/* <h1 className="containerX text-center">Analytics</h1> */}
            <section className="containerX mt-4">
               <h2 className="text-center">Languages</h2>
               <div className="w-[280px] sm:w-[650px] mx-auto mt-2">
                  <DonutChart languages={data} />
               </div>
            </section>
            {/* <section className="containerX mt-12 sm:mt-42">
               <h2 className="text-center">Months activity</h2>
               <div className="w-[280px] sm:w-[650px] mx-auto mt-2">
                  <BarChart />
               </div>
            </section> */}
         </>
      );
}

export { AnalyticsPage };
