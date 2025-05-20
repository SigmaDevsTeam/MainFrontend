import { Avatar, Badge, Button, Separator } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { routes } from "~/global/config/routes.config";
import { NavigationProps } from "./Layout";
import { useAnimation } from "~/global/hooks/useAnimation";
import { useAppSelector } from "~/store/store";
import { GuideDiv } from "../theme/animation/GuideDiv";
import toast from "react-hot-toast";

function DesktopNavigation({ navigateToDocs: _ }: NavigationProps) {
   const { step, setAnimation } = useAnimation();
   const user = useAppSelector((store) => store.auth.user);

   const bottomUlGen = () => {
      if (user === "loading") {
         return (
            <>
               <Button
                  variant="ghost"
                  color="gray"
                  className="!w-full !text-base !gap-4"
                  disabled
               >
                  <i className="pi pi-spinner pi-spin" /> loading
               </Button>
            </>
         );
      }
      if (user === null) {
         return (
            <>
               <NavLiButton icon="pi-user" text="Login" to={routes.login} />
            </>
         );
      } else {
         return (
            <>
               <GuideDiv active={step === 1} isNextStep>
                  <NavLink to={routes.settings}>
                     <Button
                        variant="ghost"
                        color="gray"
                        className="!w-full !text-base !gap-4"
                     >
                        <Avatar
                           fallback={user.username[0]}
                           size="1"
                           radius="full"
                           src={user.image}
                        />{" "}
                        <span>Profile</span>
                     </Button>
                  </NavLink>
               </GuideDiv>
            </>
         );
      }
   };
   return (
      <aside className="hidden sm:block h-full p-3 px-4 bg-(--color-panel-solid) border-r border-(--gray-6) shrink-0">
         <nav className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-2">
               <li className="mb-2">
                  <NavLink
                     to={routes.home}
                     onClick={() => {
                        console.log("oleg");
                     }}
                  >
                     <h3>
                        Sabaody <b className="text-(--accent-10)">Space</b>
                     </h3>
                  </NavLink>
               </li>
               <NavLiButton icon="pi-home" text="Home" to={routes.home} />
               <NavLiButton
                  icon="pi-plus"
                  text="Create project"
                  to={routes.create}
               />
               <NavLiButton
                  icon="pi-wrench"
                  text="Manage projects"
                  to={routes.manage}
               />
               <NavLiButton
                  icon="pi-chart-line"
                  text="Analytics"
                  to={routes.analytics}
               />

               <li className="relative">
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!w-full !text-base !gap-4 !justify-start text-start"
                     onClick={() => {
                        toast.error("Pro users only");
                     }}
                  >
                     <i className={`pi pi-history`} /> <span>History</span>{" "}
                     <Badge color="yellow">Pro</Badge>
                  </Button>
               </li>

               <li className="-mx-2">
                  <Separator className="!w-full" />
               </li>

               <Button
                  variant="ghost"
                  color="gray"
                  className="!text-base !w-full"
                  onClick={() => {
                     setAnimation("greeting");
                  }}
               >
                  Start guide
               </Button>
            </ul>

            {/* Bottom menu */}
            <ul className="flex flex-col gap-2">
               <li className="-mx-2">
                  <Separator className="!w-full" />
               </li>
               <li>
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!text-base !w-full"
                     onClick={() => {
                        toast.error("Documentation is not available yet!");
                     }}
                  >
                     <b className="font-Montserrat">Documentation</b>
                  </Button>
               </li>

               <li>{bottomUlGen()}</li>
            </ul>
         </nav>
      </aside>
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
               className="!w-full !text-base !gap-4 !justify-start text-start"
            >
               <i className={`pi ${icon}`} /> <span>{text}</span>
            </Button>
         </NavLink>
      </li>
   );
}

export { DesktopNavigation };
