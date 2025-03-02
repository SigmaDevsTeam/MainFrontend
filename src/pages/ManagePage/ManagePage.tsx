import { Button, TextArea } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Modal } from "~/components/theme/Modal";
import { LoadingPage } from "../LoadingPage";
import { Navigate, useLocation } from "react-router";
import { routes } from "~/global/config/routes.config";
import { useAppSelector } from "~/store/store";

function ManagePage() {
   const user = useAppSelector((store) => store.auth.user);

   const [prompt, setPrompt] = useState("");
   const location = useLocation();
   const isSearchFocused = location.state?.isSearchFocused;

   useEffect(() => {
      if (isSearchFocused) document.getElementById("promptBar")?.focus();
   }, [isSearchFocused]);

   const buttonRef = useRef<HTMLButtonElement | null>(null);

   const openModal = () => {
      if (buttonRef.current) buttonRef.current.click();
   };

   if (user === "loading") return <LoadingPage />;

   if (!user) return <Navigate to={routes.login} />;
   return (
      <>
         <h1 className="containerX text-center">Manage</h1>
         <p className="containerX text-center">
            Type what you what to change in existing repositories
         </p>
         <section className="containerX mt-4">
            <div className="flex gap-1 max-w-[450px] mx-auto">
               <TextArea
                  id="promptBar"
                  className="!grow-1"
                  placeholder="Create private repository with vite react typescript template"
                  value={prompt}
                  onChange={({ target }) => setPrompt(target.value)}
               />
               <div className="flex flex-col gap-1">
                  <Button disabled={prompt.length === 0} onClick={openModal}>
                     Send
                  </Button>
                  <Button
                     variant="soft"
                     color="gray"
                     onClick={() => setPrompt("")}
                  >
                     clear
                  </Button>
                  <Modal
                     trigger={
                        <Button className="!hidden" ref={buttonRef}>
                           Open
                        </Button>
                     }
                     content={<>Yaaa</>}
                  />
               </div>
            </div>
         </section>
      </>
   );
}

export { ManagePage };
