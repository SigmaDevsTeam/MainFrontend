import { TextField } from "@radix-ui/themes";

function HomePage() {
   return (
      <>
         <h1 className="containerX text-center mt-4">Browse available rooms</h1>
         <section className="containerX">
            <div className="w-40 mx-auto mt-4">
               <TextField.Root />
            </div>
         </section>
      </>
   );
}

export { HomePage };
