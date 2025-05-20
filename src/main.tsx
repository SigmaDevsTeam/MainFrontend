import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "~/index.css";
import { AppRouter } from "./router/AppRouter";
import { ToasterProvider } from "./components/theme/ToasterProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <Theme appearance="dark" accentColor="crimson" radius="full">
               <HelmetProvider>
                  <AppRouter />
               </HelmetProvider>
               <ToasterProvider />
            </Theme>
         </Provider>
      </QueryClientProvider>
   );
}

createRoot(document.getElementById("root")!).render(<App />);
