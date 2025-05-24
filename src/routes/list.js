import Auth from "../page/AuthPage";
import SignUpFlow from "../page/SignUpContainer";
import Tutorial from "../page/Tutorial";
import Loading from "../page/Loading";
import PublicRoute from "./PublicRoute";

const routes = [
  { path: "/", element: <Loading /> },
  { path: "/auth", element: <PublicRoute><Auth /></PublicRoute> },
  { path: "/auth/signup", element: <PublicRoute><SignUpFlow /></PublicRoute> },
  { path: "/tutorial", element: <PublicRoute><Tutorial /></PublicRoute> },
];

export default routes;