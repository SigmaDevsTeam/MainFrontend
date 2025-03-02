import { Button, Card, Separator } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { CodeCard } from "~/components/CodeCard";
import { Modal } from "~/components/theme/Modal";
import { apiWithCsrf } from "~/global/config/application.config";
import { useCloseModal } from "~/global/hooks/useCloseModal";

export type RepoCardProps = {
   id: number;
   name: string;
   isPrivate: boolean;
   link: string;
};

function RepoCard(repoData: RepoCardProps) {
   const [isOpened, setIsOpened] = useState(false);

   const { closeButtonRef, closeModal } = useCloseModal();

   const deleteRepository = async () => {
      try {
         // TODO: change endpoint url
         const res = await apiWithCsrf.delete("/repo", {
            params: { name: repoData.name }
         });
         return res;
      } catch (err) {
         toast.error(JSON.stringify(err).slice(0, 50));
         console.log(err);
      }
   };

   const { mutate: deleteRepo, isPending: isDeletePending } = useMutation({
      mutationFn: deleteRepository,
      onSuccess: () => {
         closeModal();
      }
   });

   const changeVisibility = async () => {
      try {
         // TODO: change endpoint url
         const res = await apiWithCsrf.patch("/repo", {
            params: { name: repoData.name }
         });
         return res;
      } catch (err) {
         toast.error(JSON.stringify(err).slice(0, 50));
         console.log(err);
      }
   };

   const { mutate: changeVisib, isPending: isChangeVisibPending } = useMutation(
      {
         mutationFn: changeVisibility,
         onSuccess: () => {}
      }
   );

   return (
      <Card>
         <div className="flex justify-between">
            <div>
               <h3>{repoData.name || "Repo name"}</h3>
               <p>
                  <span>Main</span> <small>Last commit</small>
               </p>
            </div>
            <div className="">
               <div className="flex gap-2">
                  <Button
                     variant="soft"
                     color="gray"
                     onClick={() => changeVisib()}
                     loading={isChangeVisibPending}
                  >
                     {repoData.isPrivate ? (
                        <i className="pi pi-eye-slash" />
                     ) : (
                        <i className="pi pi-eye" />
                     )}
                  </Button>
                  <Modal
                     trigger={
                        <Button color="red" variant="soft">
                           <i className="pi pi-trash" />
                        </Button>
                     }
                     content={
                        <>
                           <Modal.Title>
                              Are you sure you want to delete repository?
                           </Modal.Title>
                           <div className="flex gap-2 justify-center mt-4">
                              <Modal.Close ref={closeButtonRef}>
                                 <Button color="gray" variant="soft">
                                    Close
                                 </Button>
                              </Modal.Close>
                              <Button
                                 color="red"
                                 onClick={() => deleteRepo()}
                                 loading={isDeletePending}
                              >
                                 Delete
                              </Button>
                           </div>
                        </>
                     }
                  />
               </div>
               <div className="flex justify-center mt-2">
                  <Button
                     variant="ghost"
                     color="gray"
                     onClick={() => setIsOpened((isO) => !isO)}
                  >
                     {isOpened ? (
                        <i className="pi pi-angle-up" />
                     ) : (
                        <i className="pi pi-angle-down" />
                     )}
                  </Button>
               </div>
            </div>
         </div>
         {isOpened && (
            <>
               {" "}
               <div className="flex justify-center !-mx-2">
                  <Separator className="!w-full mt-2 " />
               </div>
               <div className="mt-2">
                  <a href={repoData.link} className="text-(--accent-9)">
                     <u>{repoData.link}</u>
                  </a>
               </div>
               <div className="mt-2">
                  <CodeCard>git clone "https://yoooo"</CodeCard>
               </div>
            </>
         )}
      </Card>
   );
}

export { RepoCard };
