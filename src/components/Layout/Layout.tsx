import { Outlet } from "react-router";
import { AnimationProvider } from "../theme/animation/AnimationProvider";
import { wait } from "~/global/utils/wait";
import { redirectToWebsite } from "~/global/utils/redirectToWebsite";
import { useAnimation } from "~/global/hooks/useAnimation";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";
export function Layout() {
   const { setAnimation } = useAnimation();

   const navigateTo = async (url: string) => {
      setAnimation("cover");
      await wait(0.7);
      redirectToWebsite(url);
   };

   const navigateToDocs = async () => {
      navigateTo(`${import.meta.env.SABAODY_DOCS_URL}?uncover=true`);
   };

   const navigateToStudio = async () => {
      navigateTo(`${import.meta.env.SABAODY_STUDIO_URL}?uncover=true`);
   };

   return (
      <>
         <DesktopNavigation {...{ navigateToDocs, navigateToStudio }} />
         <div className="h-full flex flex-col grow-1">
            <main className="overflow-y-auto py-4">
               <Outlet />
            </main>
            <MobileNavigation {...{ navigateToDocs, navigateToStudio }} />
         </div>
         <AnimationProvider />
      </>
   );
}

export type NavigationProps = {
   navigateToDocs: () => Promise<void>;
   navigateToStudio: () => Promise<void>;
};
