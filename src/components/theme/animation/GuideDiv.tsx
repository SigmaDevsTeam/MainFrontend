import clsx from "clsx";
import { PropsWithChildren } from "react";
import { useAnimation } from "~/global/hooks/useAnimation";

function GuideDiv({
   children,
   active,
   isNextStep = false
}: PropsWithChildren & { active: boolean; isNextStep?: boolean }) {
   const { nextStep } = useAnimation();
   return (
      <div
         className={clsx("relative", {
            "z-30 bg-(--accent-4) outline outline-(--accent-6) rounded-(--radius-3) -m-2 p-2":
               active
         })}
         onClick={() => {
            active && isNextStep && nextStep();
         }}
      >
         {children}
      </div>
   );
}

export { GuideDiv };
