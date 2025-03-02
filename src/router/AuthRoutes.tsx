import { Navigate, Outlet } from "react-router";
import { routes } from "~/global/config/routes.config";
import { useAppSelector } from "~/store/store";

function AuthRoutes() {
   const user = useAppSelector((store) => store.auth.user);

   if (!user) return <Navigate to={routes.login} replace />;

   return <Outlet />;
}

export { AuthRoutes };
