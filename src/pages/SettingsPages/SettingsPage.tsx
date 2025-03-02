import {
   Avatar,
   Button,
   Card,
   Checkbox,
   Kbd,
   TextArea,
   TextField
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { GuideDiv } from "~/components/theme/animation/GuideDiv";
import { Modal } from "~/components/theme/Modal";
import { apiWithCsrf } from "~/global/config/application.config";
import { useAnimation } from "~/global/hooks/useAnimation";
import { useCloseModal } from "~/global/hooks/useCloseModal";
import { authApi } from "~/store/auth";
import { useAppDispatch, useAppSelector } from "~/store/store";

function SettingsPage() {
   const user = useAppSelector((store) => store.auth.user);

   const { step } = useAnimation();

   const buttonRef = useRef<HTMLButtonElement | null>(null);

   const openModal = () => {
      if (buttonRef.current) buttonRef.current.click();
   };

   const [prompt, setPrompt] = useState("");

   const [token, setToken] = useState("");

   const { closeButtonRef: closeSubmitTokenRef, closeModal: closeSubmitToken } =
      useCloseModal();

   const { closeButtonRef: closeDeleteTokenRef, closeModal: closeDeleteToken } =
      useCloseModal();

   const handleSubmitToken = async () => {
      await apiWithCsrf.post("users/token", { token });
   };

   const dispatch = useAppDispatch();

   const { mutate: submitToken, isPending: isSubmitPending } = useMutation({
      mutationFn: handleSubmitToken,
      onSuccess: () => {
         dispatch(authApi.util.invalidateTags(["User"]));
         closeSubmitToken();
      }
   });

   const handleDeleteToken = async () => {
      await apiWithCsrf.delete("users/token");
   };

   const { mutate: deleteToken, isPending: isDeletePending } = useMutation({
      mutationFn: handleDeleteToken,
      onSuccess: () => {
         dispatch(authApi.util.invalidateTags(["User"]));
         closeDeleteToken();
      }
   });

   if (user === "loading") return <>loading</>;

   if (!user) return <>CAO</>;

   const { username, image, email, doesTokenExist } = user;
   console.log(user);

   return (
      <>
         <h1 className="containerX text-center">Profile settings</h1>
         <p className="containerX text-center">Change your settings</p>
         <section className="containerX mt-4">
            <div className="flex gap-1 max-w-[450px] mx-auto">
               <TextArea
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
         <section className="containerX mt-4">
            <div className="max-w-[550px] mx-auto flex gap-10 justify-center flex-wrap">
               <div className="flex flex-col items-center">
                  <Avatar
                     fallback={username[0]}
                     radius="full"
                     src={image}
                     size="9"
                  />
                  <div className="flex flex-col gap-1 mt-2 items-center">
                     <p>{username}</p>
                     <small>{email}</small>
                     <div className="bg-(--gray-3) py-1 px-4 rounded-full">
                        Free plan
                     </div>
                  </div>
               </div>
               <div className="grow-1">
                  <Card>
                     <div className="flex flex-col">
                        <h3>Message usage</h3>
                        <small className="-mt-0.5">
                           Resets tommorow at 2:00
                        </small>
                     </div>
                     <div className="flex justify-between gap-2 mt-2">
                        <span>Standard</span> <span>0/20</span>
                     </div>
                     <div className="mt-2">
                        <Button className="!w-full">Upgrade plan</Button>
                     </div>
                  </Card>

                  <Card className="!mt-2 ">
                     <div className="flex flex-col">
                        <h3 className="text-(--gray-10)">Keyboard Shortcuts</h3>
                        <div className="flex gap-2 items-center justify-between mt-2">
                           <span>New repository chat</span>
                           <Kbd>CMD + K</Kbd>
                        </div>
                        <div className="flex gap-2 items-center justify-between mt-1">
                           <span>Manage repositories chat</span>
                           <Kbd>CMD + M</Kbd>
                        </div>
                        <div className="flex gap-2 items-center justify-between mt-1">
                           <span>Analytics</span>
                           <Kbd>CMD + J</Kbd>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
            <div className="max-w-[550px] mx-auto flex gap-2 justify-between mt-4 flex-wrap">
               <div className="flex items-center gap-4">
                  Github access token <Checkbox checked={doesTokenExist} />
               </div>
               <div className="flex gap-2">
                  <Modal
                     trigger={
                        <Button color="gray" variant="soft">
                           Delete
                        </Button>
                     }
                     content={
                        <>
                           <Modal.Title>
                              Are you sure you want to delete token?
                           </Modal.Title>
                           <Modal.Close ref={closeDeleteTokenRef}>
                              <Button color="gray" variant="soft">
                                 Close
                              </Button>
                           </Modal.Close>
                           <Button
                              onClick={() => deleteToken()}
                              loading={isDeletePending}
                           >
                              Submit
                           </Button>
                        </>
                     }
                  />

                  <GuideDiv active={step === 2} isNextStep>
                     <Modal
                        trigger={<Button>Set new</Button>}
                        content={
                           <>
                              <div className="flex flex-col items-center gap-4">
                                 <Modal.Title>
                                    Enter Your github access token
                                 </Modal.Title>
                                 <div className="text-center">
                                    <small>
                                       You can access your token here{" "}
                                       <GuideDiv active={step === 3}>
                                          <a
                                             href="https://github.com/settings/tokens"
                                             target="_blank"
                                          >
                                             <u className="!text-(--accent-10)">
                                                https://github.com/settings/tokens
                                             </u>
                                          </a>
                                       </GuideDiv>
                                    </small>
                                 </div>
                                 <TextField.Root
                                    className="!w-full"
                                    value={token}
                                    onChange={({ target }) =>
                                       setToken(target.value)
                                    }
                                 />
                                 <div className="flex gap-2">
                                    <Modal.Close>
                                       <Button
                                          color="gray"
                                          variant="soft"
                                          ref={closeSubmitTokenRef}
                                       >
                                          Close
                                       </Button>
                                    </Modal.Close>
                                    <Button
                                       onClick={() => submitToken()}
                                       loading={isSubmitPending}
                                    >
                                       Submit
                                    </Button>
                                 </div>
                              </div>
                           </>
                        }
                     />
                  </GuideDiv>
               </div>
            </div>
         </section>
      </>
   );
}

export { SettingsPage };
