import { Button, Separator } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { routes } from "~/global/config/routes.config";
import { Popup } from "../theme/Popup";
import { NavigationProps } from "./Layout";
import { useAnimation } from "~/global/hooks/useAnimation";
import { GuideDiv } from "../theme/animation/GuideDiv";

function DesktopNavigation({
   navigateToDocs,
   navigateToStudio
}: NavigationProps) {
   const { step, setAnimation } = useAnimation();

   return (
      <aside className="hidden sm:block h-full p-3 px-4 bg-(--color-panel-solid) border-r border-(--gray-6)">
         <nav className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-2">
               <li className="mb-2">
                  <NavLink to={routes.home}>
                     <h3>
                        Sabaody <b className="text-(--accent-10)">Space</b>
                     </h3>
                  </NavLink>
               </li>
               <NavLiButton icon="pi-home" text="Home" to={routes.home} />
               <NavLiButton icon="pi-search" text="Search" to={routes.home} />
               <NavLiButton
                  icon="pi-chart-line"
                  text="Charts"
                  to={routes.home}
               />
               <li className="-mx-2">
                  <Separator className="!w-full" />
               </li>
               <OtherAppsPopup {...{ navigateToDocs, navigateToStudio }} />
               <li>
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!w-full !text-base"
                     onClick={() => {
                        setAnimation("greeting");
                     }}
                  >
                     Start guide
                  </Button>
               </li>
            </ul>

            {/* Bottom menu */}
            <ul className="flex flex-col gap-2">
               <GuideDiv active={step === 1} isNextStep>
                  <NavLiButton icon="pi-user" text="Login" to={routes.login} />
               </GuideDiv>
               <NavLiButton icon="pi-cog" text="Settings" to={routes.home} />
            </ul>
         </nav>
      </aside>
   );
}

function OtherAppsPopup({ navigateToDocs, navigateToStudio }: NavigationProps) {
   return (
      <li>
         <Popup
            trigger={
               <Button
                  variant="ghost"
                  color="gray"
                  className="!w-full !text-base"
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
                        <span className="text-(--gray-12)">Sabaody</span>{" "}
                        <span className="text-(--indigo-10)">Docs</span>
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
                        <span className="text-(--gray-12)">Sabaody</span>{" "}
                        <span className="text-(--purple-10)">Studio</span>
                     </b>
                  </Button>
               </div>
            }
         />
      </li>
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
               <i className={`pi ${icon}`} /> <span>{text}</span>
            </Button>
         </NavLink>
      </li>
   );
}

export { DesktopNavigation };
