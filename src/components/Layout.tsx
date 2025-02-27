import { NavLink, Outlet } from "react-router";
import { routes } from "~/global/config/routes.config";
import { AnimationProvider } from "./theme/animation/AnimationProvider";
import { Button, Separator } from "@radix-ui/themes";
import { wait } from "~/global/utils/wait";
import { redirectToWebsite } from "~/global/utils/redirectToWebsite";
import { useAnimation } from "~/global/hooks/useAnimation";
import { Popup } from "./theme/Popup";
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
      navigateTo(`${import.meta.env.STUDIO}?uncover=true`);
   };

   return (
      <>
         <aside className="bg-red h-full p-3 bg-(--color-panel-solid) border-r border-(--gray-6)">
            <nav className="flex flex-col justify-between h-full">
               <ul className="flex flex-col gap-2">
                  <li className="mb-2">
                     <NavLink to={routes.home}>
                        <h2>
                           Sabaody <b className="text-(--accent-10)">Space</b>
                        </h2>
                     </NavLink>
                  </li>
                  <NavLiButton icon="pi pi-home" text="Home" to={routes.home} />
                  <NavLiButton
                     icon="pi pi-search"
                     text="Search"
                     to={routes.home}
                  />
                  <NavLiButton
                     icon="pi pi-chart-line"
                     text="Charts"
                     to={routes.home}
                  />
                  <li>
                     <Separator className="!w-full" />
                  </li>
                  <li>
                     <Popup
                        trigger={
                           <Button
                              variant="ghost"
                              color="gray"
                              className="!w-full !text-base !gap-4"
                           >
                              Other apps
                           </Button>
                        }
                        content={
                           <div className="-m-2 flex flex-col gap-2">
                              <small className="-mb-2">Docs application:</small>
                              <Button
                                 variant="ghost"
                                 color="gray"
                                 className="!text-base !justify-start"
                                 onClick={navigateToDocs}
                              >
                                 <b className="font-Montserrat">
                                    <span className="text-(--gray-12)">
                                       Sabaody
                                    </span>{" "}
                                    <span className="text-(--indigo-10)">
                                       Docs
                                    </span>
                                 </b>
                              </Button>
                              <small className="-mb-2">Admin panel:</small>
                              <Button
                                 variant="ghost"
                                 color="gray"
                                 className="!text-base !justify-start"
                                 onClick={navigateToStudio}
                              >
                                 <b className="font-Montserrat">
                                    <span className="text-(--gray-12)">
                                       Sabaody
                                    </span>{" "}
                                    <span className="text-(--purple-10)">
                                       Studio
                                    </span>
                                 </b>
                              </Button>
                           </div>
                        }
                     />
                  </li>
               </ul>

               {/* Bottom menu */}
               <ul className="flex flex-col gap-2">
                  <NavLiButton
                     icon="pi pi-user"
                     text="Account"
                     to={routes.login}
                  />
                  <NavLiButton
                     icon="pi pi-cog"
                     text="Settings"
                     to={routes.home}
                  />
               </ul>
            </nav>
         </aside>
         <main>
            <Outlet />
         </main>
         <AnimationProvider />
      </>
   );
}

type NavLiButtonProps = {
   icon: string;
   text: string;
   to: string;
};

function NavLiButton({ icon, text, to }: NavLiButtonProps) {
   return (
      <li>
         <NavLink to={to}>
            <Button
               variant="ghost"
               color="gray"
               className="!w-full !text-base !gap-4"
            >
               <i className={icon} /> <span>{text}</span>
            </Button>
         </NavLink>
      </li>
   );
}
