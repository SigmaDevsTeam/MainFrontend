import { Badge, Button, TextArea } from "@radix-ui/themes";
import { LoadingPage } from "../LoadingPage";
import { Navigate } from "react-router";
import { routes } from "~/global/config/routes.config";
import { useAppSelector } from "~/store/store";
import { useQuery } from "@tanstack/react-query";
import { apiWithCsrf } from "~/global/config/application.config";
import toast from "react-hot-toast";
import { RepoCard, RepoCardProps } from "./RepoCard";

function ManagePage() {
   const user = useAppSelector((store) => store.auth.user);

   const getAllRepos = async () => {
      try {
         const res = await apiWithCsrf.get("/open-ai/repos");
         return res.data as RepoCardProps[];
      } catch (err) {
         toast.error(JSON.stringify(err).slice(0, 50));
         console.log(err);
      }
   };

   const { data, isPending, isError } = useQuery({
      queryKey: ["repos"],
      queryFn: getAllRepos
   });

   if (user === "loading") return <LoadingPage />;

   if (!user) return <Navigate to={routes.login} />;
   return (
      <>
         <h1 className="containerX text-center">Manage</h1>
         <p className="containerX text-center">
            Type what you what to change in existing repositories
         </p>
         <section className="containerX mt-4">
            <div className="flex gap-1 max-w-[450px] mx-auto  relative">
               <div className="absolute -top-2 -right-2">
                  <Badge color="yellow" size="3">
                     Pro
                  </Badge>
               </div>
               <TextArea
                  disabled
                  id="promptBar"
                  className="!grow-1"
                  placeholder="Make Repository 2 private and add Maksim as collaborator"
               />
               <div className="flex flex-col gap-1">
                  <Button disabled>
                     Send <i className="pi pi-lock" />
                  </Button>
                  <Button variant="soft" color="gray" disabled>
                     clear
                  </Button>
               </div>
            </div>
         </section>
         <section className="containerX mt-8">
            <div className="max-w-[600px] mx-auto">
               <ul className="flex flex-col gap-4">
                  {isPending && (
                     <p className="flex justify-center">
                        <i className="pi pi-spinner pi-spin" />
                     </p>
                  )}
                  {data &&
                     data.map((repo, i) => (
                        <li key={i}>
                           <RepoCard {...repo} />
                        </li>
                     ))}
                  {data?.length === 0 ||
                     (isError && (
                        <p className="text-center">
                           You got 0 repositories to manage
                        </p>
                     ))}
               </ul>
               {/* <li>
                  <RepoCard />
               </li> */}
            </div>
         </section>
      </>
   );
}

export { ManagePage };
