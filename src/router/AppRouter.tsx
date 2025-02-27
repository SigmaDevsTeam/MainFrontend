import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout";
import { routes } from "~/global/config/routes.config";
import { HomePage } from "~/pages/HomePage/HomePage";
import { LoginPage } from "~/pages/LoginPage/LoginPage";
import { NotFoundPage } from "~/pages/NotFoundPage";
import { SignupPage } from "~/pages/SignupPage/SignUpPage";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               {/* home */}
               <Route path={routes.home} element={<HomePage />} />

               <Route path={routes.login} element={<LoginPage />} />
               <Route path={routes.signup} element={<SignupPage />} />

               {/* Fallback */}
               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
