import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout/Layout";
import { routes } from "~/global/config/routes.config";
import { HomePage } from "~/pages/HomePage/HomePage";
import { NotFoundPage } from "~/pages/NotFoundPage";
import { SignupPage } from "~/pages/SignupPage/SignUpPage";
import { SettingsPage } from "~/pages/SettingsPages/SettingsPage";
import { CreatePage } from "~/pages/CreatePage/CreatePage";
import { AnalyticsPage } from "~/pages/AnalyticsPage/AnalyticsPage";
import { ManagePage } from "~/pages/ManagePage/ManagePage";
import { LoginPageV2 } from "~/pages/LoginPage/LoginPageV2";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               {/* home */}
               <Route path={routes.home} element={<HomePage />} />

               <Route path={routes.login} element={<LoginPageV2 />} />
               <Route path={routes.signup} element={<SignupPage />} />

               {/* <Route element={<AuthRoutes />}> */}
               <Route path={routes.settings} element={<SettingsPage />} />
               <Route path={routes.create} element={<CreatePage />} />
               <Route path={routes.manage} element={<ManagePage />} />
               <Route path={routes.analytics} element={<AnalyticsPage />} />
               {/* </Route> */}

               {/* Fallback */}
               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
