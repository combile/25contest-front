import Auth from "../page/AuthPage";
import SignUpFlow from "../page/SignUpContainer";
import Tutorial from "../page/Tutorial";
import Loading from "../page/Loading";
import LoginConfirm from "./LoginConfirm";

const routes = [
  { path: "/", element: <Loading /> },
  { path: "/auth", element: <LoginConfirm><Auth /></LoginConfirm> },
  { path: "/auth/signup", element: <LoginConfirm><SignUpFlow /></LoginConfirm> },
  { path: "/tutorial", element: <LoginConfirm><Tutorial /></LoginConfirm> },
];

export default routes;