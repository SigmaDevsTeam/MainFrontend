import { Outlet, useNavigate } from "react-router";
import { AnimationProvider } from "../theme/animation/AnimationProvider";
import { wait } from "~/global/utils/wait";
import { redirectToWebsite } from "~/global/utils/redirectToWebsite";
import { useAnimation } from "~/global/hooks/useAnimation";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "~/store/auth/auth.api";
import { useAppDispatch } from "~/store/store";
import { logout, setUser } from "~/store/auth/auth.slice";
import { routes } from "~/global/config/routes.config";

export function Layout() {
   const { data: userData, isLoading, isError } = useGetCurrentUserQuery();
   const dispatch = useAppDispatch();
   console.log(isError);
   console.log(userData);
   useEffect(() => {
      if (isLoading) dispatch(setUser("loading"));
      else if (userData) dispatch(setUser(userData));
      else if (isError) dispatch(setUser(null));
      else dispatch(logout());
   }, [userData, isError, isLoading]);

   const navigate = useNavigate();
   useEffect(() => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      document.addEventListener("keydown", (event) => {
         const isCmdK = isMac && event.metaKey && event.key === "k";
         const isCtrlK = !isMac && event.ctrlKey && event.key === "k";
         if (isCmdK || isCtrlK) {
            navigate(routes.create, { state: { isSearchFocused: true } });
            document.getElementById("promptBar")?.focus();
         }

         const isCmdM = isMac && event.metaKey && event.key === "m";
         const isCtrlM = !isMac && event.ctrlKey && event.key === "m";

         if (isCmdM || isCtrlM) {
            navigate(routes.manage, { state: { isSearchFocused: true } });
            document.getElementById("promptBar")?.focus();
         }

         const isCmdJ = isMac && event.metaKey && event.key === "j";
         const isCtrlJ = !isMac && event.ctrlKey && event.key === "j";

         if (isCmdJ || isCtrlJ) {
            navigate(routes.analytics);
         }
      });
   }, []);

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
