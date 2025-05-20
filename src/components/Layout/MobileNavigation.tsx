import { Avatar, Button } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { routes } from "~/global/config/routes.config";
import { NavigationProps } from "./Layout";
import { Popup } from "../theme/Popup";
import { useAppSelector } from "~/store/store";

function MobileNavigation({ navigateToDocs }: NavigationProps) {
   const user = useAppSelector((store) => store.auth.user);
   const bottomUlGen = () => {
      if (user === "loading") {
         return (
            <>
               <Button
                  variant="ghost"
                  color="gray"
                  className="!w-full !text-base"
                  disabled
               >
                  <i className="pi pi-spinner pi-spin" />
               </Button>
            </>
         );
      }
      if (user === null) {
         return (
            <>
               <NavLiIcon icon="pi-user" to={routes.login} />
            </>
         );
      } else {
         return (
            <>
               <NavLink to={routes.settings}>
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!w-full !text-base !gap-4 !py-1 !px-2"
                     radius="full"
                  >
                     <Avatar
                        fallback={user.username[0]}
                        size="2"
                        radius="full"
                        src={user.image}
                     />{" "}
                  </Button>
               </NavLink>
            </>
         );
      }
   };
   return (
      <footer className="sm:hidden p-3 bg-(--color-panel-solid) border-t border-(--gray-6)">
         <nav>
            <ul className="flex gap-4 justify-between items-center px-4">
               <NavLiIcon icon="pi-home" to={routes.home} />
               <NavLiIcon icon="pi-wrench" to={routes.manage} />
               <NavLiIcon icon="pi-plus" to={routes.create} />

               <li>
                  <Popup
                     trigger={
                        <div>
                           <Button
                              variant="ghost"
                              color="gray"
                              className="!text-2xl "
                           >
                              <i className="pi pi-bars" />
                           </Button>
                        </div>
                     }
                     content={
                        <div className="-m-2 flex flex-col gap-2">
                           <NavLink to={routes.analytics}>
                              <Button
                                 variant="ghost"
                                 color="gray"
                                 className="!w-full !text-base !gap-4"
                              >
                                 <i className={`pi pi-chart-line`} />{" "}
                                 <span>Analytics</span>
                              </Button>
                           </NavLink>
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
                        </div>
                     }
                  />
               </li>

               {bottomUlGen()}
            </ul>
         </nav>
      </footer>
   );
}

type NavLiIconProps = {
   icon: string;
   to: string;
};

function NavLiIcon({ icon, to }: NavLiIconProps) {
   return (
      <li>
         <NavLink to={to}>
            <Button
               variant={icon === "pi-plus" ? "soft" : "ghost"}
               color="gray"
               className="!w-full !text-2xl "
            >
               <i className={`pi ${icon}`} />
            </Button>
         </NavLink>
      </li>
   );
}

export { MobileNavigation };
