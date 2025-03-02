import { Button } from "@radix-ui/themes";
import { PropsWithChildren, useRef } from "react";

function CodeCard({ children }: PropsWithChildren) {
   const codeRef = useRef<HTMLPreElement | null>(null);

   const handleCopy = () => {
      if (codeRef.current?.textContent) {
         navigator.clipboard.writeText(codeRef.current.textContent);
         console.log("Code copied to clipboard!");
      }
   };

   return (
      <div className="relative border border-(--gray-5) p-4 rounded-(--radius-4) bg-(--gray-2) pr-12">
         <div className="absolute top-1 right-1">
            <Button variant="soft" color="gray" onClick={handleCopy}>
               <i className="pi pi-copy" />
            </Button>
         </div>
         <code className="text-(--gray-11)" ref={codeRef}>
            {children}
         </code>
      </div>
   );
}

export { CodeCard };
