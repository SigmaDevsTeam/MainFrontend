import {
   Avatar,
   Badge,
   Button,
   Card,
   Checkbox,
   Kbd,
   TextArea,
   TextField
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate } from "react-router";
import { GuideDiv } from "~/components/theme/animation/GuideDiv";
import { Modal } from "~/components/theme/Modal";
import { apiWithCsrf } from "~/global/config/application.config";
import { routes } from "~/global/config/routes.config";
import { useAnimation } from "~/global/hooks/useAnimation";
import { useCloseModal } from "~/global/hooks/useCloseModal";
import { authApi } from "~/store/auth";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { LoadingPage } from "../LoadingPage";

function SettingsPage() {
   const user = useAppSelector((store) => store.auth.user);

   const { step } = useAnimation();

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

   const handleLogout = async () => {
      await apiWithCsrf.get("/logout");
   };

   const { mutate: logoutUser, isPending: isLgginOut } = useMutation({
      mutationFn: handleLogout,
      onSuccess: () => {
         dispatch(authApi.util.invalidateTags(["User"]));
      }
   });

   if (user === "loading") return <LoadingPage />;

   if (!user) return <Navigate to={routes.login} />;

   const { username, image, email, doesTokenExist } = user;
   console.log(user);

   return (
      <>
         <h1 className="containerX text-center">Profile settings</h1>
         <p className="containerX text-center">Change your settings</p>
         <section className="containerX mt-4">
            <div className="flex gap-1 max-w-[450px] mx-auto  relative">
               <div className="absolute -top-2 -right-2">
                  <Badge color="yellow" size="3">
                     Pro
                  </Badge>
               </div>
               <TextArea
                  disabled
                  className="!grow-1"
                  placeholder="Create a new organization (Sigma Boys), send Artem and Vlad invitations"
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
                     <small>
                        {email.slice(0, 8) + "..." + email.slice(-10)}
                     </small>
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
                           <div className="flex gap-2 justify-center mt-4">
                              <Modal.Close ref={closeDeleteTokenRef}>
                                 <Button color="gray" variant="soft">
                                    Close
                                 </Button>
                              </Modal.Close>
                              <Button
                                 color="red"
                                 onClick={() => deleteToken()}
                                 loading={isDeletePending}
                              >
                                 Delete
                              </Button>
                           </div>
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
            <div className="flex justify-end max-w-[550px] mx-auto mt-4">
               <Button
                  onClick={() => logoutUser()}
                  loading={isLgginOut}
                  variant="soft"
                  color="gray"
               >
                  Logout
               </Button>
            </div>
         </section>
      </>
   );
}

export { SettingsPage };
