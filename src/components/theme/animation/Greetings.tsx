import { Button } from "@radix-ui/themes";
import { AnimationOverlay } from "./AnimationOverlay";
import { useAnimation } from "~/global/hooks/useAnimation";
import clsx from "clsx";
import { wait } from "~/global/utils/wait";
import { useEffect, useState } from "react";

const greetingsSteps = 4;

function Greetings() {
   const { step, nextStep, setStep, stopAnimation } = useAnimation();

   const [animationStep, setAnimationStep] = useState(step);

   const handleSkip = async () => {
      setStep(greetingsSteps);
   };

   useEffect(() => {
      (async () => {
         if (step === greetingsSteps) {
            await wait(0.75);
            stopAnimation();
         }
         await wait(0.75);
         setAnimationStep(step);
      })();
   }, [step]);

   return (
      <AnimationOverlay>
         <div
            className={clsx("greetings", {
               "end-greetings": step === greetingsSteps
            })}
         >
            <div
               className={clsx("greetings-overlay", {
                  "greetings-guide-overlay": step !== 0
               })}
            ></div>
            <div
               className={clsx("greetings-content justify-center", {
                  "end-content": step !== 0,
                  "!hidden": animationStep !== 0
               })}
            >
               <h1 className="!text-4xl sm:!text-5xl">
                  Welcome to <em className="text-(--accent-10)">Sabaody</em>
               </h1>
               <p className="text-2xl sm:text-3xl">
                  Start writing logic, not boilerplate
               </p>
               <div className="greetings-gui flex gap-2 justify-center">
                  <Button onClick={nextStep} size="3">
                     Quick guide
                  </Button>
                  <Button
                     variant="soft"
                     color="gray"
                     onClick={handleSkip}
                     size="3"
                  >
                     Skip
                  </Button>
               </div>
            </div>
            <div
               className={clsx("greetings-content justify-end pb-16", {
                  "end-content": step !== 1,
                  "!hidden": animationStep !== 1
               })}
            >
               <div className="guide">
                  <h2>Click this button to add new entity</h2>
                  <div className="greetings-gui flex gap-2 justify-center mt-2">
                     <Button onClick={nextStep}>
                        Next 1/{greetingsSteps - 1}
                     </Button>
                     <Button variant="soft" color="gray" onClick={handleSkip}>
                        Skip
                     </Button>
                  </div>
               </div>
            </div>
            <div
               className={clsx("greetings-content justify-end pb-16", {
                  "end-content": step !== 2,
                  "!hidden": animationStep !== 2
               })}
            >
               <div className="guide">
                  <h2>Something else</h2>
                  <div className="greetings-gui flex gap-2 justify-center mt-2">
                     <Button onClick={nextStep}>
                        Next 2/{greetingsSteps - 1}
                     </Button>
                     <Button variant="soft" color="gray" onClick={handleSkip}>
                        Skip
                     </Button>
                  </div>
               </div>
            </div>
            <div
               className={clsx("greetings-content justify-end pb-16", {
                  "end-content": step !== 3,
                  "!hidden": animationStep !== 3
               })}
            >
               <div className="guide">
                  <h2>And finish</h2>
                  <div className="greetings-gui flex gap-2 justify-center mt-2">
                     <Button onClick={nextStep}>
                        Finish 3/{greetingsSteps - 1}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </AnimationOverlay>
   );
}

export { Greetings };
