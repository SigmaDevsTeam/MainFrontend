import { Card } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "~/global/config/routes.config";

function HomePage() {
   return (
      <>
         <h1 className="containerX text-center">Working Space</h1>
         <section className="containerX flex flex-col items-center mt-4 gap-4">
            <Card className="!max-w-[450px]" asChild>
               <Link to={routes.create}>
                  <h3>
                     Create new project <i className="pi pi-hammer" />
                  </h3>
                  <p>
                     Create and scaffold new repository with installed libraries
                     andrepository
                  </p>
               </Link>
            </Card>
            <Card className="!max-w-[450px]" asChild>
               <Link to={routes.manage}>
                  <h3>
                     Manage projects <i className="pi pi-wrench" />
                  </h3>
                  <p>
                     Manage existing github repositories (add functionality,
                     manage colaborators)
                  </p>
               </Link>
            </Card>
         </section>
      </>
   );
}

export { HomePage };
