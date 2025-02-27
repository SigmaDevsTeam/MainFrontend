import { Helmet } from "react-helmet-async";
import { application } from "~/global/config/application.config";

type HelmetXProps = {
   title?: string;
   description?: string;
   robots?: boolean;
   cannonicalPath?: string;
};

const fallBack = {
   title: "Sabaody Docs",
   description: "Sabaody is a new way of creating web",
   robots: "index, follow",
   noRobots: "noindex, nofollow",
   cannonicalPath: ""
};

function HelmetX({ title, description, robots, cannonicalPath }: HelmetXProps) {
   return (
      <Helmet>
         <title>{title || fallBack.title}</title>
         <meta
            name="description"
            content={description || fallBack.description}
         />
         <meta
            name="robots"
            content={robots ? fallBack.robots : fallBack.noRobots}
         />
         <link
            rel="canonical"
            href={`${application.DOCS_URL}${cannonicalPath}`}
         />
      </Helmet>
   );
}

export { HelmetX };
