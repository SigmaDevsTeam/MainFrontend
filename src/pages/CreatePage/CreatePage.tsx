import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useAppSelector } from "~/store/store";
import { LoadingPage } from "../LoadingPage";
import { Navigate, useLocation } from "react-router";
import { routes } from "~/global/config/routes.config";
import { useEffect, useRef, useState } from "react";
import { Modal } from "~/components/theme/Modal";
import { apiWithCsrf } from "~/global/config/application.config";
import toast from "react-hot-toast";
import { useCloseModal } from "~/global/hooks/useCloseModal";
import { useMutation } from "@tanstack/react-query";

// function extractRepoInfo(str: string) {
//    const isPrivate = /\b(private)\b/i.test(str);

//    const isPublic = /\b(public)\b/i.test(str);

//    return isPrivate;
// }

function CreatePage() {
   const user = useAppSelector((store) => store.auth.user);

   const location = useLocation();
   const isSearchFocused = location.state?.isSearchFocused;

   useEffect(() => {
      if (isSearchFocused) document.getElementById("promptBar")?.focus();
   }, [isSearchFocused]);

   const buttonRef = useRef<HTMLButtonElement | null>(null);

   const { closeButtonRef, closeModal } = useCloseModal();

   const openModal = () => {
      if (buttonRef.current) buttonRef.current.click();
   };

   const [prompt, setPrompt] = useState("");

   const [isPrivate, setIsPrivate] = useState<boolean>(false);

   const [repoName, setRepoName] = useState<string>("");

   const handleSend = () => {
      openModal();
   };
   const handleCreateProject = async () => {
      try {
         console.log({ isPrivate, repoName, prompt });
         const res = await apiWithCsrf.post("open-ai/createProject", {
            isPrivate,
            repoName,
            prompt
         });
         toast.success("Repository successfully created");
         console.log(res);
      } catch (err) {
         toast.error(JSON.stringify(err).slice(0, 50));
         console.log(err);
      }
   };

   const { mutate, isPending } = useMutation({
      mutationFn: handleCreateProject,
      onSuccess: () => {
         closeModal();
      }
   });

   if (user === "loading") return <LoadingPage />;

   if (!user) return <Navigate to={routes.login} />;

   return (
      <>
         <h1 className="containerX text-center">Create</h1>
         <p className="containerX text-center">
            Imbue life into your next project and begin work immediately
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
                  <Button
                     disabled={prompt.length === 0}
                     onClick={handleSend}
                     loading={isPending}
                  >
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
                        <Button className="!hidden" ref={buttonRef}></Button>
                     }
                     content={
                        <>
                           <Modal.Title>Enter essential details</Modal.Title>
                           <div className="flex flex-col gap-1 mt-2">
                              Repository name
                              <TextField.Root
                                 value={repoName}
                                 onChange={({ target }) =>
                                    setRepoName(target.value)
                                 }
                              />
                           </div>
                           <div className="flex items-center gap-2 justify-between mt-4">
                              <span>Private repository</span>
                              <Switch
                                 checked={isPrivate}
                                 onCheckedChange={setIsPrivate}
                              />
                           </div>
                           <div className="flex justify-center gap-2 mt-4">
                              <Modal.Close>
                                 <Button
                                    color="gray"
                                    variant="soft"
                                    ref={closeButtonRef}
                                 >
                                    Close
                                 </Button>
                              </Modal.Close>
                              <Button
                                 onClick={() => mutate()}
                                 loading={isPending}
                              >
                                 Submit
                              </Button>
                           </div>
                        </>
                     }
                  />
               </div>
            </div>
         </section>
         <section className="containerX mt-4">
            <div className="max-w-[600px] mx-auto">
               {isPending && (
                  <p className="flex gap-2 justify-center items-center">
                     <span>Loading</span>{" "}
                     <i className="pi pi-spinner pi-spin" />
                  </p>
               )}
               {/* <CodeResponse>git init bobr</CodeResponse>
               <LinkResponse link={"https://niggas"}>niggaImage</LinkResponse>
               <ParagraphResponse>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  obcaecati enim quidem repellat molestiae nulla modi ipsam
                  dolor illum sapiente provident ut eligendi, facilis iure
                  doloremque expedita illo minus incidunt voluptate facere, rem
                  adipisci. Inventore facere perspiciatis cumque ipsum ipsam?
               </ParagraphResponse>
               <SuccessResponse />
               <ErrorResponse /> */}
            </div>
         </section>
      </>
   );
}

// function SuccessResponse() {
//    return (
//       <p className="text-(--green-10)">
//          <i className="pi pi-check-circle" /> Success
//       </p>
//    );
// }

// function ErrorResponse() {
//    return (
//       <p className="text-(--red-10)">
//          <i className="pi pi-times-circle" /> Success
//       </p>
//    );
// }

// function LinkResponse({
//    children,
//    link
// }: PropsWithChildren & { link: string }) {
//    return (
//       <a
//          target="_blank"
//          className="cursor-pointer text-(--accent-10)"
//          href={link}
//       >
//          <u>{children}</u>
//       </a>
//    );
// }

// function CodeResponse({ children }: PropsWithChildren) {
//    const codeRef = useRef<HTMLPreElement | null>(null);

//    const handleCopy = () => {
//       if (codeRef.current?.textContent) {
//          navigator.clipboard.writeText(codeRef.current.textContent);
//          console.log("Code copied to clipboard!");
//       }
//    };

//    return (
//       <div className="relative border border-(--gray-5) p-4 rounded-(--radius-4) bg-(--gray-2) pr-12">
//          <div className="absolute top-1 right-1">
//             <Button variant="soft" color="gray" onClick={handleCopy}>
//                <i className="pi pi-copy" />
//             </Button>
//          </div>
//          <code className="text-(--gray-11)" ref={codeRef}>
//             {children}
//          </code>
//       </div>
//    );
// }

export { CreatePage };
